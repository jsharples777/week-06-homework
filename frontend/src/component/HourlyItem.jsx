import logger from "../util/SimpleDebug.js";

export default function HourlyItem(props) {
    logger.log("Rendering Hourly Item Details", 51);

    let details = props.item;
    let hour = props.hour;
    logger.log(details, 100);
    logger.log(hour, 100);
    let time = moment().add(hour, 'hours').format('HH') + ":00";

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
                    <span className={"is-size-7"}>{time}</span><img className={"weathericonsml"} src={details.icon}
                                                                    alt={"Weather Icon"}/>
                    <ul className={"m-0 p-0 is-size-7"} style={{listStyleType: "none"}}>
                        <li>
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
