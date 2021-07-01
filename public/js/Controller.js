function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

import logger from './util/SimpleDebug.js';

var Controller = /*#__PURE__*/function () {
  function Controller(applicationView, clientSideStorage) {
    this.applicationView = applicationView;
    this.clientSideStorage = clientSideStorage;
    this.currentQueryURL = "/current";
    this.forecastQueryURL = "/forecast"; // this.queryURL = "https://api.openweathermap.org/data/2.5/weather";

    this.savedSearchesKey = "savedSearchesKey";
    this.previousSearches = [];
    this.getPreviousCitySearches = this.getPreviousCitySearches.bind(this);
    this.handleWeatherSearch = this.handleWeatherSearch.bind(this);
    this.handleWeatherSearchForPreviousSearch = this.handleWeatherSearchForPreviousSearch.bind(this);
    this.__callbackWeatherSearch = this.__callbackWeatherSearch.bind(this);
    this.__callbackForecastSearch = this.__callbackForecastSearch.bind(this);
  }

  var _proto = Controller.prototype;

  _proto.__convertForecastDataIntoDisplayFormat = function __convertForecastDataIntoDisplayFormat(cityName, data) {
    var viewData = [];
    logger.log("Converting Forecast Data for display", 10);
    logger.log(data, 10);
    var viewDataItem = {
      name: cityName,
      temp: data.current.temp + " C",
      humidity: data.current.humidity + "%",
      wind: data.current.wind_speed + " m/s",
      uv: data.current.uvi,
      icon: "http://openweathermap.org/img/wn/" + data.current.weather[0].icon + ".png"
    };
    logger.log(viewDataItem);
    viewData.push(viewDataItem);

    for (var index = 0; index < data.daily.length; index++) {
      var _viewDataItem = {
        temp: data.daily[index].temp.max + " C",
        humidity: data.daily[index].humidity + "%",
        wind: data.daily[index].wind_speed + " m/s",
        uv: data.daily[index].uvi,
        icon: "http://openweathermap.org/img/wn/" + data.daily[index].weather[0].icon + ".png"
      };
      logger.log(_viewDataItem);
      viewData.push(_viewDataItem);
    }

    return viewData;
  }
  /* private */
  ;

  _proto.__callbackForecastSearch = function __callbackForecastSearch(data) {
    logger.log("Callback Forecast Search", 7);
    logger.log(data, 20);
    this.applicationView.setState({
      forecast: this.__convertForecastDataIntoDisplayFormat(this.cityName, data)
    });
  }
  /* private */
  ;

  _proto.__callbackWeatherSearch = function __callbackWeatherSearch(data) {
    logger.log("Callback Weather Search", 7);
    logger.log(data, 20);
    /* now make a call for the forecast */

    /* construct the request */

    var fetchParameters = {
      lat: data.coord.lat,
      lon: data.coord.lon
    };
    logger.log("Fetching forecast for " + data.name, 2);
    this.cityName = data.name;

    this.__fetchQLJSON(this.forecastQueryURL, fetchParameters, this.__callbackForecastSearch);
  }
  /* private */
  ;

  _proto.__fetchQLJSON = function __fetchQLJSON(url, parameters, callback) {
    var postParameters = {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        parameters: parameters
      })
    };
    fetch(url, postParameters).then(function (response) {
      return response.json();
    }).then(function (data) {
      callback(JSON.parse(data));
    });
  };

  _proto.__getCurrentWeatherDataForCity = /*#__PURE__*/function () {
    var _getCurrentWeatherDataForCity = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(cityName) {
      var fetchParameters;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              logger.log("Loading weather for " + cityName, 2);
              /* construct the request */

              fetchParameters = {
                q: cityName
              };
              logger.log("Fetching weather for " + cityName, 2);
              this.cityName = cityName;

              this.__fetchQLJSON(this.currentQueryURL, fetchParameters, this.__callbackWeatherSearch);

            case 5:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function __getCurrentWeatherDataForCity(_x) {
      return _getCurrentWeatherDataForCity.apply(this, arguments);
    }

    return __getCurrentWeatherDataForCity;
  }()
  /* private */
  ;

  _proto.__savePreviousSearches = function __savePreviousSearches() {
    logger.log("Saving Previous Searches", 5);
    var stringifiedSearches = JSON.stringify(this.previousSearches);
    logger.log(stringifiedSearches, 10);
    this.clientSideStorage.setItem(this.savedSearchesKey, stringifiedSearches);
  };

  _proto.getPreviousCitySearches = function getPreviousCitySearches() {
    logger.log("Loading Previous Searches", 5);
    var savedSearchesItem = this.clientSideStorage.getItem(this.savedSearchesKey);
    logger.log("Saved previous search items were " + savedSearchesItem, 5);

    if (savedSearchesItem !== null) {
      this.previousSearches = JSON.parse(savedSearchesItem);
    }

    logger.log("Saved previous searches were " + this.previousSearches, 5);
    logger.log(this.previousSearches, 10);
    return this.previousSearches;
  };

  _proto.addNewCityNameToPreviousSearches = function addNewCityNameToPreviousSearches(cityName) {
    if (cityName !== null) {
      // only add the city name if not already in the list
      if (this.previousSearches.findIndex(cityName) < 0) {
        this.previousSearches.push(cityName);

        this.__savePreviousSearches();
      }
    }
  };

  _proto.handleWeatherSearch = function handleWeatherSearch(event) {
    event.preventDefault();
    logger.log("Handling city name search for weather ", 2);
    var cityName = document.getElementById("cityName").value;
    logger.log("City Name is " + cityName, 2);

    this.__getCurrentWeatherDataForCity(cityName).then(logger.log("Loading weather data async", 3));
  };

  _proto.handleWeatherSearchForPreviousSearch = function handleWeatherSearchForPreviousSearch(event) {
    event.preventDefault();
    var cityName = event.target.getAttribute("cityName");

    this.__getCurrentWeatherDataForCity(cityName).then(logger.log("Loading weather data async", 3));
  };

  return Controller;
}();

export { Controller as default };