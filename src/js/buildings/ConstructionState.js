/**
 * Construction State
 * @param {Model} model
 * @constructor
 */
var ConstructionState = function(model) {
    this._model = model;
    this._model.set("AssignedWorkers", []);
    this._model.set("ActiveWorkers", []);
};

ConstructionState.prototype.assignWorker = function(worker) {
    this._model.get("ActiveWorkers").push(worker);
    worker.set("task", "building");
};

ConstructionState.prototype.init = function(data) {
    this._constructionTime = data.ConstructionTime;
    this._model.set("RemainingConstructionTime", this._constructionTime);
    this._model.set("State", "constructing");

    world.get("jobQueue").push(this._model);
};


ConstructionState.prototype.update = function(timeElapsed) {
    timeElapsed = timeElapsed * this._model.get("ActiveWorkers").length;

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

    var activeBuilders = this._model.get("ActiveWorkers");
    for(var i=0; i<activeBuilders.length; i++) {
        activeBuilders[i].getHandler("task").stop();
    }
    this._model.set("ActiveWorkers", []);
    this._model.set("AssignedWorker", []);

    this._model.set("State", "");
};

module.exports = ConstructionState;