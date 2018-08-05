var {defineSupportCode} = require('cucumber');
let Promise = require('bluebird')

/* fields will be pass along
 *
 * page: current page
 * sample: a key value pair mapping a string to a sample value so that you can use later on
 */

defineSupportCode(function({Given, When, Then}) {

  /*
   * helper
   */

  // @description drive the browser to the page
  // @param pageClass the class of the page after transformation
  // @example I am on Admin Panel Page

  Given('I am on {page}', function(pageClass) {
    let page = new pageClass(browser)
    this.page = page

    return
  })


  // @description clear the field and fill a value to a field WITHOUT PRESSING ENTER. the value better be identifier being translated in SampleTransformer
  // @param sample a string or a key value to be transformed in SampleTransformer
  // @param elementId the identifier mapped to the selector in the page object
  // @example I fill correct account email to email field

  When('I fill {noQouteString} to {noQouteString}', function(sample, elementId) {

    return this.page.fill(elementId, 0, this.page.handleSample(sample))

  })

   // @description clear the field and fill a value to a field WITHOUT PRESSING ENTER. the value better be identifier being translated in SampleTransformer
  // @param value a string
  // @param elementId the identifier mapped to the selector in the page object
  // @example I fill correct account email to email field

  When('I fill {string} to {noQouteString}', function(value, elementId) {

    return this.page.fill(elementId, 0, value)

  })

  // @description clear the field and fill a value to a field WITHOUT PRESSING ENTER. the value better be identifier being translated in SampleTransformer
  // @param value a string
  // @param order the order of the target element (1st | 2nd | 3rd | 10th)
  // @param elementId the identifier mapped to the selector in the page object
  // @example I fill correct account email to email field

  When('I fill {string} to {order} {noQouteString}', function(value, elementIdx, elementId) {

    return this.page.fill(elementId, elementIdx, value)

  })

  // @description clear the field and fill a sample to a field ALSO PRESS ENTER.
  // @param sample a key value to be transformed in SampleTransformer
  // @param elementId the identifier mapped to the selector in the page object
  // @example I input correct option to add options field

  When('I input {noQouteString} to {noQouteString}', function(sample, elementId) {

    return this.page.input(elementId, 0, this.page.handleSample(sample))

  })

  // @description clear the field and fill a value to a field ALSO PRESS ENTER
  // @param value a string
  // @param elementId the identifier mapped to the selector in the page object
  // @example I input "Red" to add options field

  When('I input {string} to {noQouteString}', function(string, elementId) {

    return this.page.input(elementId, 0, string)

  })

  // @description clear the field and fill a value to one of the matched fields ALSO PRESS ENTER.
  // @param sample a key value to be transformed in SampleTransformer
  // @param order the order of the target element (1st | 2nd | 3rd | 10th)
  // @param elementId the identifier mapped to the selector in the page object
  // @example I input Red to 2nd add options field

  When('I input {noQouteString} to {order} {noQouteString}', function(sample, order, elementId) {

    return this.page.input(elementId, order, this.page.handleSample(sample))

  })

  // @description clear the field and fill a value to one of the matched fields ALSO PRESS ENTER
  // @param value a string
  // @param order the order of the target element (1st | 2nd | 3rd | 10th)
  // @param elementId the identifier mapped to the selector in the page object
  // @example I input "Red" to 2nd add options field

  When('I input {string} to {order} {noQouteString}', function(string, order, elementId) {

    return this.page.input(elementId, order, string)

  })

  // @description click on one of the elements
  // @param order the order of the target element (1st | 2nd | 3rd | 10th)
  // @param elementId the identifier mapped to the selector in the page object
  // @example I click on add variation

  When('I click on {order} {noQouteString}', function(order, elementId) {

    return this.page.click(elementId, order)

  })



  // @description click on a element
  // @param elementId the identifier mapped to the selector in the page object
  // @example I click on add variation

  When('I click on {noQouteString}', function(elementId) {

    return this.page.click(elementId)

  })

  // @description hover over element
  // @param elementId the identifier mapped to the selector in the page object
  // @example I hover over add variation

  When('I hover over {noQouteString}', function(elementId) {

    return this.page.hover(elementId)

  })

  // @description hover over one of the elements
  // @param order the order of the target element (1st | 2nd | 3rd | 10th)
  // @param elementId the identifier mapped to the selector in the page object
  // @example I hover over 2nd sadd variation

  When('I hover over {order} {noQouteString}', function(order, elementId) {

    return this.page.hover(elementId, order)

  })


  // @description click on a element included string
  // @param elementId the identifier mapped to the selector in the page object
  // @param value the expected value
  // @example I click on add variation included "add"

  When('I click on {noQouteString} included {string}', function(elementId, value) {

    return this.page.clickOnText(elementId, 0, value, 'include')

  })

  // @description select an option in drop down menu
  // @param selectElementId the identifier of the option mapped to the selector in the page object
  // @param selectElementId the identifier of the option mapped to the selector in the page object
  // @param elementId the identifier of the drop down menu mapped to the selector in the page object
  // @example I select Iceland of based country dropdown menu

  When('I select {noQouteString} of {noQouteString}', function(selectElementId, elementId) {

    return this.page.selectDropDownMenu(elementId, selectElementId)

  })

  // @description select an option included string in drop down menu
  // @param selectElementId the identifier of the option mapped to the selector in the page object
  // @param value the expected value
  // @param elementId the identifier of the drop down menu mapped to the selector in the page object
  // @example I select delivery method included "Custom" of delivery dropdown

  When('I select {noQouteString} included {string} of {noQouteString}', function(selectElementId, value, elementId) {

    return this.page.selectDropDownString(elementId, selectElementId, 0, value, 'include')

  })

  // @description assert the current page
  // @param pageClass the class of the page after transformation
  // @example I should be on Admin Panel Page

  Then('I should be on {page}', function(pageClass) {

    let page = new pageClass(this)

    this.page = page

    return page.exist()

  })

  // @description assert the redirection
  // @param pageClass the class of the page after transformation
  // @example I should be redirected to Admin Login Page

  Then('I should be redirected to {page}', function(pageClass) {

    let page = new pageClass(this)

    this.page = page

    return page.exist()

  })

  // @description assert an element exist
  // @param elementId the identifier mapped to the selector in the page object
  // @example I should see variation row

// TODO: refrator with Then(/I (?:should )?see (.+)/, function(elementId) {
  Then("I should see {noQouteString}", function(elementId) {

    return this.page.locate(elementId)

  })

  // @description assert an element does not exist
  // @param elementId the identifier mapped to the selector in the page object
  // @example I should not see variation row
  Then("I should not see {noQouteString}", function(elementId) {

    return this.page.expectCount(elementId, 0)

  })

  // @description assert an element exist
  // @param elementId the identifier mapped to the selector in the page object
  // @example I see variation row

  Then("I see {noQouteString}", function(elementId) {

    return this.page.locate(elementId)

  })

  // @description assert a certain number of elements exist
  // @param count the expected count of the element
  // @param elementId the identifier mapped to the selector in the page object
  // @example I should see 6 variation row

  Then("I should see {integer} {noQouteString}", function(count, elementId) {

    return this.page.expectCount(elementId, count)

  })

  // @description take snapshot and append it to the scenario. mainly for debug and reports
  // @example I take a snapshot

  Then('I take a snapshot', function() {

    return this.page.snapShot()

  })

  // @description scroll down until an element is located
  // @param elementId the identifier mapped to the selector in the page object
  // @example I scroll down to login button

  Then('I scroll down to {noQouteString}', function(elementId) {

    return this.page.scrollTo(elementId)

  })

  // @description NOT WORK YET. drag an element to another element
  // @param sourceElementId the identifier mapped to the selector in the page object
  // @param targetElementId the identifier mapped to the selector in the page object
  // @example I drag elementA to elementB

  Then('I drag {noQouteString} to {noQouteString}', function(sourceElementId, targetElementId) {

    return this.page.dragTo(sourceElementId, 0, targetElementId, 0)

  })

  // @description NOT WORK YET. drag an element to another element
  // @param sourceElementId the identifier mapped to the selector in the page object
  // @param targetElementId the identifier mapped to the selector in the page object
  // @example I drag elementA to elementB

  Then('I drag {order} {noQouteString} to {order} {noQouteString}', function(sourceOrder, sourceElementId, targetOrder, targetElementId) {

    return this.page.dragTo(sourceElementId, sourceOrder, targetElementId, targetOrder)

  })

  // @description assert an element contain some text got from the sample
  // @param elementId the identifier mapped to the selector in the page object
  // @param sample the sample key to get the expected value
  // @example email field should equals to test@test.com

  Then('{noQouteString} should contain {noQouteString}', function(elementId, sample) {

    return this.page.checkText(elementId, 0, this.page.handleSample(sample), 'include')

  })

  // @description assert an element contain some text
  // @param order the order of the target element (1st | 2nd | 3rd | 10th)
  // @param elementId the identifier mapped to the selector in the page object
  // @param sample the sample key to get the expected value
  // @example email field should equals to test@test.com

  Then('{order} {noQouteString} should contain {noQouteString}', function(order, elementId, sample) {

    return this.page.checkText(elementId, order, this.page.handleSample(sample), 'include')

  })


  // @description assert an element contain some text
  // @param elementId the identifier mapped to the selector in the page object
  // @param value the expected value
  // @example email field should equals to test@test.com

  Then('{noQouteString} should contain {string}', function(elementId, value) {

    return this.page.checkText(elementId, 0, value, 'include')

  })

  // @description assert an element contain some text
  // @param order the order of the target element (1st | 2nd | 3rd | 10th)
  // @param elementId the identifier mapped to the selector in the page object
  // @param value the expected value
  // @example email field should equals to test@test.com

  Then('{order} {noQouteString} should contain {string}', function(order, elementId, value) {

    return this.page.checkText(elementId, order, value, 'include')

  })

  // @description assert an element equal to some text got from the sample
  // @param elementId the identifier mapped to the selector in the page object
  // @param sample the sample key to get the expected value
  // @example email field should equals to test@test.com

  Then('{noQouteString} should equal to {noQouteString}', function(elementId, sample) {

    return this.page.checkText(elementId, 0, this.page.handleSample(sample), 'equal')

  })

  // @description assert an element equal some text
  // @param elementId the identifier mapped to the selector in the page object
  // @param value the expected value
  // @example email field should equals to test@test.com

  Then('{noQouteString} should equal to {string}', function(elementId, value) {

    return this.page.checkText(elementId, 0, value, 'equal')

  })

  // @description assert an element equal some text
  // @param elementId the identifier mapped to the selector in the page object
  // @param value the expected value
  // @example email field should equals to test@test.com

  Then('{order} {noQouteString} should equal to {string}', function(order, elementId, value) {

    return this.page.checkText(elementId, order, value, 'equal')

  })

  // @description assert there is no matched elements having text
  // @param elementId the identifier mapped to the selector in the page object
  // @param value the expected value
  // @example email field should not equals to test@test.com

  Then('{noQouteString} should not contain {string}', function(elementId, value) {

    return this.page.checkTextInElements(elementId, value, 'notInclude')

  })

  // @description switch to another tabs
  // @param idx the expected which tab on the tab list
  // @example I switch to 2 of tabs

  When("I switch to {integer} of tabs" , function(idx){

    return this.page.changeTab(idx - 1)

  })

  // @description switch to another frame
  // @param elementId the identifier mapped to the selector in page object or mapped to default frame
  // @example I switch to default frame

  When("I switch to {noQouteString} frame" , function(elementId){

    return this.page.changeFrame(elementId)

  })




  // @description input a value to a input tag, mainly handle some file picking scenarios
  // @param sample a string or a key value to be transformed
  // @param elementId the identifier mapped to the selector in the page object
  // @example I pick logo image to logo image selector

  Then("I pick {noQouteString} to {noQouteString}", function(sample, elementId) {

    return this.page.fillFileSelector(elementId, 0, this.page.handleSample(sample))

  })

  // @description compare an image from a field with a local image specified by sample
  // @param sample a string or a key value to be transformed
  // @param elementId the identifier mapped to the selector in the page object
  // @example I should have image logo image for shop logo

  Then("I should have image {noQouteString} for {noQouteString}", function(sample, elementId) {

    return this.page.compareImage(elementId, 0, this.page.handleSample(sample))

  })

  // @description let the browser sleep for seconds
  // @param second how long the browser should sleep
  // @param comment no specific usage
  // @example I wait for 15 seconds for image upload

  Then("I wait for {integer} seconds {noQouteString}", function(second, comment) {

    return this.page.wait(second)

  })

  // @description mark value from an element to a variable
  // @param elementId the identifier mapped to the selector in the page object
  // @param variable the name of the varible storing the value grepped from element
  // @example I mark the value of email field as variable email

  Then("I mark the value of {noQouteString} as variable {noQouteString}", function(elementId, variable) {

    return this.page.storeValueFromElementWithIndex(variable, elementId, 0)


  })

  // @description check value from an element to a variable
  // @param elementId the identifier mapped to the selector in the page object
  // @param variable the name of the varible storing the value grepped from element
  // @example I should see email field equals to variable email

  Then("I should see {noQouteString} equals to variable {noQouteString}", function(elementId, variable) {

    return this.page.checkValueFromElementWithIndex(elementId, 0, variable, "equal")

  })

  // @description mark value from an element to a variable
  // @param elementId the identifier mapped to the selector in the page object
  // @param variable the name of the varible storing the value grepped from element
  // @example I mark the value of email field as variable email

  Then("I mark the value of {order} {noQouteString} as variable {noQouteString}", function(elementIdx, elementId, variable) {

    return this.page.storeValueFromElementWithIndex(variable, elementId, elementIdx)

  })

  // @description check value from an element to a variable
  // @param order the order of the target element (1st | 2nd | 3rd | 10th)
  // @param elementId the identifier mapped to the selector in the page object
  // @param variable the name of the varible storing the value grepped from element
  // @example I should see email field equals to variable email

  Then("I should see {order} {noQouteString} equals to variable {noQouteString}", function(elementIdx, elementId, variable) {

    return this.page.checkValueFromElementWithIndex(elementId, elementIdx, variable, "equal")

  })

  // @description check value from an element to a variable
  // @param order the order of the target element (1st | 2nd | 3rd | 10th)
  // @param elementId the identifier mapped to the selector in the page object
  // @param variable the name of the varible storing the value grepped from element
  // @example I should see email field contains to variable email

  Then("I should see {order} {noQouteString} contains variable {noQouteString}", function(elementIdx, elementId, variable) {

    return this.page.checkValueFromElementWithIndex(elementId, elementIdx, variable, "contains")

  })

  // @description refresh current tab
  // @example I Refresh
  Then('I Refresh',function(){
    return this.page.refresh()
  })

  // @description just a empty step to define the start of roll back step
  // @example ---ROLL BACK---

  Then('---ROLL BACK---', function() {})

});
