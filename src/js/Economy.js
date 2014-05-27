/**
 * Construction State
 * @param {Model} model
 * @constructor
 */
var Economy = function(model) {
    this._model = model;
    this._model.set("Resources", {});
};

Economy.prototype.addResource = function(resource) {
    var resources = this._model.get("Resources");
    if(!resources[resource.name]) {
        resources[resource.name] = {amount: 0, locations:[]};
    }
    resources[resource.name].locations.push({x: resource.x, y:resource.y})
    resources[resource.name].amount++;
};

module.exports = Economy;