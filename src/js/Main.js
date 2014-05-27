var Model = require("./Model");
var EntityHandler = require("./EntityHandler");
var ConstructionState = require("./buildings/ConstructionState");
var Resources = require("./buildings/Resources");
var JobFinder = require("./units/workers/JobFinder");
var Economy = require("./Economy");
var Task = require("./units/workers/Task");
var Position = require("./common/Position");
var SurfaceArea = require("./common/SurfaceArea");
var DomRenderer = require("./dom/DomRenderer");

var renderer = new DomRenderer();

function createWorld() {
    var world = new Model();
    window.world = world;

    world.addHandler("entity", EntityHandler);
    world.addHandler("jobFinder", JobFinder);
    world.addHandler("economy", Economy);
    world.set("jobQueue", []);
    world.set("idleWorkers", []);

    world.init();
};

function addBuilding(x, y) {
    var building = new Model();
    building.addHandler("construction", ConstructionState);
    building.addHandler("resources", Resources);
    building.addHandler("position", Position);
    building.addHandler("surfaceArea", SurfaceArea);

    building.init({
            "ResourceTime" : 30,
            "ConstructionTime" : 5,
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
    world.get("idleWorkers").push(unit);
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

createWorld();

window.setInterval(function() {
   // addBuilding(parseInt((Math.random() * 850)), parseInt((Math.random() * 450)));
}, 7000);

addBuilding(350, 100);
addBuilding(200, 150);
addBuilding(100, 250);

addUnit(50, 50);
addUnit(50, 200);

runGame();

window.addBuilding = addBuilding;
window.addUnit = addUnit;