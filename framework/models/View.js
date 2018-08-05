const { until, By, Key } = require('selenium-webdriver')
const Image = require('./Image.js')
const { assert } = require('chai')
const Promise = require('bluebird')

class View {
  constructor(world) {
    this.shouldLog = true
    this.world = world
    this.driver = world
    this.sleepBeforeRun = 1000
    this.props = world.pageProps
  }

  /* override */
  get elements() { return { } }

  get samples() { return { } }

  /*** @public ***/
  handleSample(sample) {
    const context = this.world

    const value = this.getVariable(sample)

    if (value) { return value }

    return this.getSample(sample)
  }

  click(elementId) {
    const selector = this.getSelector(elementId)
    return this.driver.touch(selector)
  }

  /** getter **/
  getSelector(elementId) {
    return this.elements[elementId] || elementId
  }

  /** sample **/
  getSample(key) {
    const context = this.world

    context.sample = context.sample || {}

    const value = context.sample[key] || this.samples[key]

    if (value) { context.sample[key] = value }

    return value
  }

  /** variable **/
  storeVariable(key, value) {
    if (!this.props.variables) { this.props.variables = {} }

    this.props.variables[key] = value
  }

  getVariable(key, value) {
    if (!this.props.variables) { this.props.variables = {} }

    return this.props.variables[key]
  }
}

module.exports = View
