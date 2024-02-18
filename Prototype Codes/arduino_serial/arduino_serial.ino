#include <DHT.h>
// #include <AltSoftSerial.h>

// AltSoftSerial altSerial;

//temp & humid sensor pins
#define dhtPin 4
#define dhtType DHT11
//buffer size
// #define SERIAL_BUFFER_SIZE 256
//soil moisture sensor pin
const int soilmoisture_pin = A0;
//water level sensor pin
const int waterlevel_pin = A1;
//led pins for soil moisture alert
const int soil_pin1 = 5; //red
const int soil_pin2 = 6; //yellow
const int soil_pin3 = 7; //green
//led pins  for water shit alert
const int water_pin1 = 8; //red
const int water_pin2 = 9; //yellow
const int water_pin3 = 10; //green
//Relay - sub-pump pin
const int pump_pin = 12;
//fans pin
const int fans_pin = 13;

//setup dht11
DHT dht(dhtPin, dhtType);

void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600);
  // altSerial.begin(9600);
  // altSerial.setTxBufferSize(SERIAL_BUFFER_SIZE); //render buffer size
  dht.begin();
  pinMode(soilmoisture_pin, INPUT);
  pinMode(soil_pin1, OUTPUT);
  pinMode(soil_pin2, OUTPUT);
  pinMode(soil_pin3, OUTPUT);
  pinMode(water_pin1, OUTPUT);
  pinMode(water_pin2, OUTPUT);
  pinMode(water_pin3, OUTPUT);
  pinMode(fans_pin, OUTPUT);
  pinMode(pump_pin, OUTPUT);
  digitalWrite(pump_pin, HIGH);//Initially turn off pump
  digitalWrite(fans_pin, HIGH);//Initially turn off fans

}

void loop() {
  // put your main code here, to run repeatedly:
  float t = read_temperature();
  float h = read_humidity();
  float soilmoisture = read_soilmoisture();
  float waterlevel = read_waterlevel();



  // float t = dht.readTemperature();
  // float h = dht.readHumidity();
  if(isnan(read_temperature()) || isnan(read_humidity())){
    Serial.println("No temp and humidity data");
  }else if(isnan(read_soilmoisture())){
    Serial.println("No soil moisture data");
  }else if(isnan(read_waterlevel())){
    Serial.println("No water level data");
  }

  digitalWrite(fans_pin, LOW);
  soil_alert();
  water_alert();

  Serial.write(reinterpret_cast<uint8_t*>(&t), sizeof(t));
  Serial.write(reinterpret_cast<uint8_t*>(&h), sizeof(h));
  Serial.write(reinterpret_cast<uint8_t*>(&soilmoisture), sizeof(soilmoisture));
  Serial.write(reinterpret_cast<uint8_t*>(&waterlevel), sizeof(waterlevel));

  // Serial.print(read_temperature());
  // Serial.print(',');
  // Serial.print(read_humidity());
  // Serial.print(',');
  // Serial.print(read_soilmoisture());
  // Serial.print(',');
  // Serial.print(read_waterlevel());
  // Serial.println();
  // delay(500);
  if(Serial.availableForWrite() >= sizeof(float)*4){
      Serial.println("--Serial buffer overflow!--");
    }
  


}

float read_humidity(){
  float h = dht.readHumidity();
  return h;
}

float read_temperature(){
  float t = dht.readTemperature();
  return t;
}

float read_soilmoisture(){
  float sensor_data = analogRead(soilmoisture_pin);
  float con_percentage = ((sensor_data-200)/(1050-200)*100);
  float invert_percentage = 100 - con_percentage;
  return invert_percentage;
}

float read_waterlevel(){
  float sensorValue = analogRead(waterlevel_pin);
  return sensorValue;
}

//soil moisture alert algo
void soil_alert(){
  if((read_soilmoisture() >= 0) && (read_soilmoisture() <= 30)){ //dry as fuck - turn on sub pump
    digitalWrite(pump_pin, HIGH);
    digitalWrite(soil_pin1, HIGH);
    digitalWrite(soil_pin2, LOW);
    digitalWrite(soil_pin3, LOW);
  }
  else if((read_soilmoisture() >= 31) && (read_soilmoisture() <= 60)){ //slightly wet
    digitalWrite(pump_pin, LOW);
    digitalWrite(soil_pin1, LOW);
    digitalWrite(soil_pin2, HIGH);
    digitalWrite(soil_pin3, LOW);
  }
  else if((read_soilmoisture() >= 61) && (read_soilmoisture() <= 100)){ //wet as fuck - turn off sub pump
    digitalWrite(soil_pin1, LOW);
    digitalWrite(soil_pin2, LOW);
    digitalWrite(soil_pin3, HIGH);
  }
}

void water_alert(){
  if((read_waterlevel()>=0)&&(read_waterlevel()<=200)){
    digitalWrite(water_pin1, LOW);
    digitalWrite(water_pin2, LOW);
    digitalWrite(water_pin3, HIGH);
    }
  else if((read_waterlevel()>=201)&&(read_waterlevel()<=350)){
    digitalWrite(water_pin1, LOW);
    digitalWrite(water_pin2, HIGH);
    digitalWrite(water_pin3, LOW);
    }  
  else if((read_waterlevel()>=351)&&(read_waterlevel()<=400)){
    digitalWrite(water_pin1, HIGH);
    digitalWrite(water_pin2, LOW);
    digitalWrite(water_pin3, LOW);
    }
  else{
    digitalWrite(water_pin1, LOW);
    digitalWrite(water_pin1, LOW);
    digitalWrite(water_pin1, LOW);
    }
}
