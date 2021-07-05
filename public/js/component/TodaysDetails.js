import logger from "../util/SimpleDebug.js";
export default function TodaysDetails(props) {
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