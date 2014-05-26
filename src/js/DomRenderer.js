/**
 * @constructor
 */
var DomRenderer = function() {
};

DomRenderer.prototype.render = function(model) {

    document.querySelector(".game-area").remove();
    var gameArea = document.createElement("div");
    gameArea.className = "game-area";
    var building, constructionProgressBar;

    var entities = model.get("entities");
    for(var i=0; i<entities.length; i++) {
        building = document.createElement("div");
        building.className = "progressBar";
        building.style.height = "20px";
        building.style.width = "100px";
        building.style.backgroundColor = "red";
        building.style.margin = "5px";

        constructionProgressBar = document.createElement("div");
        constructionProgressBar.style.width = entities[i].get("ConstructionPercentage") + "%";
        building.appendChild(constructionProgressBar);
        gameArea.appendChild(building);
    }

    document.body.appendChild(gameArea);
};

module.exports = DomRenderer;