import logger from "../util/SimpleDebug.js";

export default function PreviousSearches(props) {

    let searchHandler = props.searchHandler;
    let deleteHanlder = props.deleteHandler;
    /* find any previous city name searches */
    let previousCityNames = props.searches;
    logger.log("Previous City Names is " + previousCityNames, 1);

    let cityNameRows = "";
    if (previousCityNames != null) {
        cityNameRows = previousCityNames.map((name, index) =>
            <li key={index} className={"mt-3"}>
                <button cityname={name} className={"button is-info is-outlined"} onClick={searchHandler}>{name}</button>  <button cityname={name} className="button is-danger is-outlined" onClick={deleteHanlder}><span cityname={name} className="icon is-small"><i cityname={name} className="fas fa-times"></i></span></button>
            </li>
        );
    }

    return (
        <ul id="previousSearches" className={"ml-0 pl-0 pb-1"}>
            {cityNameRows}
        </ul>

    );

}