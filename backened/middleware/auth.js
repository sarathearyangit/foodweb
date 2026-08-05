import jwt from 'jsonwebtoken'

const authMiddleware = async (req,res,next) => {
    const {token} = req.headers
    if(!token) {
        return res.json({success:false,message:'Not authorized Login Again'})
    }
    const decoded = jwt.verify(token,process.env.JWT_SECRET)
    if(!req.body){
        req.body = {}
    }
    req.body.userId = decoded.id
    next()
}

export default authMiddleware