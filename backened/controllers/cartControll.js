import userModel from '../models/userModel.js'

//add to user cart 
const addtocart = async (req,res) => {
    try{
        let userData = await userModel.findById(req.body.userId)
        let cartData = await userData.cartData
        if(!cartData[req.body.itemId])
        {
            cartData[req.body.itemId] = 1
        }
        else{
            cartData[req.body.itemId] += 1
        }
        await userModel.findByIdAndUpdate(req.body.userId,{cartData})
        res.json({success:true,message:'Added to Cart'})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:'Error'})
    }
}

//remove items from user cart
const removefromcart = async (req,res) => {
    try{
        let userData = await userModel.findById(req.body.userId)
        let cartData = userData.cartData
        if(cartData[req.body.itemId]>0){
            cartData[req.body.itemId] -= 1
        }
        await userModel.findByIdAndUpdate(req.body.userId,{cartData})
        res.json({success:true,message:'Removed From cart'})
    }catch (error) {
        console.log(error)
        res.json({success:false,message:'Error'})
    }
}

//fetch user cart data
const getcart = async (req, res) => {
    try {
        console.log("User ID:", req.body.userId);

        const userData = await userModel.findById(req.body.userId);

        console.log("User Data:", userData);

        if (!userData) {
            return res.json({
                success: false,
                message: "User not found"
            });
        }

        const cartData = userData.cartData || {};
        res.json({
            success: true,
            cartData
        });

    } catch (error) {
        console.log("Get Cart Error:", error.message);

        res.json({
            success: false,
            message: error.message
        });
    }
};

export { addtocart,removefromcart,getcart}