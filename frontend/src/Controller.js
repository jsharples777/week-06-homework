import logger from './util/SimpleDebug.js';



export default class Controller {

    constructor(applicationView, clientSideStorage) {
        this.applicationView = applicationView;
        this.clientSideStorage = clientSideStorage;

        //this.getPreviousCitySearches = this.getPreviousCitySearches.bind(this);
        //this.handleItemSave = this.handleItemSave.bind(this);


    }

    //
    // async _fetchQLJSON(query) {
    //     const postParameters = {
    //         method: "POST",
    //         headers: {'Content-Type': 'application/json'},
    //         body: JSON.stringify({query})
    //     };
    //
    //     const response = await fetch("/graphql", postParameters);
    //     return response.json();
    // }
    //
    // async loadSchedule() {
    //     logger.log("Loading Schedule", 2);
    //     const result = await this._fetchQLJSON(getScheduleItemsQuery);
    //     this.setState({scheduleItems: result.data.getScheduleItems});
    // }
    //
    getPreviousCitySearches() {
        return {};
    }

}
