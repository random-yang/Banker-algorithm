module.exports = class Resource {
    /**
     * 
     * @param {JSON} data 
     */
    constructor(data) {
        data = JSON.parse(data);
        this.avaliable = data.avaliable,
        this.allocation = data.allocation,
        this.need = data.need
    }
}