const express = require('express'),
  request = require('request'),
  router = express.Router();

const WeatherBaseUrl = 'http://api.openweathermap.org/data/2.5/';
const API_KEY = '602d10eaa16056b9fe71e9d6693e44db';

const WeatherBaseUrl = 'http://api.openweathermap.org/data/2.5/';
const API_KEY = '602d10eaa16056b9fe71e9d6693e44db';

module.exports = function (app) {
  app.use('/weather', router);
};

router.get('/:zip_code', function (req, res, next) {

  let zipCode = req.params.zip_code;

  request(WeatherBaseUrl + 'weather?zip=' + zipCode + ',us&appid=' + API_KEY,
    function (error, response, body) {
      let httpresponse = JSON.parse(body);
      let weatherObj = httpresponse.weather[0];
      res.render('weather', {
        title: 'Weather for ' + zipCode,
        imgicon: 'http://openweathermap.org/img/w/' + weatherObj.icon + '.png',
        weather: weatherObj.description
      });
    });

});