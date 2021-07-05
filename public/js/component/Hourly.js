import logger from "../util/SimpleDebug.js";
import HourlyItem from "./HourlyItem.js";
export default function Hourly(props) {
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