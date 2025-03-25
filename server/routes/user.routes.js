import express from "express"
import { checkAuth, deleteAccount, login, logout, register } from "../controllers/user.controller.js"
import { authRoute } from "../middlewares/auth.middleware.js"






const router = express.Router()

router.post('/signup',register)
router.post('/login',login)
router.get('/logout',authRoute,logout)
router.get('',authRoute,checkAuth)
router.delete('/delete-account',authRoute,deleteAccount)

export default router;