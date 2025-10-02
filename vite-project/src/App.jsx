import React from 'react'
import Navbar from './components/navbar'
import Home from './pages/home'
import { Route, Routes, useLocation } from 'react-router-dom'
import { Toaster } from "react-hot-toast";
import Footer from './components/footer';
import { useAppcontext } from '../context/Appcontext';
import Login from './components/login';
import Allproducts from './pages/allproducts';
import Productcategory from './pages/productcategory';
import Productdetails from './pages/productdetails';
import Cart from './pages/cart';
import AddAddress from './pages/addAddress';
import MyOrders from './pages/myOrders';
import Sellerlogin from './components/seller/sellerlogin';
import SellerLayout from './pages/sellerLayout';
import AddProduct from './pages/seller/addProduct';
import ProductList from './pages/seller/productList';
import Orders from './pages/seller/orders';
import Loading from './components/Loading';


const App = () => {
  const issellerpath = useLocation().pathname.includes("seller")
  const {showuserlogin,isSeller} = useAppcontext();
  return (
  <>
  <div className='text-default min-h-screen text-gray-700 bg-white'>
    {issellerpath ? null : <Navbar/>}
    {showuserlogin ? <Login/> : null}
    <Toaster/>
    <div className={`${issellerpath ? "" : "px-6 md:px-16 lg:px-24 xl:px-32"}`}>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/products' element={<Allproducts/>}/>
        <Route path='/products/:category' element={<Productcategory/>}/>
        <Route path='/products/:category/:id' element={<Productdetails/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/add-address' element={<AddAddress/>}/>
        <Route path='/my-orders' element={<MyOrders/>}/>
        <Route path='/loader' element={<Loading/>}/>
        <Route path='/seller' element={isSeller ? <SellerLayout/> : <Sellerlogin/>}>
          <Route index element={<AddProduct/>} />
          <Route path='product-list' element={<ProductList/>} />
          <Route path='orders' element={<Orders/>} />
        </Route>
      </Routes>
    </div>
    {!issellerpath && <Footer/>}
  </div>
  </>
  )
}

export default App
