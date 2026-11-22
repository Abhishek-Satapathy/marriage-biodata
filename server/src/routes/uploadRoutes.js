import express from 'express'
import upload from '../middleware/uploadMiddleware.js'
import { uploadImage } from '../controllers/uploadController.js'
import { requireOwner } from '../middleware/authMiddleware.js'

const router = express.Router()

router.post('/image', requireOwner, upload.single('image'), uploadImage)

export default router
