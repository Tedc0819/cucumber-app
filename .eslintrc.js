let globals = {
}

let targets = []
targets.forEach( (key) => {
  let reducer = (accum, current) => {
    accum[current] = true
    return accum
  }

  Object.assign(globals, Object.keys(app[key]).reduce(reducer, {}))
})

module.exports = {
  "extends": "airbnb-base",
  "rules": {
    "semi": 0,
    "class-methods-use-this": 0,
    "no-unused-vars": ["error", { "args": "none" }],
    "max-len": ["error", { "code": 120, "ignoreComments": true }]
  },
  globals
}
