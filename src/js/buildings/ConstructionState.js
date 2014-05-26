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

    ServiceRegistry.getService("jobQueue").push(this._model);
};


ConstructionState.prototype.update = function(timeElapsed) {
    timeElapsed = timeElapsed * this._model.get("ActiveWorkers").length;

    var constructionTimeRemaining =  this._model.get("RemainingConstructionTime");
    var updateTimeRemaining = constructionTimeRemaining - timeElapsed;

    if(updateTimeRemaining >= 0) {
        this._model.set("RemainingConstructionTime", updateTimeRemaining);
        this._model.set("ConstructionPercentage",  100 - ((constructionTimeRemaining /  this._constructionTime) * 100 ));
    } else {
        var activeBuilders = this._model.get("ActiveWorkers");
        for(var i=0; i<activeBuilders.length; i++) {
            activeBuilders[i].getHandler("task").stop();
        }

        this._model.removeHandler("construction");
    }
};

ConstructionState.prototype.destroy = function() {
    this._model.remove("RemainingConstructionTime");
    this._model.remove("ConstructionPercentage");
    this._model.remove("AssignedWorker");
    this._model.remove("ActiveWorkers");
};

module.exports = ConstructionState;