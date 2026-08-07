import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

// placing user order
const placeOrder = async (req, res) => {
  const frontend_url = "https://foodweb-frontend.onrender.com";

  try {
    const newOrder = new orderModel({
      userId: req.body.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
      payment: false,
    });

    await newOrder.save();

    // clear cart
    await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

    // redirect to verify page
    return res.json({
      success: true,
      session_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
    });
  } catch (error) {
    console.log("PLACE ORDER ERROR:", error);

    return res.json({
      success: false,
      message: "Error placing order",
    });
  }
};

// verify order
const verifyOrder = async (req, res) => {

    console.log("VERIFY API HIT");
    console.log(req.body);

    const { orderId, success } = req.body;

    try {

        if (success === true || success === "true") {

            const updatedOrder = await orderModel.findByIdAndUpdate(
                orderId,
                { payment: true },
                { new: true }
            );

            if (!updatedOrder) {
                return res.json({
                    success:false,
                    message:"Order not found"
                });
            }

            console.log("UPDATED ORDER:", updatedOrder);

            return res.json({
                success:true,
                message:"Payment Successful"
            });

        } else {

            await orderModel.findByIdAndDelete(orderId);

            return res.json({
                success:false,
                message:"Payment Failed"
            });
        }

    } catch(error){

        console.log(error);

        return res.json({
            success:false,
            message:error.message
        });
    }
};

// user orders
const userOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({
      userId: req.body.userId,
    });

    return res.json({
      success: true,
      data: orders,
    });
  } catch (error) {
    console.log("USER ORDERS ERROR:", error);

    return res.json({
      success: false,
      message: "Error",
    });
  }
};

// listing orders for admin panel
const listOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});

    return res.json({
      success: true,
      data: orders,
    });
  } catch (error) {
    console.log("LIST ORDER ERROR:", error);

    return res.json({
      success: false,
      message: "Error",
    });
  }
};

// update order status
const updateStatus = async (req, res) => {
  try {
    await orderModel.findByIdAndUpdate(req.body.orderId, {
      status: req.body.status,
    });

    return res.json({
      success: true,
      message: "Status Updated",
    });
  } catch (error) {
    console.log("UPDATE STATUS ERROR:", error);

    return res.json({
      success: false,
      message: "Error",
    });
  }
};

export { placeOrder, verifyOrder, userOrders, listOrders, updateStatus };
