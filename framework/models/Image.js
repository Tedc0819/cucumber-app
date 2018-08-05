const sharp = require('sharp')
const resemble = require('resemblejs')
const fs = require('fs')
const request = require('request')

class Image {
  static readImage(file) {
    return new Promise((resolve, reject) => {
      fs.readFile(file, (err, data) => {
        if (err) return reject(err)

        return resolve(data)
      })
    })
  }

  static async downloadImage(uri) {
    const buffer = await new Promise((resolve, reject) => {
      request({ uri, encoding: null }, (error, response, body) => {
        if (error) reject(error)

        return resolve(body)
      })
    })

    if (uri.match(/webp/)) {
      return sharp(buffer)
        .png()
        .toBuffer()
    }

    return buffer
  }

  static assertImage(image, targetImage) {
    const tolerance = 15

    return new Promise((resolve, reject) => {
      resemble(image)
        .compareTo(targetImage)
        .scaleToSameSize()
        .ignoreColors()
        .onComplete((data) => {
          if (Number(data.misMatchPercentage) <= tolerance) {
            return resolve(true)
          }

          return reject(new Error('Images not matched'))
        })
    })
  }
}

module.exports = Image
