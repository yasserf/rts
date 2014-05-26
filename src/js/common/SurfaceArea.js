/**
 * Surface Area of the Entity, currently it assumes they are all rectangular.
 * @param width
 * @param height
 * @constructor
 */
var SurfaceArea = function(width, height) {
    this.width = width;
    this.height = height;
};

module.exports = SurfaceArea;