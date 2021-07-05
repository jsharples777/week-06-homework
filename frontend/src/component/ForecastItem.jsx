import logger from "../util/SimpleDebug.js";

export default function ForecastItem(props) {
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
            uvBadgeClass += "uv-warning";
        } else {
            uvBadgeClass += "has-background-danger-dark";
        }
        return (
            <div className={"column rounded is-one-third-tablet is-one-fifth-desktop"}>
                <div className={"box"}>
                    <span className={"is-size-5"}>{date}</span><img className={"weathericon"} src={details.icon}
                                                                    alt={"Weather Icon"}/>
                    <ul className={"m-0 p-0 is-size-6"} style={{listStyleType: "none"}}>
                        <li>
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