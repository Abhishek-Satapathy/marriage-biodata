
import express from 'express'

import {
  getBiodata,
  createBiodata,
  updateBiodata,
  deleteBiodata
} from '../controllers/biodataController.js'

const router = express.Router()

router.get('/', getBiodata)
router.post('/', createBiodata)
router.put('/', updateBiodata)
router.delete('/', deleteBiodata)

export default router
