// import express from 'express'
// import { updateCart } from "../controllers/cartController.js";
// import authUser from "../middlewares/authUser.js";


// const cartRouter = express.Router();

// cartRouter.post('/update', authUser, updateCart)

// export default cartRouter; 
import express from 'express'
import { updateCart, getCart } from "../controllers/cartController.js";
import authUser from "../middlewares/authUser.js";

const cartRouter = express.Router();

// ✅ Fetch user's cart
cartRouter.get('/get', authUser, getCart);

// ✅ Update user's cart
cartRouter.post('/update', authUser, updateCart);

export default cartRouter;
