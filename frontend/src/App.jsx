import Controller from "./Controller.js";
import logger from "./util/SimpleDebug.js";

function PreviousSearches(props) {

    let controller = props.controller;
    logger.log(controller);
    /* find any previous city name searches */
    let previousCityNames = controller.getPreviousCitySearches();
    logger.log("Previous City Names is " + previousCityNames, 1);

    let cityNameRows = "";
    if (previousCityNames != null) {
        cityNameRows = previousCityNames.map((name, index) =>
            <li key={index} cityname={name} className={"border rounded bg-secondary text-white w-100 p-1"}
                onClick={controller.handleWeatherSearchForPreviousSearch}>{name}</li>
        );
    }

    return (
        <ul id="previousSearches" className={"m-0 pl-0 pb-1"}>
            {cityNameRows}
        </ul>

    );
}

function TodaysDetails(props) {
    logger.log("Rendering Todays Details", 1);

    let details = props.weather;
    logger.log(details);
    let date = moment().format('DD/MM/YYYY');

    if ((details !== null) && (details.length > 0)) {
        logger.log("Rendering Todays Details", 1);
        logger.log(details[0]);
        return (
            <div className={"col-12 w-100 border border-dark rounded h-50 p-2 mb-3"}>
                <div className={"container-fluid"}>
                    <div className={"row"}>
                        <div className={"col-12"}>
                            <span style={{fontSize: "18pt"}}
                                  className={"align-middle w-75"}>{details[0].name + " (" + date + ") "}</span><img
                            className={"align-middle"} src={details[0].icon} alt={"Weather Icon"}/>
                        </div>
                    </div>
                    <div className={"row"}>
                        <div className={"col-12"}>
                            <ul className={"m-0 p-0 text-secondary"} style={{listStyleType: "none", fontSize: "16pt"}}>
                                <li className={"p1"}>
                                    <span>Temp: {details[0].temp}</span>
                                </li>
                                <li className={"p1"}>
                                    <span>Wind: {details[0].wind}</span>
                                </li>
                                <li className={"p1"}>
                                    <span>Humidity: {details[0].humidity}</span>
                                </li>
                                <li className={"p1"}>
                                    <span>UV Index: {details[0].uv}</span>
                                </li>
                            </ul>
                        </div>

                    </div>
                </div>

            </div>

        );
    } else {
        return (
            <div className={"col-12 w-100 h-50"}>
                <div className={"container-fluid"}>
                    <div className={"row"}>
                        <div className="alert alert-warning fade show" role="alert">
                            <strong>No weather data loaded</strong>
                        </div>
                    </div>
                </div>
            </div>

        );
    }

}

function ForecastItem(props) {
    logger.log("Rendering Forecast Item Details", 3);

    let details = props.item;
    let day = props.day;
    logger.log(details, 100);
    logger.log(day, 100);
    let date = moment().add(day, 'day').format('DD/MM/YYYY');

    if (details !== null) {
        logger.log("Rendering Forecast item Details", 3);
        return (
            <div className={"col-lg-2 col-md-4 col-sm-12 w-100 p-1 m-1 text-white"}>
                <div className={"container-fluid bg-dark"}>
                    <div className={"row"}>
                        <div className={"col-12"}>
                            <span style={{fontSize: "14pt"}}
                                  className={"align-middle w-75"}>{"(" + date + ")"}</span><img
                            className={"align-middle"} src={details.icon} alt={"Weather Icon"}/>
                        </div>
                    </div>
                    <div className={"row"}>
                        <div className={"col-12"}>
                            <ul className={"m-0 p-0 text-white"} style={{listStyleType: "none", fontSize: "12pt"}}>
                                <li className={"p1"}>
                                    <span>Temp: {details.temp}</span>
                                </li>
                                <li className={"p1"}>
                                    <span>Wind: {details.wind}</span>
                                </li>
                                <li className={"p1"}>
                                    <span>Humidity: {details.humidity}</span>
                                </li>
                                <li className={"p1"}>
                                    <span>UV Index: {details.uv}</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

        );
    } else {
        return (
            <div className={"col-2 w-100 h-50"}>
            </div>
        )
    }

}

function Forecast(props) {
    logger.log("Rendering Forecast Details", 1);

    let details = props.weather;
    logger.log(details);
    let date = moment().format('DD/MM/YYYY');

    if ((details !== null) && (details.length > 0)) {
        logger.log("Rendering Forecast Details", 1);

        let forecastDetails = details.slice(1, 6); // remove today from the array and only display 5 days


        const forecastItems = forecastDetails.map((item, day) =>
            <ForecastItem key={day} day={day + 1} item={item}/>
        );

        return (
            <div className={"col-12 w-100 h-50 p-2 mb-3"}>
                <div className={"container-fluid"}>
                    <div className={"row"}>
                        <span style={{fontSize: "16pt"}}>5-day Forecast:</span>
                    </div>
                    <div className={"row row-eq-height justify-content-between"}>
                        {forecastItems}
                    </div>
                </div>

            </div>

        );
    } else {
        return (
            <div className={"col-12 w-100 h-50"}>
            </div>
        )
    }
}

class App extends React.Component {

    constructor() {
        super();
        this.controller = new Controller(this, window.localStorage);
        this.state = {weather: []};
        logger.setOff();
        logger.setLevel(1000);

    }

    render() {
        return (
            <div id="App" className="App container-fluid w-100">
                <div className={"row"}>
                    <div className={"col-lg-3 col-md-4 col-sm-12"}>
                        <div className={"container-fluid w-100"}>
                            <div className="row">
                                <div className={"col-12"}>
                                    <form id={"searchForm"} className={"was-validated"} noValidate={false}
                                          onSubmit={this.controller.handleWeatherSearch}>
                                        <div className={"form-group"}>
                                            <h3>Search for a City:</h3>
                                            <input type={"text"} className={"form-control"} id={"cityname"}
                                                   required></input>
                                            <div className={"invalid-feedback"}>Please provide a City name</div>
                                        </div>
                                        <div className={"form-group"}>
                                            <button className={"btn btn-primary w-100"}>
                                                <i className={"fa fa-send-o"}></i>Search
                                            </button>
                                        </div>
                                    </form>

                                </div>
                                <div className={"col-12"}>
                                    <hr></hr>
                                </div>
                                <div className={"col-12 w-100"}>
                                    <PreviousSearches controller={this.controller}/>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className={"col-lg-9 col-md-8 col-sm-12"}>
                        <div className={"container-fluid"}>
                            <div className={"row"}>

                                <TodaysDetails weather={this.state.weather}/>
                                <Forecast weather={this.state.weather}/>
                                <div className={"h-25"}>

                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


const element = <App className={"container-fluid"}/>

ReactDOM.render(element, document.getElementById("root"));
