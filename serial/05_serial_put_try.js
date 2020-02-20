const SerialPort = require("serialport");
const Readline = require('@serialport/parser-readline');
const sp = new SerialPort("COM3", {     //   /dev/ttyACM0
    baudRate: 115200,
    autoOpen: false
});
const spp = sp.pipe(new Readline());	// Serial Port Parser

let red = randomInt(0, 255);
let green = randomInt(0, 255);
let blue = randomInt(0, 255);
let relay = randomInt(0, 1);
var message = `PUT {"red":${red},"green":${green},"blue":${blue},"relay":${relay}}\n`;
try {
    sp.open(function() {
        console.log('Serial Port OPEN');
        spp.on("error", function(error) {
            console.log("Error : ", error.message);
        });
        spp.on('data', function(data) {
            if (data.indexOf('Ready') == 0) {
                console.log(data);
                sp.write(message, function(err) {
                    console.log('Write "PUT"');
                    if (err) {
                        console.log('Write error:', err);
                    }
                    console.log(message);
                    sp.close();
                });
            }
        });
    });
} catch (ex) {
    console.log(ex);
}

function randomInt(low, high) {
    return Math.floor(Math.random() * (high - low + 1) + low)
}