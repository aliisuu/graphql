export class DataController {

    address

    /**
     * Represents a data controller for an external data source.
     * 
     * @param {string} address 
     */
    constructor(address) {
        this.address = address
    }

    /**
     * Asynchronously fetches data from the specified endpoint of the external data source.
     * 
     * @param {string} endpoint 
     * 
     * @param {Object} options
     */
    async fetch(endpoint, options) {
        const response = await fetch(this.address + endpoint, options);

        return await response.json()
    }
}