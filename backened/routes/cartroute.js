import express from 'express'
import { removefromcart,getcart,addtocart } from '../controllers/cartcontroll.js'
import authMiddleware from '../middleware/auth.js'

const cartRouter = express.Router()

cartRouter.post('/add',authMiddleware ,addtocart)
cartRouter.post('/remove',authMiddleware ,removefromcart)
cartRouter.post('/get',authMiddleware ,getcart)

export default cartRouter