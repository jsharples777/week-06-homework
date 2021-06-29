function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

import logger from './util/SimpleDebug.js';

var Controller = /*#__PURE__*/function () {
  function Controller(applicationView, clientSideStorage) {
    this.applicationView = applicationView;
    this.clientSideStorage = clientSideStorage;
    this.apiKey = "1781f031cee8b3399deb7f12ea560141";
    this.queryURL = "/weather"; // this.queryURL = "https://api.openweathermap.org/data/2.5/weather";

    this.savedSearchesKey = "savedSearchesKey";
    this.previousSearches = [];
    this.getPreviousCitySearches = this.getPreviousCitySearches.bind(this);
    this.handleWeatherSearch = this.handleWeatherSearch.bind(this);
    this.handleWeatherSearchForPreviousSearch = this.handleWeatherSearchForPreviousSearch.bind(this);
  }
  /* private */


  var _proto = Controller.prototype;

  _proto.__fetchQLJSON =
  /*#__PURE__*/
  function () {
    var _fetchQLJSON = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(url, parameters) {
      var postParameters, response;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              postParameters = {
                method: "POST",
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  q: parameters.q,
                  appid: parameters.appid,
                  units: parameters.units
                })
              };
              _context.next = 3;
              return fetch(url, postParameters);

            case 3:
              response = _context.sent;
              return _context.abrupt("return", response.json());

            case 5:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    function __fetchQLJSON(_x, _x2) {
      return _fetchQLJSON.apply(this, arguments);
    }

    return __fetchQLJSON;
  }();

  _proto.__getWeatherDataForCity = /*#__PURE__*/function () {
    var _getWeatherDataForCity = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(cityName) {
      var fetchParameters, result;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              logger.log("Loading weather for " + cityName, 2);
              /* construct the request */

              fetchParameters = {
                q: cityName,
                appid: this.apiKey,
                units: "metric"
              };
              _context2.next = 4;
              return this.__fetchQLJSON(this.queryURL, fetchParameters);

            case 4:
              result = _context2.sent;
              this.applicationView.setState({
                currentSearchResults: result.data
              });

            case 6:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function __getWeatherDataForCity(_x3) {
      return _getWeatherDataForCity.apply(this, arguments);
    }

    return __getWeatherDataForCity;
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

    this.__getWeatherDataForCity(cityName).then(logger.log("Loading weather data async", 3));
  };

  _proto.handleWeatherSearchForPreviousSearch = function handleWeatherSearchForPreviousSearch(event) {
    event.preventDefault();
    var cityName = event.target.getAttribute("cityName");

    this.__getWeatherDataForCity(cityName).then(logger.log("Loading weather data async", 3));
  };

  return Controller;
}();

export { Controller as default };