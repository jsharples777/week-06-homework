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
  var cityNameRows = previousCityNames.map(function (name) {
    return /*#__PURE__*/React.createElement("li", {
      cityName: name,
      className: "border rounded bg-dark text-white",
      onClick: controller.handleWeatherSearchForPreviousSearch
    }, name);
  });
  return /*#__PURE__*/React.createElement("ul", null);
}

function TodaysDetails(props) {
  var details = null;

  if (details !== null) {
    return /*#__PURE__*/React.createElement("div", {
      className: "col-12 w-100 border border-dark rounded h-50 p-2 mb-3"
    });
  } else {
    return /*#__PURE__*/React.createElement("div", {
      className: "col-12 w-100 h-50"
    });
  }
}

function Forecast(props) {
  var forecast = null;

  if (forecast !== null) {
    return /*#__PURE__*/React.createElement("div", {
      className: "col-12 w-100 h-50 pt-2 bg-dark text-white text-left"
    });
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
      className: "form-control is-invalid",
      id: "cityName",
      placeholder: "Melbourne"
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
      className: "col-12"
    }, /*#__PURE__*/React.createElement(PreviousSearches, {
      controller: this.controller
    }))))), /*#__PURE__*/React.createElement("div", {
      className: "col-lg-9 col-md-8 col-sm-12"
    }, /*#__PURE__*/React.createElement("div", {
      className: "container-fluid"
    }, /*#__PURE__*/React.createElement("div", {
      className: "row"
    }, /*#__PURE__*/React.createElement(TodaysDetails, null), /*#__PURE__*/React.createElement(Forecast, null))))));
  };

  return App;
}(React.Component);

var element = /*#__PURE__*/React.createElement(App, {
  className: "container-fluid"
});
ReactDOM.render(element, document.getElementById("root"));