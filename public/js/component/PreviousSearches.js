import logger from "../util/SimpleDebug.js";
export default function PreviousSearches(props) {
  var searchHandler = props.searchHandler;
  var deleteHanlder = props.deleteHandler;
  /* find any previous city name searches */

  var previousCityNames = props.searches;
  logger.log("Previous City Names is " + previousCityNames, 1);
  var cityNameRows = "";

  if (previousCityNames != null) {
    cityNameRows = previousCityNames.map(function (name, index) {
      return /*#__PURE__*/React.createElement("li", {
        key: index,
        className: "mt-3"
      }, /*#__PURE__*/React.createElement("button", {
        cityname: name,
        className: "button is-info is-outlined",
        onClick: searchHandler
      }, name), "  ", /*#__PURE__*/React.createElement("button", {
        cityname: name,
        className: "button is-danger is-outlined",
        onClick: deleteHanlder
      }, /*#__PURE__*/React.createElement("span", {
        cityname: name,
        className: "icon is-small"
      }, /*#__PURE__*/React.createElement("i", {
        cityname: name,
        className: "fas fa-times"
      }))));
    });
  }

  return /*#__PURE__*/React.createElement("ul", {
    id: "previousSearches",
    className: "ml-0 pl-0 pb-1"
  }, cityNameRows);
}