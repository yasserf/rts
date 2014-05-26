/**
 * Construction State
 * @param {Model} model
 * @constructor
 */
var ConstructionState = function(model) {
    this._model = model;
};

ConstructionState.prototype.init = function(data) {
    this._constructionTime = data.ConstructionTime;
    this._model.set("RemainingConstructionTime", this._constructionTime);
    this._model.set("AssignedBuilders", []);
};


ConstructionState.prototype.update = function(timeElapsed) {
    //timeElapsed = timeElapsed * this._model.get("AssignedBuilders").length;
    var constructionTimeRemaining =  this._model.get("RemainingConstructionTime");
    var updateTimeRemaining = constructionTimeRemaining - timeElapsed;

    if(updateTimeRemaining >= 0) {
        this._model.set("RemainingConstructionTime", updateTimeRemaining);
        this._model.set("ConstructionPercentage",  100 - ((constructionTimeRemaining /  this._constructionTime) * 100 ));
    } else {
        this._model.removeHandler("construction");
    }
};

ConstructionState.prototype.destroy = function() {
    this._model.remove("RemainingConstructionTime");
    this._model.remove("ConstructionPercentage");
};

module.exports = ConstructionState;