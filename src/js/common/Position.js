/**
 * Position of Entity from the top left corner
 * @constructor
 */
var Position = function(model) {
    this._model = model;
};

Position.prototype.init = function(data) {
    this._model.set("x", data.x);
    this._model.set("y", data.y);
};

module.exports = Position;