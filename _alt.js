// works: just call phantomjs screenshots_promise.js

"use strict";
const webpage = require('webpage')

function screenshot(config) {}

const urls = []
const config = require('./config.js')

function renderByDimension(url) {
  return config.dimensions.reduce((promise, dimension) => {
    return promise.then((url) => {
      return new Promise((resolve, reject) => {
        const page = setupPage(dimension)
        
        console.log(config.baseUrl + url)
        page.open(config.baseUrl + url, function (status) {

          if (status === "success") {
            resolve(page)
          } else {
            reject(url)
          }
        })
      })
    }).then(function(page) {
      page.evaluate(function () {
        document.body.bgColor = "white";
      });
      var fileName = parseName(url, dimension, config.fileFormat);
      page.render(config.folder + fileName);
      console.log('successfully rendered page at ' + url + ' as ' + fileName);
      return page;
    }).catch(function (url) {

      console.log('fail to render screenshots for ' + url)
    
    }).then(function (page) {
      page.close();
      return url;
    }).delay(config.delay);
  }, Promise.resolve(url));
}

var promiseReduced = urls.reduce(function (promise, url) {
  return promise.then(function (result) {
    return renderByDimension(url);
  }).delay(config.delay);
}, Promise.resolve(true))

promiseReduced.then(function (data) {
  phantom.exit(0);
})

function setupPage(dimension) {
  var page = webpage.create();

  page.viewportSize = {
    width: dimension[0],
    height: dimension[1]
  };
  // page.clipRect = {
  //  top: 0,
  //  left: 0,
  //  width: dimension[0],
  //  height: dimension[1]
  // };
  return page;
}

function parseName(url, dimension, format) {
  var cleanUrl = url.replace(/\//, '');
  var width = dimension[0];
  var height = dimension[1];
  var deviceName = dimension[2];
  var dim = [width, height].join('x');
  var fileName = [cleanUrl,deviceName, dim].join('-');
  
  return [fileName, format].join('');
}