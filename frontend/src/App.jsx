import Controller from "./Controller.js";
import logger from "./util/SimpleDebug.js";

import PreviousSearches from "./component/PreviousSearches.js";
import TodaysDetails from "./component/TodaysDetails.js";
import Hourly from "./component/Hourly.js";
import Forecast from "./component/Forecast.js";

class App extends React.Component {

    constructor() {
        super();
        this.controller = new Controller(this, window.localStorage);
        this.state = {weather: [], hourly: [], previousSearches: []};
    }

    render() {
        return (
            <div id="App" className="App columns">

                <div className={"column is-one-quarter ml-1"}>
                    <form id={"searchForm"} onSubmit={this.controller.handleWeatherSearch}>
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
                    <PreviousSearches searches={this.state.previousSearches} searchHandler={this.controller.handleWeatherSearchForPreviousSearch} deleteHandler={this.controller.handleDeletePreviousSearch}/>
                </div>
                <div className={"column is-three-quarters"}>


                    <TodaysDetails weather={this.state.weather}/>
                    <Hourly hourly={this.state.hourly}/>
                    <Forecast weather={this.state.weather}/>


                </div>
            </div>


        );
    }

    componentDidMount() {
        this.setState({previousSearches:this.controller.getPreviousCitySearches()});
    }
}

logger.setOff();
logger.setLevel(80);
const element = <App className={"columns"}/>

ReactDOM.render(element, document.getElementById("root"));
