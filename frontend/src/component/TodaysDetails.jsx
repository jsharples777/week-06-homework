import logger from "../util/SimpleDebug.js";

export default function TodaysDetails(props) {
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
            uvBadgeClass += "uv-warning";
        } else {
            uvBadgeClass += "has-background-danger-dark";
        }
        return (
            <div className={"column is-full"}>
                <div className={"box"}>
                    <span style={{fontSize: "18pt"}}>{details[0].name + " (" + date + ") "}</span><img
                    className={"weathericon"} src={details[0].icon}
                    alt={"Weather Icon"}/>
                    <ul className={"m-0 p-0"} style={{listStyleType: "none", fontSize: "16pt"}}>
                        <li className={"p-1"}>
                            <span>Current Temp: {details[0].temp}</span>
                        </li>
                        <li className={"p-1"}>
                            <span>Feels Like: {details[0].feels_like}</span>
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