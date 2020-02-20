#include "DHT.h"
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

void blinkLED(int);   // blinkLED signature

StaticJsonDocument<80> pDoc;

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
  delay(3000);
}

void loop() {
  char buf[80];
  byte len;
  digitalWrite(LED_PIN, HIGH);

  if (Serial.available() > 0) {
    len = Serial.readBytes(buf, 80);
    buf[len-1] = 0;
    Serial.println(buf);

    DeserializationError error = deserializeJson(pDoc, buf);
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
  }
  delay(1000);
}

void blinkLED(int interval) {
  for (int i=0; i<10; i++) {
    digitalWrite(LED_PIN, digitalRead(LED_PIN)^1);
    delay(interval);
  }
}
