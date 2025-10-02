import User from "../models/User.js"

// Update User CartData: /api/cart/update
export const updateCart = async (req, res)=>{
    try {
        const { cartItems } = req.body;
        const userId = req.user._id;
        // const { userId, cartItems } = req.body
        await User.findByIdAndUpdate(userId, {cartItems})
        res.json({ success: true, message: "Cart Updated" })
    } catch (error) {
        console.log(error.message)        
        res.json({ success: false, message: error.message })
    }
}
export const getCart = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("cartItems");
    res.json({ success: true, cartItems: user?.cartItems || {} });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

