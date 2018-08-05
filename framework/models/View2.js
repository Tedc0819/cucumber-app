const { until, By, Key } = require('selenium-webdriver')
const Image = require('./Image.js')
const { assert } = require('chai')
const Promise = require('bluebird')

class View {
  constructor(world) {
    this.shouldLog = true
    this.world = world
    this.driver = world.driver
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

  exist() {
    return this.locate('id')
  }

  refresh() {
    return this.driver.navigate().refresh()
  }

  log(obj) {
    if (!this.shouldLog) return
    return this.world.attach(JSON.stringify(obj));
  }

  async click(elementId, idx = 0) {
    this.driver.sleep(this.sleepBeforeRun)

    const element = await this.findElement(elementId, idx)

    return element.click()
  }

  async clickOnText(elementId, idx = 0, text, operation = 'equal') {
    this.driver.sleep(this.sleepBeforeRun)

    const idxs = []
    const elements = await this.findElements(elementId)

    const texts = await Promise.map(elements, async (element, elementIdx) => {
      const elementText = await this.getElementText(element, elementId)

      const notFound = elementText.indexOf(text).toString() === '-1'

      if (!notFound) { idxs.push(elementIdx) }
    })

    if (typeof idxs[idx] === 'undefined') { return }

    return elements[idxs[idx]].click()
  }

  async hover(elementId, idx = 0) {
    this.driver.sleep(this.sleepBeforeRun)

    const element = await this.findElement(elementId, idx)

    return this.driver.actions().mouseMove(element).perform()
  }

  async fill(elementId, idx = 0, value) {
    this.driver.sleep(this.sleepBeforeRun)

    const element = await this.findElement(elementId, idx)

    element.clear()

    this.log({ value })

    return element.sendKeys(value)
  }

  async input(elementId, idx = 0, value) {
    this.driver.sleep(this.sleepBeforeRun)

    const element = await this.findElement(elementId, idx)

    element.clear()

    this.log({ value })

    return element.sendKeys(value, Key.RETURN)
  }

  scrollTo(elementId) {
    this.driver.sleep(this.sleepBeforeRun)

    const condition = this.driver.findElement(this.getSelector(elementId))

    return this.driver.executeScript('arguments[0].scrollIntoView()', condition)
  }

  async snapShot() {
    const buffer = await this.driver.takeScreenshot()

    return this.world.attach(buffer, 'image/png')
  }

  async logCurrentURL() {
    const url = await this.driver.getCurrentUrl()

    return this.world.attach(url)
  }

  async selectDropDownMenu(elementId, optionElementId) {
    await this.click(elementId)

    return this.click(optionElementId)
  }

  async selectDropDownString(elementId, optionElementId, idx = 0, string, operation = 'equal') {
    await this.click(elementId)

    return this.clickOnText(optionElementId, idx, string, operation)
  }

  async dragTo(sourceElementId, sourceIdx = 0, targetElementId, targetIdx = 0) {
    this.driver.sleep(this.sleepBeforeRun)

    const sourceElement = await this.findElement(sourceElementId, sourceIdx)

    const targetElement = await this.findElement(targetElementId, targetIdx)

    return this.driver
      .actions()
      .dragAndDrop(sourceElement, targetElement)
      .perform()
  }

  async changeTab(idx) {
    this.driver.sleep(this.sleepBeforeRun)

    const allHandles = await this.driver.getAllWindowHandles()

    await this.driver.switchTo().window(allHandles[idx])

    this.driver.sleep(3 * 1000)
  }

  changeFrame(elementId) {
    this.driver.sleep(this.sleepBeforeRun)

    if (elementId !== 'default') {
      return this.driver.switchTo().frame(this.findElement(elementId))
    }

    return this.driver.switchTo().defaultContent()
  }

  async fillFileSelector(elementId, idx = 0, value) {
    this.driver.sleep(this.sleepBeforeRun)

    const element = await this.findElement(elementId, 0)

    const script = 'arguments[0].className = arguments[0].className.replace("ng-hide", "");arguments[0].className = arguments[0].className.replace("hidden", ""); arguments[0].style.height = "50px"; arguments[0].style.opacity = 100'

    await this.driver.executeScript(script, element)

    return this.fill(elementId, 0, value)
  }

  wait(second) {
    return this.driver.sleep(second * 1000)
  }

  async storeValueFromElementWithIndex(key, elementId, idx = 0) {
    this.driver.sleep(this.sleepBeforeRun)

    const element = await this.findElement(elementId, idx)

    const text = await this.getElementText(element, elementId)

    return this.storeVariable(key, elementText)
  }

  async checkValueFromElementWithIndex(elementId, idx = 0, key, operation = 'equal') {
    this.driver.sleep(this.sleepBeforeRun)

    const element = await this.findElement(element, elementId)

    const text = await this.getElementText(element, elementId)

    const targetText = this.getVariable(key)

    assert[operation](elementText, text)
  }

  async locate(elementId, timeout = 60000) {
    this.driver.sleep(this.sleepBeforeRun)
    const selector = this.getSelector(elementId)

    let count = 0
    let elementCount = 0
    let retry = 0

    const logBody = () => {
      return {
        retry,
        elementId,
        selectorValue: selector.value,
        matchedElementCount: elementCount,
        displayedElementCount: count,
      }
    }

    try {
      const elements = await this.findElements(selector, async (elements) => {
        elementCount = elements.length

        let isDisplayeds = await Promise.map(elements, element => element.isDisplayed())

        isDisplayeds = isDisplayeds.filter(isDisplayed => isDisplayed === true)

        count = isDisplayeds.length

        if (isDisplayeds.length === 0) {
          retry += 1
        }

        return isDisplayeds.length > 0
      })

      this.log(logBody())
    }catch(e) {
      this.log(logBody())

      throw e
    }
  }

  async checkTextInElements(elementId, text, operation = 'equal') {
    this.driver.sleep(this.sleepBeforeRun)

    const selector = this.getSelector(elementId)

    try {
      const elements = await this.findElements(selector, async (elements) => {
        const texts = await Promise.map(elements, element => this.getElementText(element, elementId))

        try {
          texts.forEach( (elementText) => {
            assert[operation](elementText, text)
          })
        }catch(e) {
          return false
        }

        return true
      })
    }catch(e) {
      throw new Error('assertion (checkTextInElements) fail')
    }
  }

  async checkText(elementId, idx = 0, text, operation = 'equal') {
    this.driver.sleep(this.sleepBeforeRun)

    const selector = this.getSelector(elementId)

    try {
      const elements = await this.findElements(selector, async (elements) => {
        const elementText = await this.getElementText(elements[idx], elementId)

        try {
          assert[operation](elementText, text)
        }catch(e) {
          return false
        }

        return true
      })
    }catch(e) {
      throw new Error('assertion (checkTextInElements) fail')
    }
  }

  async expectCount(elementId, count) {
    this.driver.sleep(this.sleepBeforeRun)

    const selector = this.getSelector(elementId)

    try {
      const elements = await this.findElements(selector, async (elements) => {
        try {
          assert.lengthOf(elements, count)
        }catch(e) {
          return false
        }

        return true
      })
    }catch(e) {
      throw new Error('assertion (checkTextInElements) fail')
    }
  }

  async waitForAlert(text, timeout = 5000) {
    const condition = until.alertIsPresent();

    await this.driver.wait(condition, timeout)

    const alertBox = driver.switchTo().alert()
    alertText = alertBox.getText();
  }

  /*** @private ***/
  async _findElements(selector, extraCondition) {
    const condition = async (selector) => {
      const elements = await this.driver.findElements(selector)

      let result = true

      if (extraCondition) {
        const extraConditionResult = await extraCondition(elements)

        if (!extraConditionResult) { result = false}
      }

      if (!elements.length) { return false }

      if (!result) {
        this.driver.sleep(300)

        return false
      }

      return elements
    }

    return this.driver.wait(condition(selector), 10000)
  }

  async findElement(elementId, idx = 0, condition) {
    const selector = this.getSelector(elementId)

    const logObj = {
      selectorValue: selector.value,
      elementId,
      matchedElementCount: 0,
    }

    let elements
    try {
      elements = await this._findElements(selector, condition)

      this.log({
        ...logObj,
        matchedElementCount: elements.length
      })
    }catch(e) {
      this.log(logObj)

      throw e
    }
    return elements[idx]
  }

  async findElements(elementId, condition) {
    const selector = this.getSelector(elementId)

    const logObj = {
      selectorValue: selector.value,
      elementId,
      matchedElementCount: 0,
    }

    try {
      const elements = await this._findElements(selector, condition)

      this.log({
        ...logObj,
        matchedElementCount: elements.length
      })
    }catch(e) {
      this.log(logObj)

      throw e
    }
  }

  async getElementText(element, elementId) {
    const tag = await element.getTagName()

    let text

    if (tag == 'input') {
      text = text || await element.getAttribute('value')
    }

    if (tag == 'select') {
      const selector = this.getSelector(elementId)
      selector.value = `${selector.value} option[selected="selected"]`

      const optionElement = await this.driver.findElement(selector)
      text = text || await element.getText()
    }

    text = text || await element.getText()

    this.log({ elementTag: tag, elementText: text })

    return text
  }

  /* image related */
  async compareImage(elementId, idx = 0, value) {
    const imageSrc = await this.getImageSrcFromElement(elementId, idx)
    const buffer = await Image.downloadImage(imageSrc)

    const targetBuffer = await Image.readImage(value)

    this.world.attach(buffer, 'image/png')

    return Image.assertImage(buffer, targetBuffer)
  }

  async getImageSrcFromElement(elementId, idx = 0) {
    const element = await this.findElement(elementId, idx)

    const tag = await element.getTagName()

    if (tag != 'img') return null

    return element.getAttribute('src')
  }


  /** getter **/
  get by() { return by }

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
