const fs = require('fs')
const path = require('path')

const { fetchFromApi } = require('../utils/fetchHelper')

exports.processPageImage = async (page) => {
  try {
    const traverseObject = async (obj) => {
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          const value = obj[key]
          if (key.includes('img') || key.includes('icon')) {
            const newValue = await downloadImage(value)
            if (newValue !== null) {
              obj[key] = newValue
            }
          } else if (typeof value === 'object') {
            await traverseObject(value)
          }
        }
      }
    }
    await traverseObject(page)
    return json
  } catch (error) {
    console.log('~ exports.processPageImage= ~ error:', error)
    throw error
  }
}

const downloadImage = async (imageUrl) => {
  try {
    const response = await fetchFromApi(imageUrl)

    if (!response.ok) {
      throw new Error(`Failed to download image: ${response.statusText}`)
    }

    const directory = '/app/public/images'
    const imagePath = path.join(directory, extractKey(imageUrl, true))
    if (!fs.existsSync(directory)) {
      fs.mkdirSync(directory, { recursive: true })
    }

    const fileStream = fs.createWriteStream(imagePath)
    response.body.pipe(fileStream)

    await new Promise((resolve, reject) => {
      fileStream.on('finish', resolve)
      fileStream.on('error', reject)
    })

    return extractKey(imageUrl)
  } catch (error) {
    console.error(`Error downloading image: ${error.message}`)
    throw error
  }
}

const extractKey = (url, name = false) => {
  const regex = /\.com\/(.*?)\?/
  const match = url.match(regex)
  if (name) {
    const segments = match[1].split('/')
    return segments[segments.length - 1]
  }
  return match ? match[1] : null
}
