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
        key: index
      }, /*#__PURE__*/React.createElement("button", {
        cityname: name,
        className: "button is-info is-outlined mt-3",
        onClick: controller.handleWeatherSearchForPreviousSearch
      }, name));
    });
  }

  return /*#__PURE__*/React.createElement("ul", {
    id: "previousSearches",
    className: "ml-0 pl-0 pb-1"
  }, cityNameRows);
}

function TodaysDetails(props) {
  logger.log("Rendering Todays Details", 1);
  var details = props.weather;
  logger.log(details);
  var date = moment().format('DD/MM/YYYY');

  if (details !== null && details.length > 0) {
    logger.log("Rendering Todays Details", 1);
    logger.log(details[0], 1);
    var uvBadgeClass = "badge ";

    if (details[0].uv < 5) {
      uvBadgeClass += "has-background-success-dark";
    } else if (details[0].uv >= 5 && details[0].uv < 8) {
      uvBadgeClass += "uv-warning";
    } else {
      uvBadgeClass += "has-background-danger-dark";
    }

    return /*#__PURE__*/React.createElement("div", {
      className: "column is-full"
    }, /*#__PURE__*/React.createElement("div", {
      className: "box"
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: "18pt"
      }
    }, details[0].name + " (" + date + ") "), /*#__PURE__*/React.createElement("img", {
      className: "weathericon",
      src: details[0].icon,
      alt: "Weather Icon"
    }), /*#__PURE__*/React.createElement("ul", {
      className: "m-0 p-0",
      style: {
        listStyleType: "none",
        fontSize: "16pt"
      }
    }, /*#__PURE__*/React.createElement("li", {
      className: "p-1"
    }, /*#__PURE__*/React.createElement("span", null, "Current Temp: ", details[0].temp)), /*#__PURE__*/React.createElement("li", {
      className: "p-1"
    }, /*#__PURE__*/React.createElement("span", null, "Feels Like: ", details[0].feels_like)), /*#__PURE__*/React.createElement("li", {
      className: "p-1"
    }, /*#__PURE__*/React.createElement("span", null, "Max Temp: ", details[0].max_temp)), /*#__PURE__*/React.createElement("li", {
      className: "p-1"
    }, /*#__PURE__*/React.createElement("span", null, "Wind: ", details[0].wind)), /*#__PURE__*/React.createElement("li", {
      className: "p-1"
    }, /*#__PURE__*/React.createElement("span", null, "Humidity: ", details[0].humidity)), /*#__PURE__*/React.createElement("li", {
      className: "p-1"
    }, /*#__PURE__*/React.createElement("span", null, "UV Index: ", /*#__PURE__*/React.createElement("span", {
      className: uvBadgeClass
    }, details[0].uv))))));
  } else {
    return /*#__PURE__*/React.createElement("div", {
      className: "column "
    }, /*#__PURE__*/React.createElement("button", {
      className: "button is-warning",
      disabled: true
    }, "No Weather Data Loaded"));
  }
}

function ForecastItem(props) {
  logger.log("Rendering Forecast Item Details", 51);
  var details = props.item;
  var day = props.day;
  logger.log(details, 100);
  logger.log(day, 100);
  var date = moment().add(day, 'day').format('DD/MM/YYYY');

  if (details !== null) {
    logger.log("Rendering Forecast item Details", 3);
    var uvBadgeClass = "badge ";

    if (details.uv < 5) {
      uvBadgeClass += "has-background-success-dark";
    } else if (details.uv >= 5 && details.uv < 8) {
      uvBadgeClass += "uv-warning";
    } else {
      uvBadgeClass += "has-background-danger-dark";
    }

    return /*#__PURE__*/React.createElement("div", {
      className: "column rounded is-one-third-tablet is-one-fifth-desktop"
    }, /*#__PURE__*/React.createElement("div", {
      className: "box"
    }, /*#__PURE__*/React.createElement("span", {
      className: "is-size-5"
    }, date), /*#__PURE__*/React.createElement("img", {
      className: "weathericon",
      src: details.icon,
      alt: "Weather Icon"
    }), /*#__PURE__*/React.createElement("ul", {
      className: "m-0 p-0 is-size-6",
      style: {
        listStyleType: "none"
      }
    }, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("span", null, "Min Temp: ", details.min_temp)), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("span", null, "Max Temp: ", details.max_temp)), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("span", null, "Wind: ", details.wind)), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("span", null, "Humidity: ", details.humidity)), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("span", null, "UV Index: ", /*#__PURE__*/React.createElement("span", {
      className: uvBadgeClass
    }, details.uv))))));
  } else {
    return /*#__PURE__*/React.createElement("div", {
      className: "column"
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
        key: day,
        day: day + 1,
        item: item
      });
    });
    return /*#__PURE__*/React.createElement("div", {
      className: "pb-5"
    }, /*#__PURE__*/React.createElement("div", {
      className: "columns is-justify-content-space-evenly is-multiline is-3"
    }, forecastItems));
  } else {
    return /*#__PURE__*/React.createElement("div", null);
  }
}

function HourlyItem(props) {
  logger.log("Rendering Hourly Item Details", 51);
  var details = props.item;
  var hour = props.hour;
  logger.log(details, 100);
  logger.log(hour, 100);
  var time = moment().add(hour, 'hours').format('HH') + ":00";

  if (details !== null) {
    logger.log("Rendering Hourly item Details", 3);
    var uvBadgeClass = "badge ";

    if (details.uv < 5) {
      uvBadgeClass += "has-background-success-dark";
    } else if (details.uv >= 5 && details.uv < 8) {
      uvBadgeClass += "has-background-warning-dark";
    } else {
      uvBadgeClass += "has-background-danger-dark";
    }

    return /*#__PURE__*/React.createElement("div", {
      className: "column rounded is-2-tablet is-2-desktop"
    }, /*#__PURE__*/React.createElement("div", {
      className: "box"
    }, /*#__PURE__*/React.createElement("span", {
      className: "is-size-7"
    }, time), /*#__PURE__*/React.createElement("img", {
      className: "weathericonsml",
      src: details.icon,
      alt: "Weather Icon"
    }), /*#__PURE__*/React.createElement("ul", {
      className: "m-0 p-0 is-size-7",
      style: {
        listStyleType: "none"
      }
    }, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("span", null, "Temp: ", details.temp)), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("span", null, "Prec: ", details.precipitation)))));
  } else {
    return /*#__PURE__*/React.createElement("div", {
      className: "column"
    });
  }
}

function Hourly(props) {
  logger.log("Rendering Hourly Details", 1);
  var details = props.hourly;
  logger.log(details);

  if (details !== null && details.length > 0) {
    logger.log("Rendering Hourly Details", 1);
    var hourlyItems = details.map(function (item, hour) {
      return /*#__PURE__*/React.createElement(HourlyItem, {
        key: hour,
        hour: hour + 1,
        item: item
      });
    });
    return /*#__PURE__*/React.createElement("div", {
      className: "pb-5"
    }, /*#__PURE__*/React.createElement("div", {
      className: "columns is-justify-content-space-evenly is-multiline"
    }, hourlyItems));
  } else {
    return /*#__PURE__*/React.createElement("div", null);
  }
}

var App = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose(App, _React$Component);

  function App() {
    var _this;

    _this = _React$Component.call(this) || this;
    _this.controller = new Controller(_assertThisInitialized(_this), window.localStorage);
    _this.state = {
      weather: [],
      hourly: []
    };
    return _this;
  }

  var _proto = App.prototype;

  _proto.render = function render() {
    return /*#__PURE__*/React.createElement("div", {
      id: "App",
      className: "App columns"
    }, /*#__PURE__*/React.createElement("div", {
      className: "column is-one-quarter ml-1"
    }, /*#__PURE__*/React.createElement("form", {
      id: "searchForm",
      onSubmit: this.controller.handleWeatherSearch
    }, /*#__PURE__*/React.createElement("div", {
      className: "field has-addons"
    }, /*#__PURE__*/React.createElement("div", {
      className: "control"
    }, /*#__PURE__*/React.createElement("input", {
      id: "cityname",
      className: "input",
      type: "text",
      placeholder: "City Name",
      required: true
    })), /*#__PURE__*/React.createElement("div", {
      className: "control"
    }, /*#__PURE__*/React.createElement("a", {
      className: "button is-info",
      onClick: this.controller.handleWeatherSearch
    }, "Search"))), /*#__PURE__*/React.createElement("p", {
      className: "help"
    }, "Please enter a city name.")), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement(PreviousSearches, {
      controller: this.controller
    })), /*#__PURE__*/React.createElement("div", {
      className: "column is-three-quarters"
    }, /*#__PURE__*/React.createElement(TodaysDetails, {
      weather: this.state.weather
    }), /*#__PURE__*/React.createElement(Hourly, {
      hourly: this.state.hourly
    }), /*#__PURE__*/React.createElement(Forecast, {
      weather: this.state.weather
    })));
  };

  return App;
}(React.Component);

logger.setOff();
logger.setLevel(80);
var element = /*#__PURE__*/React.createElement(App, {
  className: "columns"
});
ReactDOM.render(element, document.getElementById("root"));