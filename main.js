// works: just call phantomjs screenshots_promise.js

'use strict'

var webpage = require('webpage')

var Promise = require('bluebird')

var urls = [
  'http://google.com/',
  'http://yahoo.com'
]

var dimensions = [
  [320, 480, 'iPhone4'],
  [414, 736, 'iPhone6Plus'],
  [375, 667, 'iPhone6'],
  [320, 568, 'iPhone5'],
  [360, 640, 'SamsungGalaxyNote2'],
  [400, 640, 'SamsungGalaxyNote'],
  [1024, 1366, 'iPadPro'],
  [768, 1024, 'iPadAir2and3']
]

console.log('hello')
function loadPage (url, index) {
  return new Promise(function (resolve, reject) {

    Promise.all(dimensions.map(renderDimensions(url))).then(function () {
      resolve(1)
    })
  })
}
function getDate () {
  var dateObject = new Date()
  var year = dateObject.getFullYear()
  var month = dateObject.getMonth()
  var date = dateObject.getDate()
  return year + '-' + month + '-' + date
}

function renderDimensions (url) {
  return function (dimensions) {
    var width = dimensions[0]
    var height = dimensions[1]
    var name = dimensions[2]
    return renderPage(width, height, name, url)
  }
}
function renderPage (width, height, name, url) {
  var page = webpage.create()

  page.viewportSize = {
    width: width,
    height: height
  }
  // page.clipRect = {
  //  top: 0,
  //  left: 0,
  //  width: dimension[0],
  //  height: dimension[1]
  // };
  return new Promise(function (resolve, reject) {
    page.open(url, function() {
      var folder = getDate() + '/'
      var fileName = [[width, height].join('x') + 'px', name].join('-')
      var fileExtension = '.png'
      page.render([folder, fileName, fileExtension].join(''))
      resolve(1)
    })
  })
}

Promise.all(urls.map(loadPage)).then(onExit)

function onExit () {
  phantom.exit()
}
