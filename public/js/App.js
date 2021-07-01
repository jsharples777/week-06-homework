function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

import Controller from "./Controller.js";
import logger from "./util/SimpleDebug.js";

function PreviousSearches(props) {
  var controller = props.controller;
  logger.log(controller);
  /* find any previous city name searches */

  var previousCityNames = controller.getPreviousCitySearches();
  logger.log("Previous City Names is " + previousCityNames, 1);
  var cityNameRows = "";

  if (previousCityNames != null) {
    cityNameRows = previousCityNames.map(function (name, index) {
      return /*#__PURE__*/React.createElement("li", {
        key: index,
        cityName: name,
        className: "border rounded bg-secondary text-white w-100 p-1",
        onClick: controller.handleWeatherSearchForPreviousSearch
      }, name);
    });
  }

  return /*#__PURE__*/React.createElement("ul", {
    className: "m-0 p-0"
  }, cityNameRows);
}

function TodaysDetails(props) {
  logger.log("Rendering Todays Details", 1);
  var details = props.weather;
  logger.log(details);
  var date = moment().format('DD/MM/YYYY');

  if (details !== null && details.length > 0) {
    logger.log("Rendering Todays Details", 1);
    logger.log(details[0]);
    return /*#__PURE__*/React.createElement("div", {
      className: "col-12 w-100 border border-dark rounded h-50 p-2 mb-3"
    }, /*#__PURE__*/React.createElement("div", {
      className: "container-fluid"
    }, /*#__PURE__*/React.createElement("div", {
      className: "row"
    }, /*#__PURE__*/React.createElement("div", {
      className: "col-12"
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: "18pt"
      },
      className: "align-middle w-75"
    }, details[0].name + " (" + date + ") "), /*#__PURE__*/React.createElement("img", {
      className: "align-middle",
      src: details[0].icon,
      alt: "Weather Icon"
    }))), /*#__PURE__*/React.createElement("div", {
      className: "row"
    }, /*#__PURE__*/React.createElement("div", {
      className: "col-12"
    }, /*#__PURE__*/React.createElement("ul", {
      className: "m-0 p-0 text-secondary",
      style: {
        listStyleType: "none",
        fontSize: "16pt"
      }
    }, /*#__PURE__*/React.createElement("li", {
      className: "p1"
    }, /*#__PURE__*/React.createElement("span", null, "Temp: ", details[0].temp)), /*#__PURE__*/React.createElement("li", {
      className: "p1"
    }, /*#__PURE__*/React.createElement("span", null, "Wind: ", details[0].wind)), /*#__PURE__*/React.createElement("li", {
      className: "p1"
    }, /*#__PURE__*/React.createElement("span", null, "Humidity: ", details[0].humidity)), /*#__PURE__*/React.createElement("li", {
      className: "p1"
    }, /*#__PURE__*/React.createElement("span", null, "UV Index: ", details[0].uv)))))));
  } else {
    return /*#__PURE__*/React.createElement("div", {
      className: "col-12 w-100 h-50"
    }, /*#__PURE__*/React.createElement("div", {
      className: "container-fluid"
    }, /*#__PURE__*/React.createElement("div", {
      className: "row"
    }, /*#__PURE__*/React.createElement("div", {
      className: "alert alert-warning fade show",
      role: "alert"
    }, /*#__PURE__*/React.createElement("strong", null, "No weather data loaded")))));
  }
}

function ForecastItem(props) {
  logger.log("Rendering Forecast Item Details", 3);
  var details = props.item;
  var day = props.day;
  logger.log(details, 100);
  logger.log(day, 100);
  var date = moment().add(day, 'day').format('DD/MM/YYYY');

  if (details !== null) {
    logger.log("Rendering Forecast item Details", 3);
    return /*#__PURE__*/React.createElement("div", {
      className: "col-lg-2 col-md-4 col-sm-1 w-100 h-50 p-1 m-1 bg-dark text-white"
    }, /*#__PURE__*/React.createElement("div", {
      className: "container-fluid "
    }, /*#__PURE__*/React.createElement("div", {
      className: "row"
    }, /*#__PURE__*/React.createElement("div", {
      className: "col-12"
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: "14pt"
      },
      className: "align-middle w-75"
    }, "(" + date + ")"), /*#__PURE__*/React.createElement("img", {
      className: "align-middle",
      src: details.icon,
      alt: "Weather Icon"
    }))), /*#__PURE__*/React.createElement("div", {
      className: "row"
    }, /*#__PURE__*/React.createElement("div", {
      className: "col-12"
    }, /*#__PURE__*/React.createElement("ul", {
      className: "m-0 p-0 text-white",
      style: {
        listStyleType: "none",
        fontSize: "12pt"
      }
    }, /*#__PURE__*/React.createElement("li", {
      className: "p1"
    }, /*#__PURE__*/React.createElement("span", null, "Temp: ", details.temp)), /*#__PURE__*/React.createElement("li", {
      className: "p1"
    }, /*#__PURE__*/React.createElement("span", null, "Wind: ", details.wind)), /*#__PURE__*/React.createElement("li", {
      className: "p1"
    }, /*#__PURE__*/React.createElement("span", null, "Humidity: ", details.humidity)), /*#__PURE__*/React.createElement("li", {
      className: "p1"
    }, /*#__PURE__*/React.createElement("span", null, "UV Index: ", details.uv)))))));
  } else {
    return /*#__PURE__*/React.createElement("div", {
      className: "col-2 w-100 h-50"
    });
  }
}

function Forecast(props) {
  logger.log("Rendering Forecast Details", 1);
  var details = props.weather;
  logger.log(details);
  var date = moment().format('DD/MM/YYYY');

  if (details !== null && details.length > 0) {
    logger.log("Rendering Forecast Details", 1);
    var forecastDetails = details.slice(1, 6); // remove today from the array and only display 5 days

    var forecastItems = forecastDetails.map(function (item, day) {
      return /*#__PURE__*/React.createElement(ForecastItem, {
        day: day + 1,
        item: item
      });
    });
    return /*#__PURE__*/React.createElement("div", {
      className: "col-12 w-100 h-50 p-2 mb-3"
    }, /*#__PURE__*/React.createElement("div", {
      className: "container-fluid"
    }, /*#__PURE__*/React.createElement("div", {
      className: "row"
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: "16pt"
      }
    }, "5-day Forecast:")), /*#__PURE__*/React.createElement("div", {
      className: "row justify-content-between"
    }, forecastItems)));
  } else {
    return /*#__PURE__*/React.createElement("div", {
      className: "col-12 w-100 h-50"
    });
  }
}

var App = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose(App, _React$Component);

  function App() {
    var _this;

    _this = _React$Component.call(this) || this;
    _this.controller = new Controller(_assertThisInitialized(_this), window.localStorage);
    _this.state = {
      weather: []
    };
    logger.setOff();
    logger.setLevel(1000);
    return _this;
  }

  var _proto = App.prototype;

  _proto.render = function render() {
    return /*#__PURE__*/React.createElement("div", {
      id: "App",
      className: "App container-fluid w-100"
    }, /*#__PURE__*/React.createElement("div", {
      className: "row"
    }, /*#__PURE__*/React.createElement("div", {
      className: "col-lg-3 col-md-4 col-sm-12"
    }, /*#__PURE__*/React.createElement("div", {
      className: "container-fluid w-100"
    }, /*#__PURE__*/React.createElement("div", {
      className: "row"
    }, /*#__PURE__*/React.createElement("div", {
      className: "col-12"
    }, /*#__PURE__*/React.createElement("form", {
      id: "searchForm",
      className: "was-validated",
      noValidate: false,
      onSubmit: this.controller.handleWeatherSearch
    }, /*#__PURE__*/React.createElement("div", {
      className: "form-group"
    }, /*#__PURE__*/React.createElement("h3", null, "Search for a City:"), /*#__PURE__*/React.createElement("input", {
      type: "text",
      className: "form-control",
      id: "cityName",
      required: true
    }), /*#__PURE__*/React.createElement("div", {
      className: "invalid-feedback"
    }, "Please provide a City name")), /*#__PURE__*/React.createElement("div", {
      className: "form-group"
    }, /*#__PURE__*/React.createElement("button", {
      className: "btn btn-primary w-100"
    }, /*#__PURE__*/React.createElement("i", {
      className: "fa fa-send-o"
    }), "Search")))), /*#__PURE__*/React.createElement("div", {
      className: "col-12"
    }, /*#__PURE__*/React.createElement("hr", null)), /*#__PURE__*/React.createElement("div", {
      className: "col-12 w-100"
    }, /*#__PURE__*/React.createElement(PreviousSearches, {
      controller: this.controller
    }))))), /*#__PURE__*/React.createElement("div", {
      className: "col-lg-9 col-md-8 col-sm-12"
    }, /*#__PURE__*/React.createElement("div", {
      className: "container-fluid"
    }, /*#__PURE__*/React.createElement("div", {
      className: "row"
    }, /*#__PURE__*/React.createElement(TodaysDetails, {
      weather: this.state.weather
    }), /*#__PURE__*/React.createElement(Forecast, {
      weather: this.state.weather
    }))))));
  };

  return App;
}(React.Component);

var element = /*#__PURE__*/React.createElement(App, {
  className: "container-fluid"
});
ReactDOM.render(element, document.getElementById("root"));