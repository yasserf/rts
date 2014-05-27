/**
 * Construction State
 * @param {Model} model
 * @constructor
 */
var Resources = function(model) {
    this._model = model;
    this._model.set("AssignedWorkers", []);
    this._model.set("ActiveWorkers", []);

    this._resourcePosition = null;
};

Resources.prototype.assignWorker = function(worker) {
    this._model.get("ActiveWorkers").push(worker);
    worker.set("task", "gathering");
};

Resources.prototype.init = function(data) {

    this._resourcePosition = {
        x : this._model.get("x") + this._model.get("width"),
        y : this._model.get("y") + this._model.get("height")
    };

    this._resourceTime = data.ResourceTime;
    this._model.set("RemainingResourceTime", this._resourceTime);
    this._model.set("ResourcePercentage", 0);
};


Resources.prototype.update = function(timeElapsed) {

    if(this._model.get("State") === "") {
        this._model.set("State", "resources");
        world.get("jobQueue").push(this._model);
    }

    if(this._model.get("State") === "resources" && this._model.get("ActiveWorkers").length > 0) {

        var remainingResourceTime =  this._model.get("RemainingResourceTime");
        var updateTimeRemaining = remainingResourceTime - timeElapsed;

        if(updateTimeRemaining <= 0) {
            updateTimeRemaining = this._resourceTime;
            //world.getHandler("resources").addResource({resourceName: "wood", x:this._resourcePosition.x, y:this._resourcePosition.y});
        }

        this._model.set("RemainingResourceTime", updateTimeRemaining);
        this._model.set("ResourcePercentage",  100 - ((remainingResourceTime /  this._resourceTime) * 100 ));
    }

};

Resources.prototype.destroy = function() {
};

module.exports = Resources;