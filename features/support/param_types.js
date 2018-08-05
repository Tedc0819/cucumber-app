var { BeforeAll, defineParameterType, ParameterType } = require('cucumber');

let pageTransform = function(s) {
  let page = `${s.replace(' ','')}Page`
  return app.pages[page]
}

let orderTransform = function(s) {
  return s.replace(/st|nd|rd|th/g, "") - 1
}

defineParameterType( {
  regexp: /([a-zA-Z ]+) Page/,
  transformer: pageTransform,
  name: 'page'
})

defineParameterType( {
  regexp: /(\d+st|\d+nd|\d+rd|\d+th)/,
  transformer: orderTransform,
  name: 'order'
})

defineParameterType( {
  regexp: /([a-zA-Z][a-zA-Z0-9 \(\)\-]+)/,
  name: 'noQouteString'
})

defineParameterType( {
  regexp: /([0-9]+)/,
  name: 'integer'
})
