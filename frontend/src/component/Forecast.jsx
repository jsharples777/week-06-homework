import logger from "../util/SimpleDebug.js";
import ForecastItem from "./ForecastItem.js";

export default function Forecast(props) {
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