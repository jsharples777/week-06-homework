import Controller from "./Controller.js";

function PreviousSearches(props) {
    return (
        <ul></ul>

    );
}

function TodaysDetails(props) {
    return (
        <ul></ul>

    );
}

function Forecast(props) {
    return (
        <ul></ul>

    );
}

class App extends React.Component {


    constructor() {
        super();
        this.controller = new Controller(this,window.localStorage);
        this.state = {currentSearchResults: {}}
    }

    render() {
        return (
            <div id="App" className="App container-fluid w-100">
                <div className={"row"}>
                    <div className={"col-lg-3 col-md-4 col-sm-12"}>
                        <div className={"container-fluid w-100"}>
                            <div className="row">
                                <div className={"col-12"}>
                                    <form id={"searchForm"} className={"was-validated"} noValidate={""} onSubmit={this.controller.getPreviousCitySearches}>
                                        <div className={"form-group"}>
                                            <h3>Search for a City:</h3>
                                            <input type={"text"} className={"form-control is-invalid"} id={"cityName"} placeholder={"Melbourne"}></input>
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
                                <div className={"col-12"}>
                                    <PreviousSearches controller={this.controller.getPreviousCitySearches}/>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className={"col-lg-9 col-md-8 col-sm-12"}>
                        <div className={"container-fluid"}>
                            <div className={"row"}>
                                <div className={"col-12 w-100 border border-dark rounded h-50 p-2 mb-3"}>
                                    <TodaysDetails/>
                                </div>
                                <div className={"col-12 w-100 h-50 pt-2 bg-dark text-white text-left"}>
                                    <Forecast/>
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
