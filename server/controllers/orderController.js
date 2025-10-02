import Order from "../models/order.js";
import Product from "../models/product.js";
import Stripe from "stripe";
import User from "../models/User.js";

// Place Order COD : /api/order/cod
export const placeOrderCOD = async (req, res)=>{
    try {
        const { items, address } = req.body;
        const userId = req.user._id; // ✅ comes from JWT middleware
        if(!address || items.length === 0) {
            return res.json({success: false, message: "Invalid data"})
        }
        //acc initial count of amount
// Calculate Amount Using Items
    let amount = await items.reduce (async (acc, item)=>{
        const product = await Product.findById(item.product);
        return (await acc) + product.offerPrice * item.quantity
    }, 0)
// Add Tax Charge (2%)
    amount += Math.floor(amount*0.02);
    await Order.create({
        userId,
        items,
        amount,
        address,
        paymentType:"COD",
    });
    return res.json({success:true,message:"Order Placed Successfully"})
    } catch (error) {
        return res.json({success:false,message:error.message});
    }
}

// Place Order Stripe : /api/order/stripe
export const placeOrderStripe = async (req, res)=>{
    try {
        const { items, address } = req.body;
        const {origin} = req.headers;
        const userId = req.user._id; // ✅ comes from JWT middleware
        if(!address || items.length === 0) {
            return res.json({success: false, message: "Invalid data"})
        }
        let productData = [];
        //acc initial count of amount
// Calculate Amount Using Items
    let amount = await items.reduce (async (acc, item)=>{
        const product = await Product.findById(item.product);
        productData.push({
            name: product.name,
            price: product.offerPrice,
            quantity: item.quantity,
        })
        return (await acc) + product.offerPrice * item.quantity
    }, 0)
// Add Tax Charge (2%)
amount += Math.floor(amount*0.02);
const order = await Order.create({
        userId,
        items,
        amount,
        address,
        paymentType:"Online",
    });
      // Stripe Gateway Initialize
    const stripeInstance = new Stripe (process.env.STRIPE_SECRET_KEY);
        // create line items for stripe
    const line_items = productData.map((item)=>{
        return {
            price_data: {
                currency: "aud",
                product_data: {
                    name: item.name,
                },
                unit_amount: Math.floor(item. price + item.price* 0.02) * 100
            },
            quantity: item.quantity,
        }
    })
    // create session
    const session = await stripeInstance.checkout.sessions.create({
        line_items,
        mode: "payment",
        success_url: `${origin}/loader?next=my-orders`,
        cancel_url: `${origin}/cart`,
        metadata: {
            orderId: order._id.toString(),
            userId,
        }
    })
return res.json({success: true, url: session.url})
    } catch (error) {
        return res.json({success:false,message:error.message});
    }
}
// Stripe Webhooks to Verify Payments Action: /stripe
// export const stripeWebhooks = async (request, response)=>{
//     // Stripe Gateway Initialize
//     const stripeInstance = new Stripe (process.env.STRIPE_SECRET_KEY);
//     const sig = request.headers["stripe-signature"];
//     let event;
//     try {
//         event = stripeInstance.webhooks.constructEvent(
//             request.body,
//             sig,
//             process.env.STRIPE_WEBHOOK_SECRET
//         );
//     } catch (error) {
//         return response.status(400).send(`Webhook Error: ${error.message}`)
//     }

// // Handle the event
// switch (event.type) {
//     case "payment_intent.succeeded":{
//         const paymentIntent = event.data.object;
//         const paymentIntentId = paymentIntent.id;
//         // Getting Session Metadata
//         const session = await stripeInstance.checkout.sessions.list({
//             payment_intent: paymentIntentId,
//         });
//         const { orderId, userId } = session.data[0].metadata;
//         //Mark payment as paid
//         await Order.findByIdAndUpdate(orderId, {isPaid:true});
//         //clear user cart
//         await User.findByIdAndUpdate(userId, {cartItems: {}});
//         break;
//     }
//     case "payment_intent.failed":{
//         const paymentIntent = event.data.object;
//         const paymentIntentId = paymentIntent.id;
//         // Getting Session Metadata
//         const session = await stripeInstance.checkout.sessions.list({
//             payment_intent: paymentIntentId,
//         });
//         const { orderId } = session.data[0].metadata;
//         await Order.findByIdAndDelete(orderId);
//         break;
//     }
//     default:
//         console.error(`Unhandled event type ${event.type}`)
//     break;
// }
// response.json({received:true})
// }
export const stripeWebhooks = async (req, res) => {
  const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY);
  const sig = req.headers["stripe-signature"];
  let event;

  try {
    event = stripeInstance.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object;
      const { orderId, userId } = session.metadata;

      console.log("Payment completed for order:", orderId);

      await Order.findByIdAndUpdate(orderId, { isPaid: true });
      await User.findByIdAndUpdate(userId, { cartItems: {} });

      break;
    }
    case "checkout.session.expired": {
      const session = event.data.object;
      const { orderId } = session.metadata;
      await Order.findByIdAndDelete(orderId);
      break;
    }
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.json({ received: true });
};
// Get Orders by User ID: /api/order/user
export const getUserOrders = async (req, res)=>{
    try {
        const userId = req.user._id; // ✅ comes from JWT middleware
        const orders = await Order.find({
            userId,
            $or: [{paymentType: "COD"},{paymentType: "Online"}, {isPaid: true}]
        }).populate("items.product address").sort({createdAt: -1});
        res.json({ success: true, orders });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}
//frontend Login/Register → backend responds with a JWT cookie (your res.cookie("token", token, {...})).
// This cookie automatically gets stored in the browser.
// Since you’re using axios.defaults.withCredentials = true, every subsequent request automatically sends the cookie.
// Middleware (authUser) → runs on protected routes:
// Reads the cookie req.cookies.token.
// Verifies the JWT.
// Extracts the id (userId) from the token payload.
// Stores it in req.user._id.
//Get all orders(for seller/admin) : api/order/seller
// const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
// req.user = { _id: tokenDecode.id };
// Controllers → don’t care about req.body.userId anymore.
// They simply use req.user._id (which is always set if middleware passes).
export const getAllOrders = async (req, res)=>{
    try {
        const orders = await Order.find({
            $or: [{paymentType: "COD"},{paymentType: "Online"}, {isPaid: true}]
        }).populate("items.product address").sort({createdAt: -1});
        res.json({ success: true, orders });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}