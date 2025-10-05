import React, { useEffect } from "react"
import { NavLink } from "react-router-dom"
import { assets } from "../assets/assets"
import { useAppcontext } from "../../context/Appcontext"
import toast from "react-hot-toast"
const Navbar = () => {
    const [open, setOpen] = React.useState(false)
    const {user,setUser,setShowuserlogin,navigate ,searchquery, setSearchquery,getCartCount} = useAppcontext();
    const logout = ()=>{
        setUser(null);
        navigate('/')
        toast.success("Logged Out")
    }
    useEffect(()=>{
        if(searchquery.length > 0){
            navigate("/products")
        }
    },[searchquery])
    return (
        <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white relative transition-all">

            <NavLink to='/' onClick={()=>setOpen(false)}>
                <img className="h-15 w-25" src="/ChatGPT Image May 15, 2025, 04_13_24 PM copy.png" alt="dummyLogoColored" />
            </NavLink>

            {/* Desktop Menu */}
            <div className="hidden sm:flex items-center gap-8">
                <NavLink to="/ ">Home</NavLink>
                <NavLink to="/products">All Products</NavLink>
                <NavLink to="#">Contact</NavLink>

                <div className="hidden lg:flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full">
                    <input value={searchquery} onChange={(e)=>setSearchquery(e.target.value)} className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500" type="text" placeholder="Search products" />
                    <img src={assets.search_icon} alt="search" className="w-4 h-4"/>
                </div>

                <div className="relative cursor-pointer" onClick={() => navigate("/cart")}>
                    <img src={assets.nav_cart_icon} alt="cart" className="w-6 opacity-80"/>
                    <button className="absolute -top-2 -right-3 text-xs text-white green w-[18px] h-[18px] rounded-full">{getCartCount()}</button>
                </div>
                <NavLink to={"/seller"} className="p-1.5 px-3 hover:bg-primary/10 cursor-pointer">Seller</NavLink>
                { !user ? ( <button onClick={()=> setShowuserlogin(true)} className="cursor-pointer px-8 py-2 green hover: transition text-white rounded-full">
                    Login
                </button>)
                :(
                <div className="relative group">
                    <img src={assets.profile_icon} className="w-10" />
                    <ul className="hidden group-hover:block absolute top-10 right-0 bg-white shadow border border-gray-200 py-2.5 w-40 rounded-md text-sm z-40">
                    <li onClick={() => navigate("my-orders")} className="p-1.5 px-3 hover:bg-primary/10 cursor-pointer">My orders</li>
                    <li onClick={logout} className="p-1.5 px-3 hover:bg-primary/10 cursor-pointer">Logout</li>
                    </ul>
                </div>
                )
                }
            </div>
            <div>
                
            </div>
            <div className='flex items-center gap-6 sm:hidden'>
                <div onClick={() => navigate("/cart")} className="relative cursor-pointer">
                    <img src={assets.nav_cart_icon} alt='cart' className='w-6 opacity-80'/>
                    <button className="absolute -top-2 -right-3 text-xs text-white greenf w-[18px] h-[18px] rounded-full">{getCartCount()}</button>
                </div>
                    <button onClick={() => open ? setOpen (false): setOpen(true)} aria-label="Menu" className="">
                        <img src={assets.menu_icon} alt='menu' />
                    </button>
             </div>

            {/* Mobile Menu */}
            { open && (
            <div className={`${open ? 'flex' : 'hidden'} absolute top-[60px] left-0 w-full bg-white shadow-md py-4 flex-col items-start gap-2 px-5 text-sm md:hidden`}>
                <NavLink to="/ " onClick={()=>{setOpen(false)}}>Home</NavLink>
                <NavLink to="/products"onClick={()=>{setOpen(false)}}>All Products</NavLink>
                {user && 
                <NavLink to="/products"onClick={()=>{setOpen(false)}}>My Orders</NavLink>
                }
                <NavLink to="/ " onClick={()=>{setOpen(false)}}>Contact</NavLink>
                {!user ? (<button onClick={()=>{setOpen(false); setShowuserlogin(true)}} className="cursor-pointer px-6 py-2 mt-2 green  hover:  transition text-white rounded-full text-sm">
                    Login
                </button>) :
                (<button onClick={logout} className="cursor-pointer px-6 py-2 mt-2 green  hover:  transition text-white rounded-full text-sm">
                    Logout
                </button>) }
            </div>
            )}

        </nav>
    )
}
export default Navbar;
