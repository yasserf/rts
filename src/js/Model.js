var Model = function () {
    this._handlers = {};
    this._data = {};
    this._changed = [];
};

Model.prototype.init = function (initialData) {
    for (var handler in this._handlers) {
      if (this._handlers[handler].init) {
        this._handlers[handler].init(initialData);
      }
    }
};

Model.prototype.update = function (time) {
    for (var handler in this._handlers) {
        if (this._handlers[handler].update) {
            this._handlers[handler].update(time);
        }
    }
};


/**
 * Returns all data for this model as a map.
 * @returns {object}
 */
Model.prototype.getAll = function () {
    return this._data;
};

/**
 * Returns the value for a specific key in the model.
 * Note: This does not perform any type of clone on mutable objects.
 * @returns {object}
 */
Model.prototype.get = function (key) {
    return this._data[key];
};

/**
 * Sets the values
 * @param {object}
 */
Model.prototype.set = function (key, value) {
    this._data[key] = value;
    this._changed.push(key);
};

/**
 * Sets the values
 * @param {object}
 */
Model.prototype.remove = function (key) {
    delete this._data[key];
};

/**
 * Returns all registered handlers as a key to handler.
 * @returns {object}
 */
Model.prototype.getHandlers = function () {
    return this._handlers;
};

/**
 * Returns a specific handler
 * @param {string} name
 * @returns {object}
 */
Model.prototype.getHandler = function (name) {
    return this._handlers[name];
};

/**
 * Returns true if a handler has been added with the provided name
 * @param {string} name
 * @returns {object}
 */
Model.prototype.hasHandler = function (name) {
    return !!this._handlers[name];
};

/**
 * Adds a handler with a specific name. If the handler has already been added returns false.
 * @param {string} name
 * @returns {boolean}
 */
Model.prototype.addHandler = function (name, handler) {
    var added = false;
    if (!this._handlers[name]) {
      this._handlers[name] = handler;
      added = true;
    }
    return added;
};

/**
 * Removes a handler with a specific name after calling destroy on it.
 * If the handler does not exist returns false;
 * @param {string} name
 * @returns {boolean}
 */
Model.prototype.removeHandler = function (name) {
    var removed = false;
    if (this._handlers[name]) {
      if (this._handlers[name].destroy) {
        this._handlers[name].destroy();
      }
      removed = true;
      delete this._handlers[name];
    }
    return removed;
};

/**
 * Destroys all the handlers
 */
Model.prototype.destroy = function () {
    for (var handler in this._handlers) {
      this._handlers[handler].destroy();
    }
    this.clearListeners();
};

module.exports = Model;