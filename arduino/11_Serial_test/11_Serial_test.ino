#define RELAY_PIN 4     // Blue LED
#define CDS_PIN   A0

int relay = 0;

void setup() {
  Serial.begin(115200);

  pinMode(RELAY_PIN, OUTPUT);
  pinMode(CDS_PIN, INPUT);
}

void loop() {
  int val;
  char buf[4];
  byte len;

  val = analogRead(CDS_PIN);
  Serial.write(val);

  if (Serial.available() > 0) {
    len = Serial.readBytes(buf, 4);
    if (buf[0] == 'O' && buf[1] == 'K') {
      relay ^= 1;     // relay 값을 1과 0으로 toggle
      digitalWrite(RELAY_PIN, relay);
    }
  }

  delay(1000);
}