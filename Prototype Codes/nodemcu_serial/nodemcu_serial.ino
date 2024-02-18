#include <ESP8266WiFi.h>
#include <ESP8266Firebase.h>

#define _SSID "RielLangMalakas01"          // Your WiFi SSID
#define _PASSWORD "Annamariel143@"      // Your WiFi Password
#define REFERENCE_URL "sirri-5dcf3-default-rtdb.asia-southeast1.firebasedatabase.app"  // Your Firebase project reference url

Firebase firebase(REFERENCE_URL);

void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600);


  WiFi.mode(WIFI_STA);
  WiFi.disconnect();
  delay(1000);

  // Connect to WiFi
  Serial.println();
  Serial.println();
  Serial.print("Connecting to: ");
  Serial.println(_SSID);
  WiFi.begin(_SSID, _PASSWORD);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print("-");
  }

  Serial.println("");
  Serial.println("WiFi Connected");

  // Print the IP address
  Serial.print("IP Address: ");
  Serial.print("http://");
  Serial.print(WiFi.localIP());
  Serial.println("/");
}

void loop() {
  // put your main code here, to run repeatedly:
  if(Serial.available()>= sizeof(float)*4){
    // String data = Serial.readStringUntil('\n');
    // Serial.println(data);
    // int comma = data.indexOf(',');
    // int secondcomma = data.indexOf(',', comma + 1);
    // int thirdcomma = data.indexOf(',', secondcomma + 1);
    // int fourthcomma = data.indexOf(',', thirdcomma + 1);

    // float t = data.substring(0,comma).toFloat();
    // float h = data.substring(comma+1, secondcomma).toFloat();
    // float soilmoisture = data.substring(secondcomma+1, thirdcomma).toFloat();
    // float waterlevel = data.substring(thirdcomma+1, fourthcomma).toFloat();

    float t, h, soilmoisture, waterlevel;
    Serial.readBytes(reinterpret_cast<char*>(&t), sizeof(t));
    Serial.readBytes(reinterpret_cast<char*>(&h), sizeof(h));
    Serial.readBytes(reinterpret_cast<char*>(&soilmoisture), sizeof(soilmoisture));
    Serial.readBytes(reinterpret_cast<char*>(&waterlevel), sizeof(waterlevel));

    Serial.print("Temp: ");
    Serial.println(t);
    // delay(500);
    Serial.print("Humidity: ");
    Serial.println(h);
    // delay(500);
    Serial.print("Soil Moisture: ");
    Serial.println(soilmoisture);
    // delay(500);
    Serial.print("Water Level: ");
    Serial.println(waterlevel);
    // delay(500);
    if(Serial.availableForWrite() >= sizeof(float)*4){
      Serial.println("--Serial buffer overflow!--");
    }
    Serial.println("----------------------------------------------");
    // delay(500);

    firebase.setFloat("Temperature", t);
    // delay(500);
    firebase.setFloat("Humidity", h);
    // delay(500);
    firebase.setFloat("Soil_Moisture", soilmoisture);
    // delay(500);
    firebase.setFloat("Water_Level", waterlevel);
    delay(2000);
    
    //store previous sensors data as string in firebase

     

    // if (Firebase.failed()) {
    //   return;
    // }
    

    // if(comma != -1){
    //   float t = data.substring(0,comma).toFloat();
    //   float h = data.substring(comma+1).toFloat();
    //   Serial.print("Temperature: ");
    //   Serial.println(t);
    //   Serial.print("Humidity: ");
    //   Serial.println(h);
    // }
  }

}
