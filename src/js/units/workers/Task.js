/**
 * Construction State
 * @param {Model} model
 * @constructor
 */
var Task = function(model) {
    this._model = model;
    this._model.set("AssignedTask", null);
};

Task.prototype.init = function(data) {
};

Task.prototype.start = function(task) {
    var idleWorkers = ServiceRegistry.getService("idleWorkers");
    idleWorkers.splice(idleWorkers.indexOf(this._model));

    this._model.set("AssignedTask", task);
};

Task.prototype.stop = function() {
    this._model.set("AssignedTask", null);

    var idleWorkers = ServiceRegistry.getService("idleWorkers");
    idleWorkers.push(this._model);
};

Task.prototype.update = function(timeElapsed) {

    var task = this._model.get("AssignedTask");
    if(task) {

        var unitX = this._model.get("x");
        var unitY = this._model.get("y");
        var buildingX = this._model.get("AssignedTask").get("x");
        var buildingY = this._model.get("AssignedTask").get("y");

        if(unitX !== buildingX || unitY !== buildingY) {

            this._model.set("task", "moving");

            if(unitX < buildingX) {
                this._model.set("x", unitX+1);
            } else if(unitX > buildingX) {
                this._model.set("x", unitX-1);
            }

            if(unitY < buildingY) {
                this._model.set("y", unitY+1);
            } else if(unitY > buildingY) {
                this._model.set("y", unitY-1);
            }

        } else {
                task.getHandler("construction").assignWorker(this._model);
                this._model.set("AssignedTask", null);

        }

    }
};

Task.prototype.destroy = function() {
};

module.exports = Task;