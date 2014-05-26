/**
 * Construction State
 * @param {Model} model
 * @constructor
 */
var JobFinder = function(model) {
    this._model = model;
    this._model.set("jobQueue", []);
};

JobFinder.prototype.init = function(data) {
};


JobFinder.prototype.update = function(timeElapsed) {
    var workers = window.ServiceRegistry.getService("idleWorkers");
    var jobQueue = ServiceRegistry.getService("jobQueue");

    if(workers.length > 0 && jobQueue.length > 0) {
        this.assignWorkers(workers, jobQueue);
    }
};

JobFinder.prototype.assignWorkers = function(workers, jobQueue) {

    var task;
    for(var i=0; i<workers.length && jobQueue.length > 0; i++) {
        task = jobQueue.pop();
        task.get("AssignedWorkers").push(workers[i]);
        workers[i].getHandler("task").start(task);
    }

};

JobFinder.prototype.destroy = function() {
};

module.exports = JobFinder;