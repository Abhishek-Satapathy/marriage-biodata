import imagekit from '../config/imagekit.js'
import { toFile } from '@imagekit/nodejs'

export const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Please select an image'
      })
    }

    const safeFileName = req.file.originalname
      .replace(/[^a-zA-Z0-9._-]/g, '_')

    const response = await imagekit.files.upload({
      file: await toFile(req.file.buffer, safeFileName),
      fileName: `${Date.now()}-${safeFileName}`,
      folder: '/marriage-biodata'
    })

    return res.status(200).json({
      success: true,
      message: 'Image uploaded successfully',
      data: {
        url: response.url,
        fileId: response.fileId
      }
    })

  } catch (error) {
    console.error('Image upload error:', error)

    return res.status(500).json({
      success: false,
      message: 'Image upload failed'
    })
  }
}