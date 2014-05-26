var BuildingRenderer = require("./BuildingRenderer");
var UnitRenderer = require("./UnitRenderer");

/**
 * @constructor
 */
var DomRenderer = function() {
    this._buildingRenderer = new BuildingRenderer();
    this._unitRenderer = new UnitRenderer();
};

DomRenderer.prototype.render = function(model) {
    this._buildingRenderer.render(model.get("entities").buildings || []);
    this._unitRenderer.render(model.get("entities").units || []);
};

module.exports = DomRenderer;