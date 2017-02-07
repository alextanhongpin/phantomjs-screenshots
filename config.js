function getDate () {
  const dateObject = new Date()
  const year = dateObject.getFullYear()
  const month = dateObject.getMonth()
  const date = dateObject.getDate()

  return `${year}-${month}-${date}`
}

module.exports = {
  folder: `${getDate()}/`,
  fileFormat: '.png',
  baseUrl: 'http://www.google.com',
  // delay: 300, 
  dimensions: [
    [320, 480, 'iPhone4'],
    [414, 736, 'iPhone6Plus'],
    [375, 667, 'iPhone6'],
    [320, 568, 'iPhone5'],
    [360, 640, 'SamsungGalaxyNote2'],
    [400, 640, 'SamsungGalaxyNote'],
    [1024, 1366, 'iPadPro'],
    [768, 1024, 'iPadAir2and3']
  ]
}
