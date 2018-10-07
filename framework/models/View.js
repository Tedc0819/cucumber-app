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
    this.waitForExist = 2000
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

  wait(second) {
    return this.driver.pause(second * 1000);
  }

  log(obj) {
    if (!this.shouldLog) return
    console.log(obj)
  }

  click(elementId) {
    const selector = this.getSelector(elementId)

    return this.$(selector).touch()
  }

  $(selector) {
    if (this.shouldLog) {
      return this.$$(selector)[0]
    }

    this.driver.waitForExist(selector, this.waitForExist)
    return $(selector)
  }

  $$(selector) {
    this.driver.waitForExist(selector, this.waitForExist)

    const elements = $$(selector)

    this.log({
      selector,
      action: '$$',
      matchedCount: elements.length,
    })

    return elements
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
