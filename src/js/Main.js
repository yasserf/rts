var ServiceRegistry = require("./ServiceRegistry");
var Model = require("./Model");
var EntityHandler = require("./EntityHandler");
var ConstructionState = require("./buildings/ConstructionState");
var JobFinder = require("./units/workers/JobFinder");
var Task = require("./units/workers/Task");
var Position = require("./common/Position");
var SurfaceArea = require("./common/SurfaceArea");
var DomRenderer = require("./dom/DomRenderer");

window.ServiceRegistry.addService("jobQueue", []);
window.ServiceRegistry.addService("idleWorkers", []);

var renderer = new DomRenderer();
var world = new Model();
world.addHandler("entity", EntityHandler);
world.addHandler("jobFinder", JobFinder);
world.init();

function addBuilding(x, y) {
    var building = new Model();
    building.addHandler("construction", ConstructionState);
    building.addHandler("position", Position);
    building.addHandler("surfaceArea", SurfaceArea);

    building.init({
            "ConstructionTime" : 20,
            "x" : x,
            "y" : y,
            "width" : 33,
            "height" : 43
    });

    world.getHandler("entity").addEntityToGroup(building, "buildings");
}

function addUnit() {
    var unit = new Model();
    unit.addHandler("position", Position);
    unit.addHandler("surfaceArea", SurfaceArea);
    unit.addHandler("task", Task);

    unit.init({
        "x" : 70,
        "y" : 70,
        "width" : 20,
        "height" : 20
    });

    world.getHandler("entity").addEntityToGroup(unit, "units");
    window.ServiceRegistry.getService("idleWorkers").push(unit);
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

addBuilding(350, 100);
addUnit(50, 50);

window.addBuilding = addBuilding;