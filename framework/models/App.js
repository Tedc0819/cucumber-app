const fs = require('fs');
const View = require('./View.js')
const Page = require('./Page.js')
const ResourceManager = require('./ResourceManager.js')
const path = require('path')
const deepExtend = require('deep-extend')

class App {
  constructor() {
    this.configPath = path.resolve(process.cwd(), './config')
    this.pagePath = path.resolve(process.cwd(), './models/page')
    this.transformerPath = path.resolve(process.cwd(), './models/transformer')

    this.context = global
    this.context.app = this

  }

  generateReport() {
    this.reporter.generate()
  }

  loadConfig() {
    require('dotenv').config()

    const configFile = this.importDir(this.configPath);

    let envConfig = {};
    if (process.env.NODE_ENV) {
      try {
        envConfig = require(path.resolve(process.cwd(), `./config/env/${process.env.NODE_ENV}.js`));
      }catch(e) { }
    }

    this.config = deepExtend({}, configFile, envConfig);
  }

  loadPage() {
    this.context.View = View
    this.context.Page = Page
    this.context.ResourceManager = ResourceManager
    this.pages = this.importDir(this.pagePath)

    Object.keys(this.pages).forEach((key) => {
      this.context[key] = this.pages[key]
    })
  }

  prepare() {
    this.loadConfig()
    this.loadPage()
  }

  // helper
  importDir(dirname, options={}) {
    let result = {}

    try { result = require('require-all')({ ...options, dirname }) }
    catch(e) {console.log(e)}

    return result
  }
}

module.exports = App
