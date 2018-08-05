const View = require('./View.js')

class Page extends View {
  constructor(world, props = {}) {
    super(world, props)

//    this.log({ url: this.url })
  }

  /*
   * go to this page
   *
   * @return {obj} a promise
   */

  go() {
    return this.driver.get(this.url)
      .then(() => this.logCurrentURL())
      .then(() => this.exist())
  }
}

module.exports = Page
