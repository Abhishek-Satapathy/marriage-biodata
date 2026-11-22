import { randomBytes } from 'node:crypto'
import Biodata from '../models/Biodata.js'

const allowedFields = [
  'personalDetails',
  'familyDetails',
  'educationDetails',
  'professionalDetails',
  'profilePhoto',
  'kundaliPhoto',
  'otherPhotos',
  'socialLinks'
]

const getAllowedData = (body = {}) => {
  const data = {}

  for (const field of allowedFields) {
    if (Object.hasOwn(body, field)) data[field] = body[field]
  }

  return data
}

const ensureShareId = async (biodata) => {
  if (biodata.shareId) return biodata
  biodata.shareId = randomBytes(18).toString('base64url')
  await biodata.save()
  return biodata
}

export const getBiodata = async (req, res) => {
  try {
    let biodata = await Biodata.findOne()

    if (!biodata) {
      return res.status(404).json({ success: false, message: 'Biodata not found' })
    }

    biodata = await ensureShareId(biodata)

    return res.status(200).json({ success: true, data: biodata })
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message })
  }
}

export const getSharedBiodata = async (req, res) => {
  try {
    const biodata = await Biodata.findOne({ shareId: req.params.shareId })

    if (!biodata) {
      return res.status(404).json({ success: false, message: 'This biodata link is not available.' })
    }

    res.set('Cache-Control', 'no-store')
    return res.status(200).json({ success: true, data: biodata })
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message })
  }
}

export const createBiodata = async (req, res) => {
  try {
    const existingBiodata = await Biodata.findOne()

    if (existingBiodata) {
      return res.status(409).json({
        success: false,
        message: 'Biodata already exists. Use PUT to update it.'
      })
    }

    const data = getAllowedData(req.body)
    if (Object.keys(data).length === 0) {
      return res.status(400).json({ success: false, message: 'Please provide biodata details' })
    }

    data.shareId = randomBytes(18).toString('base64url')
    const biodata = await Biodata.create(data)

    return res.status(201).json({
      success: true,
      message: 'Biodata created successfully',
      data: biodata
    })
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message })
  }
}

export const updateBiodata = async (req, res) => {
  try {
    const data = getAllowedData(req.body)

    if (Object.keys(data).length === 0) {
      return res.status(400).json({ success: false, message: 'No valid biodata fields provided' })
    }

    const biodata = await Biodata.findOneAndUpdate(
      {},
      { $set: data },
      { new: true, runValidators: true }
    )

    if (!biodata) {
      return res.status(404).json({ success: false, message: 'Biodata not found. Create it first.' })
    }

    await ensureShareId(biodata)

    return res.status(200).json({
      success: true,
      message: 'Biodata updated successfully',
      data: biodata
    })
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message })
  }
}

export const deleteBiodata = async (req, res) => {
  try {
    const biodata = await Biodata.findOneAndDelete({})

    if (!biodata) {
      return res.status(404).json({ success: false, message: 'Biodata not found' })
    }

    return res.status(200).json({ success: true, message: 'Biodata deleted successfully' })
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message })
  }
}
