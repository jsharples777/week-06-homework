import logger from "../util/SimpleDebug.js";
import HourlyItem from "./HourlyItem.js";

export default function Hourly(props) {
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
