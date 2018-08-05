const {
  APP_LOCATION
} = process.env
module.exports = {
  ios: [{
    'app': APP_LOCATION ,
    'appiumVersion': '1.8.1',
    'browserName': '',
    'deviceName': 'iPhone 8',
    'deviceOrientation': 'portrait',
    'platformVersion': '11.4',
    'platformName': 'iOS',
    'maxInstances': 1,
  }],
  sl_ios: [{
    'app': APP_LOCATION ,
    'appiumVersion': '1.8.1',
    'browserName': '',
    'deviceName': 'iPhone 7',
    'deviceOrientation': 'portrait',
    'platformVersion': '10.3',
    'platformName': 'iOS',
    'maxInstances': 1,
  }],

}
