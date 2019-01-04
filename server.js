let express = require('express');
let fetch = require('node-fetch');
let app = express();
let sense = require("sense-hat-led");

let internal_ip = "192.168.0.0"

let color = [255, 255, 255]

// GET ROOT PAGE
app.get('/', (request, response) => {
    response.send('HELLO THERE!!')
})

// CLEAR
app.get('/clear', (request, response) => {

    // CLEAR THE SENSE HAT DISPLAY
    sense.clear();

    // SEND
    response.send({
        error: false,
    })

})

app.get('/busdisplay/:stopnumber', (request, response) => {

    // CLEAR THE DISPLAY FIRST
    sense.clear()

    let stopnumber = request.params.stopnumber;
    let index = 0;

    function start() {

        // fetch
        fetch('http://arrivelah.herokuapp.com/?id=' + stopnumber)
            .then(response => response.json())
            .then(json => {

                // speed
                let speed = 0.1

                // show the message
                // the start at the end is the loop callback
                sense.showMessage(`${json.services[index].no} (${Math.floor(json.services[index].next.duration_ms / 60000)} Mins)`, speed, color, start);


                // if longer than services number get it to 0
                if (index >= json.services.length - 1) {
                    index = 0;
                }

                // increment
                index++

            })

    }

    // invoke the start function
    start()

    // SEND
    response.send({
        stopnumber: stopnumber,
        error: false,
    })

})

// LISTEN ON PORT 5000 ON INTERNAL IP
app.listen(5000, internal_ip)