import express from 'express'
import { signIn } from '../../controllers'
// import { sendLoginOtp, login, signingData, signatureVerifyAndLogin, logout } from '../../controllers/authentication'
// import { verifyLoggedIn } from '../../middleware/verifyLoggedIn'

const router = express.Router()

router.get('/connect', signIn)

// router.post('/signingdata', signingData)
// router.post('/cryptologin', signatureVerifyAndLogin)

export default router
