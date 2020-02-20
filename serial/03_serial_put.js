const SerialPort = require("serialport");
const Readline = require('@serialport/parser-readline');
const sp = new SerialPort("COM3", {     //   /dev/ttyACM0
    baudRate: 115200,
    autoOpen: false
});
const spp = sp.pipe(new Readline());	// Serial Port Parser

var message = `PUT {"red":100,"green":200,"blue":250,"relay":1}\n`;
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
                sp.close();
            });
        }
    });
});