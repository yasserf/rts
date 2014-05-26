/**
 * @constructor
 */
var EntityHandler = function(model) {
    this._model = model;
    this._model.set("entities", []);
};

EntityHandler.prototype.init = function(data) {
};

EntityHandler.prototype.addEntity = function(entity) {
    var entities = this._model.get("entities");
    entities.push(entity);
    this._model.set("entities", entities);
};

EntityHandler.prototype.removeEntity = function(entity) {
    var entities = this._model.get("entities");
    var index = entities.indexOf(entity);
    if(index > -1) {
        entities.splice(index, 1);
        this._model.set("entities", entities);
    }
};

EntityHandler.prototype.update = function(timeElapsed) {
    var entities = this._model.get("entities");
    for(var i=0; i< entities.length; i++) {
        entities[i].update(timeElapsed);
    }
};

EntityHandler.prototype.destroy = function() {
};

module.exports = EntityHandler;