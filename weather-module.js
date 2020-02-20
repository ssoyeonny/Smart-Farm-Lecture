const request = require('request');
const template = require('./view/template');
const apiURI = 'http://api.openweathermap.org/data/2.5/weather?q=Yongin,kr&units=metric&appid=';
const apiKey = '9e9e4eefc93b5af91c70bd666c346dc8';
 
module.exports = {
    getWeather: function(callback) {
        var weatherURI = apiURI + apiKey;
        request(weatherURI, function(error, response, data) {
            if (error) {
                throw error;
            }
            var result = JSON.parse(data);
            /* for (var item in result) {
                console.log(item.toString(), result[item]);
            } */
            var imgURL = `http://openweathermap.org/img/w/${result.weather[0].icon}.png`;
            //console.log(result.name, result.main.temp_min, result.main.temp_max, imgURL);
            var weather = template.weather(result.main.temp.toFixed(1), result.main.humidity.toFixed(1), imgURL);
            callback(weather);
        });
    },
    weatherObj: function(callback) {
        var weatherURI = apiURI + apiKey;
        request(weatherURI, function(error, response, data) {
            if (error) {
                throw error;
            }
            var result = JSON.parse(data);
            //console.log(result);
            callback(result);
        });
    }
}