var Model = require("./Model");
var EntityHandler = require("./EntityHandler");
var ConstructionState = require("./buildings/ConstructionState");
var DomRenderer = require("./DomRenderer");

var renderer = new DomRenderer();
var world = new Model();
world.addHandler("entity", new EntityHandler(world));

function addBuilding() {
    var building = new Model();
    building.addHandler("construction", new ConstructionState(building));

    building.init({
            "ConstructionTime" : 20
    });

    world.getHandler("entity").addEntity(building);
}

function runGame() {
    // Ticker
    var now, time = Date.now();

    var ticker = function() {
        now = Date.now();
        gameLoop((now - time) / 1000);
        time = now;
        requestAnimationFrame(ticker);
    };

    // Start the game loop

    window.setTimeout(function() {
        ticker();
    },1000);
}

function gameLoop(elapsed) {
    world.update(elapsed);
    renderer.render(world);
}

runGame();
addBuilding();
