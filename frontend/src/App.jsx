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
            <li key={index}><button cityname={name}
                className={"button is-info is-outlined mt-3"}
                        onClick={controller.handleWeatherSearchForPreviousSearch}>{name}</button></li>
        );
    }

    return (
        <ul id="previousSearches" className={"ml-0 pl-0 pb-1"}>
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
        logger.log(details[0], 1);


        let uvBadgeClass = "badge ";
        if (details[0].uv < 5) {
            uvBadgeClass += "has-background-success-dark";
        } else if ((details[0].uv >= 5) && (details[0].uv < 8)) {
            uvBadgeClass += "has-background-warning-dark";
        } else {
            uvBadgeClass += "has-background-danger-dark";
        }
        return (
            <div className={"column is-full"}>
                <div className={"box"}>
                <span style={{fontSize: "18pt"}}>{details[0].name + " (" + date + ") "}</span><img className={"weathericon"} src={details[0].icon}
                                                                                                   alt={"Weather Icon"}/>
                <ul className={"m-0 p-0"} style={{listStyleType: "none", fontSize: "16pt"}}>
                    <li className={"p-1"}>
                        <span>Current Temp: {details[0].temp}</span>
                    </li>
                    <li className={"p-1"}>
                        <span>Max Temp: {details[0].max_temp}</span>
                    </li>
                    <li className={"p-1"}>
                        <span>Wind: {details[0].wind}</span>
                    </li>
                    <li className={"p-1"}>
                        <span>Humidity: {details[0].humidity}</span>
                    </li>
                    <li className={"p-1"}>
                        <span>UV Index: <span className={uvBadgeClass}>{details[0].uv}</span></span>
                    </li>
                </ul>

                </div>
            </div>

        );
    } else {
        return (
            <div className={"column "}>
               <button className="button is-warning" disabled={true}>No Weather Data Loaded</button>
            </div>
        );
    }

}

function ForecastItem(props) {
    logger.log("Rendering Forecast Item Details", 51);

    let details = props.item;
    let day = props.day;
    logger.log(details, 100);
    logger.log(day, 100);
    let date = moment().add(day, 'day').format('DD/MM/YYYY');

    if (details !== null) {
        logger.log("Rendering Forecast item Details", 3);
        let uvBadgeClass = "badge ";
        if (details.uv < 5) {
            uvBadgeClass += "has-background-success-dark";
        } else if ((details.uv >= 5) && (details.uv < 8)) {
            uvBadgeClass += "has-background-warning-dark";
        } else {
            uvBadgeClass += "has-background-danger-dark";
        }
        return (
            <div className={"column rounded is-one-third-tablet is-one-fifth-desktop"}>
                <div className={"box"}>
                <span className={"is-size-5"}>{date}</span><img className={"weathericon"} src={details.icon} alt={"Weather Icon"}/>
                <ul className={"m-0 p-0 is-size-6"} style={{listStyleType: "none"}}>
                    <li >
                        <span>Min Temp: {details.min_temp}</span>
                    </li>
                    <li>
                        <span>Max Temp: {details.max_temp}</span>
                    </li>
                    <li>
                        <span>Wind: {details.wind}</span>
                    </li>
                    <li>
                        <span>Humidity: {details.humidity}</span>
                    </li>
                    <li>
                        <span>UV Index: <span className={uvBadgeClass}>{details.uv}</span></span>
                    </li>
                </ul>
                </div>
            </div>

        );
    } else {
        return (
            <div className={"column"}>
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
            <div className={"pb-5"}>
                <div className={"columns is-justify-content-space-evenly is-multiline is-3"}>
                    {forecastItems}
                </div>

            </div>
        );
    } else {
        return (
            <div>
            </div>
        )
    }
}

function HourlyItem(props) {
    logger.log("Rendering Hourly Item Details", 51);

    let details = props.item;
    let hour = props.hour;
    logger.log(details, 100);
    logger.log(hour, 100);
    let time = moment().add(hour, 'hours').format('HH')+":00";

    if (details !== null) {
        logger.log("Rendering Hourly item Details", 3);
        let uvBadgeClass = "badge ";
        if (details.uv < 5) {
            uvBadgeClass += "has-background-success-dark";
        } else if ((details.uv >= 5) && (details.uv < 8)) {
            uvBadgeClass += "has-background-warning-dark";
        } else {
            uvBadgeClass += "has-background-danger-dark";
        }
        return (
            <div className={"column rounded is-2-tablet is-2-desktop"}>
                <div className={"box"}>
                    <span className={"is-size-7"}>{time}</span><img className={"weathericonsml"} src={details.icon} alt={"Weather Icon"}/>
                    <ul className={"m-0 p-0 is-size-7"} style={{listStyleType: "none"}}>
                        <li >
                            <span>Temp: {details.temp}</span>
                        </li>
                        <li>
                            <span>Prec: {details.precipitation}</span>
                        </li>
                    </ul>
                </div>
            </div>

        );
    } else {
        return (
            <div className={"column"}>
            </div>
        )
    }

}

function Hourly(props) {
    logger.log("Rendering Hourly Details", 1);

    let details = props.hourly;
    logger.log(details);


    if ((details !== null) && (details.length > 0)) {
        logger.log("Rendering Hourly Details", 1);

        const hourlyItems = details.map((item, hour) =>
            <HourlyItem key={hour} hour={hour + 1} item={item}/>
        );

        return (
            <div className={"pb-5"}>
                <div className={"columns is-justify-content-space-evenly is-multiline"}>
                    {hourlyItems}
                </div>
            </div>
        );
    } else {
        return (
            <div>
            </div>
        )
    }
}

class App extends React.Component {

    constructor() {
        super();
        this.controller = new Controller(this, window.localStorage);
        this.state = {weather: [],hourly:[]};
    }

    render() {
        return (
            <div id="App" className="App columns">

                <div className={"column is-one-quarter ml-1"}>
                    <form id={"searchForm"}  onSubmit={this.controller.handleWeatherSearch}>
                        <div className="field has-addons">
                            <div className="control">
                                <input id="cityname" className="input" type="text" placeholder="City Name"
                                       required></input>
                            </div>
                            <div className="control">
                                <a className="button is-info" onClick={this.controller.handleWeatherSearch}>
                                    Search
                                </a>
                            </div>

                        </div>
                        <p className="help">Please enter a city name.</p>
                    </form>


                    <hr></hr>
                    <PreviousSearches controller={this.controller}/>
                </div>
                <div className={"column is-three-quarters"}>


                    <TodaysDetails weather={this.state.weather}/>
                    <Hourly hourly={this.state.hourly}/>
                    <Forecast weather={this.state.weather}/>


                </div>
            </div>


        );
    }
}

logger.setOff();
logger.setLevel(80);
const element = <App className={"columns"}/>

ReactDOM.render(element, document.getElementById("root"));
