'use strict';
/**
 * Implements a Pool.
 * @class yarp.Pool
 */
class Pool {
  /**
   *Creates an instance of Pool.
   * @param {*} Class
   * @memberof yarp.Pool
   */
  constructor(Class) {
    this._Class = Class;
  }

  /**
   * Load all objects from the pool collection.
   * @instance
   * @function load
   * @memberof yarp.Pool
   */
  async load() {
    await yarp.mng.load(this._Class);
  }

  /**
   * Load from config.
   * @instance
   * @function config
   * @memberof yarp.Pool
   * @param {*} file - Config object or path.
   */
  async config(file) {
    await yarp.mng.config(this._Class, file);
  }

  /**
   * Categories in the pool.
   * @instance
   * @function categories
   * @memberof yarp.Pool
   * @return {Array<string>} - Categories in the pool.
   */
  get categories() {
    let categories = {};
    for (let id in this) {
      if (id[0] != '_') {
        let obj = this[id];
        if (obj.category) {
          if (!categories[obj.category]) {
            categories[obj.category] = {};
          }
          categories[obj.category][obj.id] = obj;
        } else {
          break;
        }
      }
    }
    return categories;
  }

  /**
   * Elments in the pool.
   * @instance
   * @function length
   * @memberof yarp.Pool
   * @return {number} - Number of elements.
   */
  get length() {
    let count = 0;
    for (let id in this) {
      if (id[0] != '_') {
        count++;
      }
    }
    return count;
  }

  /**
   * Elments in the pool.
   * @instance
   * @function size
   * @memberof yarp.Pool
   * @return {number} - Number of elements.
   */
  get size() {
    return length;
  }

  /**
   * Checks if id exists in the pool.
   * @instance
   * @function exists
   * @memberof yarp.Pool
   * @param {string} id - Object id.
   * @return {boolean} - If objects exists or not in the pool.
   */
  exists(id) {
    return (this[id] != null);
  }

  /**
   * Get object at id.
   * @instance
   * @function at
   * @memberof yarp.Pool
   * @param {string} id - Object id.
   * @return {object} - Object at id.
   */
  at(id) {
    return this[id];
  }

  /**
   * Get the pool as array.
   * @instance
   * @function toArray
   * @memberof yarp.Pool
   * @return {Array<object>} - All objects in the pool.
   */
  toArray() {
    let array = [];
    for (let id in this) {
      if (id[0] != '_') {
        array.push(this[id]);
      }
    }
    return array;
  }

  /**
   * Execute a function for each element asynchronously.
   * @async
   * @instance
   * @function forEach
   * @memberof yarp.Pool
   * @param {function} call - Function to run for each element.
   */
  async forEach(call) {
    for (let id in this) {
      if (id[0] != '_') {
        call(this[id]);
      }
    }
  }

  /**
   * Execute a function for each element in range of a certain position asynchronously.
   * @async
   * @instance
   * @function forEachInRange
   * @memberof yarp.Pool
   * @param {Vector3} position - Position.
   * @param {number} range - Max range.
   * @param {function} call - Function to run for each element.
   */
  async forEachInRange(position, range, call) {
    for (let id in this) {
      if (id[0] != '_' && yarp.utils.vectorDistance(this[id].position, position) <= range) {
        call(this[id]);
      }
    }
  }

  /**
   * Execute a function for each element dimension asynchronously.
   * @async
   * @instance
   * @function forEachInDimension
   * @memberof yarp.Pool
   * @param {number} dimension - Dimension.
   * @param {function} call - Function to run for each element.
   */
  async forEachInDimension(dimension, call) {
    for (let id in this) {
      if (id[0] != '_' && this[id].dimension == dimension) {
        call(this[id]);
      }
    }
  }
}

module.exports = Pool;
