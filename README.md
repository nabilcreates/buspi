# raspi-iot-bus

## Run
```bash
# CHANGE INTERNAL IP IN SERVER.JS (VARIABLE NAME IS INTERNAL IP) (FIND OUT BY IFCONFIG)
npm install
node server.js
# Then, go to localhost:5000 or you can change it on your own
```

## Then visit in the browser (on the same WiFi Network):
-   {internal_ip}:5000/busdisplay/{busstopcode}
    -   e.g: 192.168.0.0:5000/busdisplay/27301

## Expected Output On Raspberry Pi
-   example:
    -   179 (4 Mins)