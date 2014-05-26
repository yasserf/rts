/**
 * @constructor
 */
var EntityHandler = function(model) {
    this._model = model;
    this._model.set("entities", {});
};

EntityHandler.prototype.init = function(data) {
};

EntityHandler.prototype.addEntityToGroup = function(entity, groupName) {
    var entities = this._model.get("entities");
    if(entities[groupName]) {
        entities[groupName].push(entity);
    } else {
        entities[groupName] = [entity];
    }
};

EntityHandler.prototype.removeEntityFromGroup = function(entity, groupName) {
    var entitiesGroup = this._model.get("entities")[groupName];
    var index;

    if(entitiesGroup) {
        index = entitiesGroup.indexOf(entity);
        if(index > -1) {
            entities.splice(index, 1);

        }
    }
};

EntityHandler.prototype.update = function(timeElapsed) {
    var entitiesLength;
    var entities = this._model.get("entities");
    for(var entityGroup in entities) {
        entitiesLength = entities[entityGroup].length;
        for(var i=0; i< entitiesLength; i++) {
            entities[entityGroup][i].update(timeElapsed);
        }
    }
};

EntityHandler.prototype.destroy = function() {
};

module.exports = EntityHandler;