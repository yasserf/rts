/**
 * @constructor
 */
var BuildingRenderer = function() {
    this._gameArea = document.querySelector(".game-area");
    this._buildings = {};
};

BuildingRenderer.prototype.render = function(buildings) {
    var uid;
    for(var i=0; i<buildings.length; i++) {
        uid = buildings[i].get("UID");
        this._buildings[uid] = this._renderBuilding(buildings[i], this._buildings[uid]);
    }
};

BuildingRenderer.prototype._renderBuilding = function(buildingModel, buildingElement) {

    if(!buildingElement) {

        var buildingElement = document.createElement("div");
        buildingElement.className = "building";
        buildingElement.style.height = buildingModel.get("height") + "px";
        buildingElement.style.width = buildingModel.get("width") + "px";
        buildingElement.style.top = buildingModel.get("y") + "px";
        buildingElement.style.left = buildingModel.get("x") + "px";

        buildingElement.appendChild(document.createElement("div"));

        this._gameArea.appendChild(buildingElement);
    }

    var constructionProgressBar = buildingElement.querySelector("div");
    constructionProgressBar.style.width = buildingModel.get("ConstructionPercentage") + "%";

    return buildingElement;
};

module.exports = BuildingRenderer;