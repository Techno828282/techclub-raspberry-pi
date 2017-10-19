const express = require('express'),
  request = require('request'),
  router = express.Router();

const WeatherBaseUrl = 'http://api.openweathermap.org/data/2.5/';
const API_KEY = '602d10eaa16056b9fe71e9d6693e44db';

module.exports = function (app) {
  app.use('/weather', router);
};

router.get('/:zipCode', function (req, res, next) {

  let zipCode = req.param('zipCode');

  request(WeatherBaseUrl + 'weather?zip=' + zipCode + ',us&appid=' + API_KEY,
    function (error, response, body) {
      let apiResponse = JSON.parse(body);
      let weatherObj = apiResponse.weather[0];
      res.render('weather', {
        title: 'Weather for ' + apiResponse.name,
        imgicon: 'http://openweathermap.org/img/w/' + weatherObj.icon + '.png',
        weather: weatherObj.description
      });
    });

});