/**
 * @constructor
 */
var UnitRenderer = function() {
    this._gameArea = document.querySelector(".game-area");
    this._units = {};
};

UnitRenderer.prototype.render = function(units) {
    var uid;
    for(var i=0; i<units.length; i++) {
        uid = units[i].get("UID");
        this._units[uid] = this._renderUnit(units[i], this._units[uid]);
    }
};

UnitRenderer.prototype._renderUnit = function(unitModel, unitElement) {

    if(!unitElement) {

        unitElement = document.createElement("div");
        unitElement.className = "unit";
        unitElement.style.height = unitModel.get("height") + "px";
        unitElement.style.width = unitModel.get("width") + "px";

        this._gameArea.appendChild(unitElement);
    }

    unitElement.style.top = unitModel.get("y") + "px";
    unitElement.style.left = unitModel.get("x") + "px";
    unitElement.className = "unit " + unitModel.get("task");

    return unitElement;
};

module.exports = UnitRenderer;