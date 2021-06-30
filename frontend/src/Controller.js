import logger from './util/SimpleDebug.js';



export default class Controller {

    constructor(applicationView, clientSideStorage) {
        this.applicationView = applicationView;
        this.clientSideStorage = clientSideStorage;
        this.currentQueryURL = "/current";
        this.forecastQueryURL = "/forecast";
        // this.queryURL = "https://api.openweathermap.org/data/2.5/weather";
        this.savedSearchesKey = "savedSearchesKey";
        this.previousSearches = [];


        this.getPreviousCitySearches = this.getPreviousCitySearches.bind(this);
        this.handleWeatherSearch = this.handleWeatherSearch.bind(this);
        this.handleWeatherSearchForPreviousSearch = this.handleWeatherSearchForPreviousSearch.bind(this);

        this.__callbackWeatherSearch = this.__callbackWeatherSearch.bind(this);


    }

    __callbackForecastSearch(data) {
        logger.log(data, 20);
        logger.log(data.weather, 100);
        this.applicationView.setState({forecast: data});
    }

    /* private */ __callbackWeatherSearch(data) {
        logger.log(data,20);
        logger.log(data.weather,100);
        this.applicationView.setState({current: data});

        /* now make a call for the forecast */


    }

    /* private */ __fetchQLJSON(url, parameters, callback) {
        const postParameters = {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({parameters})
        };


        fetch(url, postParameters)
            .then(response => response.json())
            .then(data => {
                callback(JSON.parse(data));
            });

    }

    async __getCurrentWeatherDataForCity(cityName) {
        logger.log(`Loading weather for ${cityName}`, 2);
        /* construct the request */
        let fetchParameters = {
            q: cityName
        };


        logger.log(`Fetching weather for ${cityName}`, 2);
        this.__fetchQLJSON(this.currentQueryURL,fetchParameters,this.__callbackWeatherSearch);

    }

    /* private */ __savePreviousSearches() {
        logger.log("Saving Previous Searches", 5);
        let stringifiedSearches = JSON.stringify(this.previousSearches);
        logger.log(stringifiedSearches,10);
        this.clientSideStorage.setItem(this.savedSearchesKey, stringifiedSearches);
    }

    getPreviousCitySearches() {
        logger.log("Loading Previous Searches", 5);
        let savedSearchesItem = this.clientSideStorage.getItem(this.savedSearchesKey);
        logger.log("Saved previous search items were " + savedSearchesItem, 5);
        if (savedSearchesItem !== null) {
            this.previousSearches = JSON.parse(savedSearchesItem);
        }
        logger.log("Saved previous searches were " + this.previousSearches, 5);
        logger.log(this.previousSearches, 10);
        return this.previousSearches;
    }



    addNewCityNameToPreviousSearches(cityName) {
        if (cityName !== null) {
            // only add the city name if not already in the list
            if (this.previousSearches.findIndex(cityName) < 0) {
                this.previousSearches.push(cityName);
                this.__savePreviousSearches();
            }
        }
    }


    handleWeatherSearch(event) {
        event.preventDefault();
        logger.log("Handling city name search for weather ",2);
        let cityName = document.getElementById("cityName").value;
        logger.log("City Name is " + cityName,2);
        this.__getCurrentWeatherDataForCity(cityName).then(
            logger.log("Loading weather data async",3)
        );

    }

    handleWeatherSearchForPreviousSearch(event) {
        event.preventDefault();
        let cityName = event.target.getAttribute("cityName");
        this.__getCurrentWeatherDataForCity(cityName).then(
            logger.log("Loading weather data async",3)
        );
    }


}
