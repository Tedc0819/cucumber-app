var { Before, After, setWorldConstructor, setDefaultTimeout} = require('cucumber');

const tagsExtractor = function(scenario, tagCategory, defaultTag) {
  const tags = scenario.pickle.tags.map((tag) => tag.name)
  const regex = new RegExp(`^@${tagCategory}`, "i")
  const matches = tags.filter((tag) => tag.match(regex))
  const matched = matches.length > 0

  if (!matched && !defaultTag) { return [] }
  if (!matched) { return [ defaultTag ] }

  return matches.map( (match) => match.substr(1) )
}

setDefaultTimeout(300 *1000)

Before(function() {

  this.driver = browser.driver

})

After(function(scenario) {

});


