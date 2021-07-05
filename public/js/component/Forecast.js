import logger from "../util/SimpleDebug.js";
import ForecastItem from "./ForecastItem.js";
export default function Forecast(props) {
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