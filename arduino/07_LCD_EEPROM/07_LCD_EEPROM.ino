#include <LiquidCrystal_I2C.h>
#include <Wire.h>
#include "DHT.h"
#include <EEPROM.h>
#include <ArduinoJson.h>

#define LED_PIN   13
#define RED_LED   3
#define GREEN_LED 6
#define BLUE_LED  5
#define RELAY_PIN 4     // Blue LED
#define DHT_PIN   8
#define ECHO_PIN  10
#define TRIG_PIN  11
#define CDS_PIN   A0

#define RED_ADDR  0x100
#define GREEN_ADDR  0x101
#define BLUE_ADDR  0x102
#define RELAY_ADDR  0x103

LiquidCrystal_I2C lcd(0x27, 16, 2);
DHT dht(DHT_PIN, DHT11);  // Adafruit sensor library
void readSensors();
void doParseJson(char *);
float ultraSonic();
void blinkLED(int);   // blinkLED signature
void viewSensor();
void lcdDisplay(int, int, int, float);

StaticJsonDocument<80> doc;
StaticJsonDocument<80> pDoc;

int red, green, blue, relay;

void setup() {
  Serial.begin(115200);

  pinMode(LED_PIN, OUTPUT);
  pinMode(TRIG_PIN, OUTPUT);
  pinMode(ECHO_PIN, INPUT);
  pinMode(CDS_PIN, INPUT);
  pinMode(RED_LED, OUTPUT);
  pinMode(GREEN_LED, OUTPUT);
  pinMode(BLUE_LED, OUTPUT);
  pinMode(RELAY_PIN, OUTPUT);
  dht.begin();
  lcd.init();
  lcd.backlight();
  delay(3000);
}

void loop() {
  char buf[80];
  byte len;
  String cmd;
  digitalWrite(LED_PIN, HIGH);
  Serial.println("Ready");

  if (Serial.available() > 0) {
    len = Serial.readBytes(buf, 80);
    buf[len-1] = 0;
    cmd = (String)buf;

    if (cmd.indexOf("GET") == 0) {  // 센서를 읽어서 JSON 형태로 전송
      readSensors();
      serializeJson(doc, Serial);
      Serial.print("\n");
      red = EEPROM.read(RED_ADDR);
      green = EEPROM.read(GREEN_ADDR);
      blue = EEPROM.read(BLUE_ADDR);
      relay = EEPROM.read(RELAY_ADDR);
      analogWrite(RED_LED, red);
      analogWrite(GREEN_LED, green);
      analogWrite(BLUE_LED, blue);
      digitalWrite(RELAY_PIN, relay);
    } else if (cmd.indexOf("PUT") == 0) { // JSON 메세지를 읽어서 액츄에이터 구동
      char *jsonStr = &(buf[4]);
      doParseJson(jsonStr);
    }
  }
  viewSensor();
  delay(1000);
}

void readSensors() {
  float humidity = dht.readHumidity();
  float temperature = dht.readTemperature();
  int cds = analogRead(CDS_PIN);
  float distance = ultraSonic();
  doc["humidity"] = humidity;
  doc["temperature"] = temperature;
  doc["cds"] = cds;
  doc["distance"] = distance;
  //lcdDisplay((int)temperature, (int)humidity, cds, distance);
}

void doParseJson(char *jsonStr) {
  DeserializationError error = deserializeJson(pDoc, jsonStr);
  if (error) {
    Serial.print(F("deserializeJson() failed: "));
    Serial.println(error.c_str());
    blinkLED(100);
  }

  int red = pDoc["red"];
  int green = pDoc["green"];
  int blue = pDoc["blue"];
  int relay = pDoc["relay"];
  analogWrite(RED_LED, red);
  analogWrite(GREEN_LED, green);
  analogWrite(BLUE_LED, blue);
  digitalWrite(RELAY_PIN, relay);
  EEPROM.write(RED_ADDR, red);
  EEPROM.write(GREEN_ADDR, green);
  EEPROM.write(BLUE_ADDR, blue);
  EEPROM.write(RELAY_ADDR, relay);
}

float ultraSonic() {
  digitalWrite(TRIG_PIN, HIGH);
  delayMicroseconds(10);
  digitalWrite(TRIG_PIN, LOW);

  unsigned long duration = pulseIn(ECHO_PIN, HIGH);
  float distance = ((float)(340 * duration) / 10000) / 2;
  //return (float)pulseIn(ECHO_PIN, HIGH) / 58;
  return distance;
}

void blinkLED(int interval) {
  for (int i=0; i<10; i++) {
    digitalWrite(LED_PIN, digitalRead(LED_PIN)^1);
    delay(interval);
  }
}

void viewSensor() {
  float humidity = dht.readHumidity();
  float temperature = dht.readTemperature();
  int cds = analogRead(CDS_PIN);
  float distance = ultraSonic();
  lcdDisplay((int)temperature, (int)humidity, cds, distance);
}

void lcdDisplay(int temp, int humid, int cds, float dst) {
  char firstRow[20], secondRow[20], floatStr[8];
  lcd.clear();
  sprintf(firstRow, "Temp:%2d Humid:%2d", temp, humid);
  dtostrf(dst, 4, 1, floatStr);
  sprintf(secondRow, "CDS:%3d Dst:%s", cds, floatStr);
  lcd.setCursor(0,0);
  lcd.print(firstRow);
  lcd.setCursor(0,1);
  lcd.print(secondRow);
}