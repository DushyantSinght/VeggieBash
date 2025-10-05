import { createContext, useContext, useEffect, useState } from "react";
import { data, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { dummyProducts } from "../src/assets/assets";
import axios from 'axios';

//it will also send cookies
axios.defaults.withCredentials = true;
//base url op api calls using axios
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;


export const Appcontext = createContext();

export const Appcontextprovider = ({ children }) => {
  const navigate = useNavigate();
  const currency = import.meta.env.VITE_CURRENCY; // ✅ FIXED

  const [user, setUser] = useState(null);
  const [isSeller, setIsSeller] = useState(false);
  const [showuserlogin, setShowuserlogin] = useState(false);
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [searchquery, setSearchquery] = useState("");
  const [addresses, setAddresses] = useState([]);

//Fetch seller status
const fetchSeller = async()=>{
  try {
    const {data} = await axios.get("http://localhost:4000/api/seller/is-auth", { withCredentials: true });
    if(data.success){
      setIsSeller(true);
    }
    else{
      setIsSeller(false);
    }
  } catch (error) {
    setIsSeller(false);
  }
}
//Fetch user auth status, user data and cart items
const fetchUser = async() => {
  try {
    const {data} = await axios.get('http://localhost:4000/api/user/is-auth', {
      withCredentials: true, 
    });
    if (data.success){
      setUser(data.user)
      setCartItems(data.user.cartItems)
    }
  } catch (error) {
    setUser(null)
  }
}
// ✅ Fetch dummy products on load
const fetchProducts = async () => {
  try {
    const {data} = await axios.get('http://localhost:4000/api/product/list')
    if(data.success){
      setProducts(data.products)
      console.log("working")
    }
    else{
      toast.error(data.message)
    }
  } catch (error) {
    toast.error(error.message)
  }
};

useEffect(() => {
  fetchUser()
  fetchSeller()
  fetchProducts();
}, []);

// Update database cartItems
useEffect(()=>{
  const updateCart = async ()=>{
    try {
    const {data} = await axios.post('http://localhost:4000/api/cart/update',{cartItems});
    if(!data.success){
      toast.error(data.message);
    }
  } catch (error) {
    toast.error(error.message);
  }
  }
  if(user){
    updateCart();
  }
},[cartItems])

// ✅ Add to Cart
const addToCart = (itemId) => {
  let cartData = structuredClone(cartItems);
  if (cartData[itemId]) {
    cartData[itemId] += 1;
  } else {
    cartData[itemId] = 1;
  }
  setCartItems(cartData);
  toast.success("Added to Cart");
};
// Get Cart Item Count
const getCartCount = ()=>{
let totalCount = 0;
for(const item in cartItems) {
totalCount += cartItems[item];
}
return totalCount;
}
// Get Cart Total Amount
const getCartAmount = () =>{
let totalAmount = 0;
for (const items in cartItems){
let itemInfo = products.find((product)=> product._id === items);
if (!itemInfo) continue; // ✅ Skip if product not found
if(cartItems[items] > 0){
totalAmount += itemInfo.offerPrice * cartItems[items]
}
} 
return Math.floor(totalAmount * 100) / 100
}

  // ✅ Update Cart Quantity
  const updateCartItem = (itemId, quantity) => {
    let cartData = structuredClone(cartItems);
    cartData[itemId] = quantity;
    setCartItems(cartData);
    toast.success("Cart Updated");
  };

  // ✅ Remove from Cart
  const removeFromCart = (itemId) => {
    let cartData = structuredClone(cartItems);
    if (cartData[itemId]) {
      cartData[itemId] -= 1;
      if (cartData[itemId] === 0) {
        delete cartData[itemId];
      }
      toast.success("Removed from Cart");
      setCartItems(cartData);
    }
  };

  // ✅ All context values
  const value = {
    navigate,
    user,
    setUser,
    isSeller,
    setIsSeller,
    showuserlogin,
    setShowuserlogin,
    products,
    setProducts,
    currency,
    addToCart,
    updateCartItem,
    removeFromCart,
    cartItems,
    searchquery,
    setSearchquery,
    getCartAmount,
    getCartCount,
    axios,
    fetchProducts,
    setCartItems,
    addresses,
    setAddresses,
  };

  return <Appcontext.Provider value={value}>{children}</Appcontext.Provider>;
};

// ✅ Hook to use context
export const useAppcontext = () => {
  return useContext(Appcontext);
};

