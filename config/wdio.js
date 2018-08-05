const {
  TEST_SERVER_HOST,
  TEST_SERVER_PORT,
  TEST_TAG,
  TEST_CAPABILITIES,
  TEST_REPORT_NAME,
  PROJECT_NAME,
  RELEASE_VERSION,
} = process.env

const capabilities = require('./capabilities.js')[TEST_CAPABILITIES]
const tags = TEST_TAG || ''
const reportDir = `./reports/${TEST_REPORT_NAME}`

module.exports = {
  host: TEST_SERVER_HOST,
  port: TEST_SERVER_PORT,
  specs: [
      './features/**/*.feature'
  ],
  exclude: [
      // 'path/to/excluded/files'
  ],
  maxInstances: 10,
  capabilities,
  sync: true,
  logLevel: 'verbose',
  coloredLogs: true,
  deprecationWarnings: false, //true,
  bail: 0,
  screenshotPath: './errorShots/',
  baseUrl: 'http://localhost',
  waitforTimeout: 10000,
  connectionRetryTimeout: 90000,
  connectionRetryCount: 3,
  framework: 'cucumber',
  reporters: ['dot', 'multiple-cucumber-html'],
  reporterOptions: {
    htmlReporter: {
      jsonFolder: reportDir,
      reportFolder: reportDir,
      customData: {
        title: 'Run Info',
        data: [
          { label: 'Project', value: PROJECT_NAME },
          { label: 'Release', value: RELEASE_VERSION },
          { label: 'Started At', value: (new Date).toLocaleString() },
        ]
      },
    }
  },
  cucumberOpts: {
      //format: [`json:./reports/tmp-${reportFile}/${reportFile}.json`],
      require: ['./features/step-definitions/*.js', './features/support/*.js'], // <string[]> (file/dir) require files before executing features
      backtrace: false,   // <boolean> show full backtrace for errors
      compiler: [],       // <string[]> ("extension:module") require files with the given EXTENSION after requiring MODULE (repeatable)
      dryRun: false,      // <boolean> invoke formatters without executing steps
      failFast: false,    // <boolean> abort the run on first failure
      format: ['pretty'], // <string[]> (type[:path]) specify the output format, optionally supply PATH to redirect formatter output (repeatable)
      colors: true,       // <boolean> disable colors in formatter output
      snippets: true,     // <boolean> hide step definition snippets for pending steps
      source: true,       // <boolean> hide source uris
      profile: [],        // <string[]> (name) specify the profile to use
      strict: false,      // <boolean> fail if there are any undefined or pending steps
      tags: [],           // <string[]> (expression) only execute the features or scenarios with tags matching the expression
      timeout: 20000,     // <number> timeout for step definitions
      ignoreUndefinedDefinitions: false, // <boolean> Enable this config to treat undefined definitions as warnings.
  },

  //
  // =====
  // Hooks
  // =====
  // WebdriverIO provides several hooks you can use to interfere with the test process in order to enhance
  // it and to build services around it. You can either apply a single function or an array of
  // methods to it. If one of them returns with a promise, WebdriverIO will wait until that promise got
  // resolved to continue.
  /**
   * Gets executed once before all workers get launched.
   * @param {Object} config wdio configuration object
   * @param {Array.<Object>} capabilities list of capabilities details
   */
  // onPrepare: function (config, capabilities) {
  // },
  /**
   * Gets executed just before initialising the webdriver session and test framework. It allows you
   * to manipulate configurations depending on the capability or spec.
   * @param {Object} config wdio configuration object
   * @param {Array.<Object>} capabilities list of capabilities details
   * @param {Array.<String>} specs List of spec file paths that are to be run
   */
  // beforeSession: function (config, capabilities, specs) {
  // },
  /**
   * Gets executed before test execution begins. At this point you can access to all global
   * variables like `browser`. It is the perfect place to define custom commands.
   * @param {Array.<Object>} capabilities list of capabilities details
   * @param {Array.<String>} specs List of spec file paths that are to be run
   */
  // before: function (capabilities, specs) {
  // },
  /**
   * Runs before a WebdriverIO command gets executed.
   * @param {String} commandName hook command name
   * @param {Array} args arguments that command would receive
   */
  // beforeCommand: function (commandName, args) {
  // },

  /**
   * Runs before a Cucumber feature
   * @param {Object} feature feature details
   */
  // beforeFeature: function (feature) {
  // },
  /**
   * Runs before a Cucumber scenario
   * @param {Object} scenario scenario details
   */
  // beforeScenario: function (scenario) {
  // },
  /**
   * Runs before a Cucumber step
   * @param {Object} step step details
   */
  // beforeStep: function (step) {
  // },
  /**
   * Runs after a Cucumber step
   * @param {Object} stepResult step result
   */
  // afterStep: function (stepResult) {
  // },
  /**
   * Runs after a Cucumber scenario
   * @param {Object} scenario scenario details
   */
  // afterScenario: function (scenario) {
  // },
  /**
   * Runs after a Cucumber feature
   * @param {Object} feature feature details
   */
  // afterFeature: function (feature) {
  // },

  /**
   * Runs after a WebdriverIO command gets executed
   * @param {String} commandName hook command name
   * @param {Array} args arguments that command would receive
   * @param {Number} result 0 - command success, 1 - command error
   * @param {Object} error error object if any
   */
  // afterCommand: function (commandName, args, result, error) {
  // },
  /**
   * Gets executed after all tests are done. You still have access to all global variables from
   * the test.
   * @param {Number} result 0 - test pass, 1 - test fail
   * @param {Array.<Object>} capabilities list of capabilities details
   * @param {Array.<String>} specs List of spec file paths that ran
   */
  // after: function (result, capabilities, specs) {
  // },
  /**
   * Gets executed right after terminating the webdriver session.
   * @param {Object} config wdio configuration object
   * @param {Array.<Object>} capabilities list of capabilities details
   * @param {Array.<String>} specs List of spec file paths that ran
   */
  // afterSession: function (config, capabilities, specs) {
  // },
  /**
   * Gets executed after all workers got shut down and the process is about to exit.
   * @param {Object} exitCode 0 - success, 1 - fail
   * @param {Object} config wdio configuration object
   * @param {Array.<Object>} capabilities list of capabilities details
   */
  // onComplete: function(exitCode, config, capabilities) {
  // }
}
