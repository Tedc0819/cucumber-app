let App = require('./app.js')

let app = new App()

app.prepare()

module.exports.config = app.config.wdio
