import logger from "../util/SimpleDebug.js";
export default function ForecastItem(props) {
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