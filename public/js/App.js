function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

import Controller from "./Controller.js";
import logger from "./util/SimpleDebug.js";
import PreviousSearches from "./component/PreviousSearches.js";
import TodaysDetails from "./component/TodaysDetails.js";
import Hourly from "./component/Hourly.js";
import Forecast from "./component/Forecast.js";

var App = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose(App, _React$Component);

  function App() {
    var _this;

    _this = _React$Component.call(this) || this;
    _this.controller = new Controller(_assertThisInitialized(_this), window.localStorage);
    _this.state = {
      weather: [],
      hourly: [],
      previousSearches: []
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
      searches: this.state.previousSearches,
      searchHandler: this.controller.handleWeatherSearchForPreviousSearch,
      deleteHandler: this.controller.handleDeletePreviousSearch
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

  _proto.componentDidMount = function componentDidMount() {
    this.setState({
      previousSearches: this.controller.getPreviousCitySearches()
    });
  };

  return App;
}(React.Component);

logger.setOn();
logger.setLevel(80);
var element = /*#__PURE__*/React.createElement(App, {
  className: "columns"
});
ReactDOM.render(element, document.getElementById("root"));