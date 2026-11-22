import express from 'express'
import {
  getBiodata,
  getPublicBiodata,
  getSharedBiodata,
  createBiodata,
  updateBiodata,
  deleteBiodata
} from '../controllers/biodataController.js'
import { requireOwner } from '../middleware/authMiddleware.js'

const router = express.Router()

router.get('/public', getPublicBiodata)
router.get('/share/:shareId', getSharedBiodata)
router.get('/', requireOwner, getBiodata)
router.post('/', requireOwner, createBiodata)
router.put('/', requireOwner, updateBiodata)
router.delete('/', requireOwner, deleteBiodata)

export default router
