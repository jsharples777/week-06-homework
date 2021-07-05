import logger from "../util/SimpleDebug.js";
export default function HourlyItem(props) {
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