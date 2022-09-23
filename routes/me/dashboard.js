import express from 'express'
import { profile, dashboard, nft, token } from '../../controllers/index.js'
const router = express.Router()

// me dashboard
router.get('/:address', dashboard)
router.get('/nft/:address', nft)
router.get('/token/:address', token)
router.get('/profile/:address', profile)

export default router
