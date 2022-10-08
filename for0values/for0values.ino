#include <Wire.h>
#include <Adafruit_AMG88xx.h>
#include <WiFi.h>
#include <ThingSpeak.h>
#include <HTTPClient.h>

#define CSE_IP "esw-onem2m.iiit.ac.in"
#define CSE_PORT 443
#define HTTPS false
#define OM2M_ORIGIN "mT@XiX:GRRiFk"
#define OM2M_MN "/~/in-cse/in-name/"
#define OM2M_AE "Team-22" // for GET request
#define DATA_CONT1 "Node-1"
#define DATA_CONT2 "Node-2"
#define DATA_CONT3 "Node-3"
#define DESCRIP "Descriptor"
#define DATA "Data"

const char *password = "e5W-eMai@3!20hOct";
const char *ssid = "esw-m19@iiith";

Adafruit_AMG88xx amg;

int inputPin = 5;
int val = 0;

String PIR;
String Grid1;
String Grid2;

HTTPClient http;

WiFiClient client;
unsigned long myChannelNumber = 1848526;
const char *myWriteAPIKey = "E8BP5AITDNRCITAU";

float pixels[AMG88xx_PIXEL_ARRAY_SIZE];

void sendData(String cont, String data);

void setup()
{
    Serial.begin(9600);

    pinMode(inputPin, INPUT);

    bool status;

    status = amg.begin();
    if (!status)
    {
        Serial.println("Could not find a valid AMG88xx sensor, check wiring!");
        while (1)
            ;
    }

    WiFi.mode(WIFI_STA);
    WiFi.begin(ssid, password);

    while (WiFi.status() != WL_CONNECTED)
    {
        delay(500);
        Serial.print(".");
    }
    Serial.println("");
    Serial.println("WiFi connected");
    Serial.println();
    Serial.print("IP Address: ");
    Serial.println(WiFi.localIP());
    ThingSpeak.begin(client);

    delay(100);
}

void loop()
{
    amg.readPixels(pixels);
    for (int i = 1; i <= AMG88xx_PIXEL_ARRAY_SIZE; i++)
    {
        Serial.print(pixels[i - 1]);
        Serial.print(", ");
        if (i % 8 == 0)
            Serial.println();
    }
    String send1 = "";
    for (int i = 1; i <= (AMG88xx_PIXEL_ARRAY_SIZE / 2); i++)
    {
        send1 += String(pixels[i - 1]);
        send1 += ",";
    }
    String send2 = "";
    for (int i = (AMG88xx_PIXEL_ARRAY_SIZE / 2) + 1; i <= 2 * (AMG88xx_PIXEL_ARRAY_SIZE / 2); i++)
    {
        send2 += String(pixels[i - 1]);
        send2 += ",";
    }
    ThingSpeak.setField(1, 1);
    ThingSpeak.setField(2, send1);
    ThingSpeak.setField(3, send2);
    int x = ThingSpeak.writeFields(myChannelNumber, myWriteAPIKey);
    sendData(String() + DATA_CONT1, String(val));
    delay(500);
    sendData(String() + DATA_CONT2, send1);
    delay(500);
    sendData(String() + DATA_CONT3, send2);
    delay(500);

    if (x == 200)
    {
        Serial.println("Channel update successful.");
    }
    else
    {
        Serial.println("Problem updating channel. HTTP error code " + String(x));
    }
    delay(35000);
}

void sendData(String cont, String data)
{
    
    String server = "http://" + String() + CSE_IP + ":" + String() + CSE_PORT + String() + OM2M_MN;

    http.begin(server + String() + OM2M_AE + "/" + cont + "/" + String() + DATA + "/");

    http.addHeader("X-M2M-Origin", OM2M_ORIGIN);
    http.addHeader("Content-Type", "application/json;ty=4");
    http.addHeader("Content-Length", "100");

    String req_data = String() + "{\"m2m:cin\": {"

                      +
                      "\"con\": \"" + data + "\","

                      +
                      "\"lbl\": \"" + "V1.0.0" + "\","

                      +
                      "\"cnf\": \"text\""

                      +
                      "}}";
    int code = http.POST(req_data);
    http.end();
    Serial.println(code);
}