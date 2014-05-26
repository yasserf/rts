/**
 * Position of Entity from the top left corner
 * @constructor
 */
var SurfaceArea = function(model) {
    this._model = model;
};

SurfaceArea.prototype.init = function(data) {
    this._model.set("width", data.width);
    this._model.set("height", data.height);
};

module.exports = SurfaceArea;