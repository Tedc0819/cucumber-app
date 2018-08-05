DESCRIPTION
===========
This is just a basic framework connecting the protractor and cucumber. It also works mainly on docker which means you only need to install **docker** for the development.

When you run our pre-made test script, it will start a docker container with a node.js environment. Things will run inside the docker container. That's why you don't need to install node.js, related packages, most importantly, those image libraries for image comparision. These will make you computer "dirty".

You will also need a selenium server. Basically, it's a selenium grid consist of hub and nodes. There is a docker-compose file for you the start every thing easily.

HOW TO START
============
just run

```
npm run test
```

HOW TO CONFIG
=============
## .env
We use .env file to control every environemnt dependent config.

These are some basic env variables
```
TEST_SERVER_HOST  # the host of the selenium server
TEST_SERVER_PORT  # the port of the selenium server
TEST_REPORT_NAME  # the report name after you run the tests
TEST_CAPABILITIES # the key to get the capabilities referring to config/capabilities.js
TEST_TAGS         # the tags to be passed to protractor and cucumber
```

## protractor.conf.js and config/protractor.js
the test command will call protractor.conf.js just like the official protractor tutorial.
But to cnetralize config files, we create config/protractor.js and export the config to protractor.conf.js

## config
#### config/capabilities.js
You can google protractor and selenium can do. The only difference here is we do a key-value pair here so that you can save multiple capabilities here. using TEST_CAPABILITIES will control which one to take when the test run.

#### config/protractor.js
what exporting here will be directly pass to protractor. Try to google what can be set here.

#### config/reporter.js
There is a Reporter model in the framework. And this is its related config. The base of it is the npm package named **cucumber-html-reporter**. This config will be directly passed to this library.

#### config/resource.js
There is also a ResourceManager model. This this is its related config. Any of them can be passed to ResourceManager to control you resources like this:

```
const accountManager = new ResourceManager(app.config.resource.account)
const adminAccount = accountManager.getResource(['admin'])
```
For the use of ResourceManager, please read the ResourceManager part.

RUN TEST
========

```shell
npm run test

#you can also override the setting in .env
TEST_TAGS=@BaseCase npm run test
```

CORE MODELS
===========

## App
1. App is a class handling the whole framework. Some key phases' implementation are also inside.
2. Any other component setup can be implemented there and call in the prepare phase
3. the instance of App (app) is exported to global, so it is accessible any where like other frameworks.

## View
1. The superclass of all page objects
2. All the logic are implemented here

## Page
1. The subclass of the View class
2. Methods of being as a page, like setting url, will be implemented here.

## Reporter
1. Just a wrapper of integrating **cucumber-html-reporter**

## ResourceManager
1. Manage different kind of resources
2. Resources those cannot be used at the same time during parallel run, like login accounts, can be managed here
3. Resources can be get by tags and availbiliy thorugh the ResourceManager
4. In-use resource will be marked with a tmp file in the directory.
5. the tmp file will be removed after the test cases finish

```javascript
// config/resource.js
module.exports = {
  account: {
    label: 'account', //will be used in the tmp files for marking in-use resources
    file: '../resources/account.js'
  }
}

// resources/account.js
module.exports = [
  {
    id: '1',
    email: 'test1@gmail.com',
    password: '12345678',
    tags: ['admin']
  },
  {
    id: '2',
    email: 'test2@gmail.com',
    password: '12345678',
    tags: ['non-admin']
  },
  {
    id: '3',
    email: 'test3@gmail.com',
    password: '12345678',
    tags: ['non-admin']
  },
]

// how to use. most of the case, you will use it in those Before hook in features/support/hooks.js

Before( function(scenario) {
  const accountManager = new ResourceManager(app.config.resource.account)

  // the 1st argument array is the tags that matching with the resource
  // the 2nd argument control if you need to mark the resource in use. Default is true
  const adminAccount = accountManager.getResource(['admin'], false)
})

```

WEB SERVER SETUP
================
## local
To start the selenium grid

```
docker-compose -f framework/docker/docker-compose.yml up
```

## server
```
//hub + jenkins
docker-compose -f framework/docker/docker-compose-hub-server.yml up

//node
docker-compose -f framework/docker/docker-compose-node-server.yml up
```


