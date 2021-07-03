import logger from './util/SimpleDebug.js';


export default class Controller {

    constructor(applicationView, clientSideStorage) {
        this.applicationView = applicationView;
        this.clientSideStorage = clientSideStorage;
        // setup query URLs
        this.currentQueryURL = "/current";
        this.forecastQueryURL = "/forecast";
        // setup local storage key and previous searches array
        this.savedSearchesKey = "savedSearchesKey";
        this.previousSearches = [];


        // setup event handlers and local storage access call
        this.getPreviousCitySearches = this.getPreviousCitySearches.bind(this);
        this.handleWeatherSearch = this.handleWeatherSearch.bind(this);
        this.handleWeatherSearchForPreviousSearch = this.handleWeatherSearchForPreviousSearch.bind(this);
        this.handleDeletePreviousSearch = this.handleDeletePreviousSearch.bind(this);

        // setup Async callbacks for the fetch requests
        this.__callbackWeatherSearch = this.__callbackWeatherSearch.bind(this);
        this.__callbackForecastSearch = this.__callbackForecastSearch.bind(this);
    }

    /* take Open Weather JSON and simplify for the views use */
    __convertForecastDataIntoDisplayFormat(cityName, data) {
        let viewData = [];
        logger.log("Converting Forecast Data for display", 51);
        logger.log(data, 80);

        let viewDataItem = {
            name: cityName,
            temp: Math.round(data.current.temp) + " ºC",
            humidity: data.current.humidity + "%",
            wind: Math.round(data.current.wind_speed) + " m/s",
            uv: Math.round(data.current.uvi),
            icon: "http://openweathermap.org/img/wn/" + data.current.weather[0].icon + ".png"
        }
        logger.log(viewDataItem,80);
        viewData.push(viewDataItem);


        for (let index = 1; index < data.daily.length; index++) {
            let viewDataItem = {
                min_temp: Math.round(data.daily[index].temp.min) + " ºC",
                max_temp: Math.round(data.daily[index].temp.max) + " ºC",
                humidity: data.daily[index].humidity + "%",
                wind: Math.round(data.daily[index].wind_speed) + " m/s",
                uv: Math.round(data.daily[index].uvi),
                icon: "http://openweathermap.org/img/wn/" + data.daily[index].weather[0].icon + ".png"
            }
            logger.log(viewDataItem,80);
            viewData.push(viewDataItem);
        }
        return viewData;

    }


    /* private */
    __callbackForecastSearch(data, status = 200) {
        logger.log("Callback Forecast Search", 7);
        logger.log(data, 80);
        this.applicationView.setState({weather: this.__convertForecastDataIntoDisplayFormat(this.cityName, data)});
    }

    /* private */
    __callbackWeatherSearch(data, status = 200) {
        logger.log("Callback Weather Search", 7);
        if (status >= 200 && status <= 299) { // do we have any data?

            logger.log(data, 70);
            /* add the city name to the list of searches */
            this.addNewCityNameToPreviousSearches(this.cityName);

            /* now make a call for the forecast */
            /* construct the request */
            let fetchParameters = {
                lat: data.coord.lat,
                lon: data.coord.lon
            };


            logger.log(`Fetching forecast for ${data.name}`, 10);
            this.cityName = data.name;
            this.__fetchQLJSON(this.forecastQueryURL, fetchParameters, this.__callbackForecastSearch);
        } else {
            this.applicationView.setState({weather: []});
        }

    }

    /* utility function for calling JSON POST requests */
    __fetchQLJSON(url, parameters, callback) {
        logger.log(`Executing fetch with URL ${url} with body ${parameters}`, 100);
        try {
            JSON.stringify({parameters});

        } catch (error) {
            logger.log("Unable to convert parameters to JSON", 100);
            logger.log(parameters, 100);
            callback(null, 404);
        }
        const postParameters = {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({parameters})
        };


        fetch(url, postParameters)
            .then((response) => {
                logger.log("Response code was " + response.status);
                if (response.status >= 200 && response.status <= 299) {
                    return response.json();
                } else {
                    callback(null, response.status);
                    throw new Error("no results");
                }
            })
            .then(data => {
                callback(JSON.parse(data));
            })
            .catch(error => {

            });

    }

    async __getCurrentWeatherDataForCity(cityName) {
        logger.log(`Loading weather for ${cityName}`, 2);
        /* construct the request */
        let fetchParameters = {
            q: cityName
        };


        logger.log(`Fetching weather for ${cityName}`, 2);
        this.cityName = cityName;
        this.__fetchQLJSON(this.currentQueryURL, fetchParameters, this.__callbackWeatherSearch);

    }

    /* private */
    __savePreviousSearches() {
        logger.log("Saving Previous Searches", 5);
        let stringifiedSearches = JSON.stringify(this.previousSearches);
        logger.log(stringifiedSearches, 10);
        this.clientSideStorage.setItem(this.savedSearchesKey, stringifiedSearches);
        this.getPreviousCitySearches();
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

    /* add a new City name to the local storage if not already there */
    addNewCityNameToPreviousSearches(cityName) {
        if (cityName !== null) {
            // only add the city name if not already in the list
            if (this.previousSearches.findIndex((element) => element === cityName) < 0) {
                this.previousSearches.push(cityName);
                this.__savePreviousSearches();
            }
        }
    }
    /* remove a City name to the local storage if already there */
    removeCityNameFromPreviousSearches(cityName) {

        if (cityName !== null) {
            logger.log(`Removing ${cityName} from local storage`,30);
            // only remove the city name if already in the list
            let foundIndex = this.previousSearches.findIndex((element) => (element === cityName));
            logger.log(`Removing ${cityName} from local storage at index ${foundIndex}`,30);
            if (foundIndex >= 0) {
                this.previousSearches.splice(foundIndex,1);
                logger.log(this.previousSearches,50);
                this.__savePreviousSearches();
            }
        }
    }

    /* weather search started */
    handleWeatherSearch(event) {
        event.preventDefault();
        logger.log("Handling city name search for weather ", 2);
        let cityName = document.getElementById("cityname").value.trim();
        if (cityName.length > 0) {
            logger.log("City Name is " + cityName, 2);
            this.__getCurrentWeatherDataForCity(cityName).then(
                logger.log("Loading weather data async", 3)
            );
        }

    }

    /* user clicked on one of the saved searches */
    handleWeatherSearchForPreviousSearch(event) {
        event.preventDefault();
        logger.log("Handling city name search from previous searches ", 2);
        let cityName = event.target.getAttribute("cityname");
        this.__getCurrentWeatherDataForCity(cityName).then(
            logger.log("Loading weather data async", 3)
        );
    }

    handleDeletePreviousSearch(event) {
        event.preventDefault();
        let cityName = event.target.getAttribute("cityname");
        // let the event propagate to let Bootstrap dismiss the alert
        logger.log(`Handling previous search item dismiss of city ${cityName}`);
        this.cityName = "";
        this.removeCityNameFromPreviousSearches(cityName);
    }


}
