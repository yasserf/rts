/**
 * @constructor
 */
var ServiceRegistry = function() {
    this._services = {};
};

ServiceRegistry.prototype.addService = function(serviceName, service) {
    this._services[serviceName] = service;
};

ServiceRegistry.prototype.getService = function(serviceName) {
    return this._services[serviceName];
};

window.ServiceRegistry = new ServiceRegistry();

module.exports = ServiceRegistry;