import React, { useEffect, useState } from 'react'
import { useAppcontext } from '../../../context/Appcontext';
import axios from 'axios';
import toast from 'react-hot-toast';

const Sellerlogin = () => {
    const {isSeller, setIsSeller, navigate, axios} = useAppcontext()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    useEffect (() => {
        if(isSeller){
            navigate("/seller")
        }
    }, [isSeller])
    const onSubmitHandler = async (event)=>{
        try {
            event.preventDefault();
            const {data} = await axios.post('/api/seller/login',{email,password});
            if(data.success){
                setIsSeller(true);
                navigate('/seller');
            }
            else{
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }
  return !isSeller &&  (
        <form onSubmit={onSubmitHandler} className='min-h-screen flex items-center text-sm text-gray-600'>
            <div className="flex flex-col gap-4 m-auto items-start p-8 py-12 w-80 sm:w-[352px] rounded-lg shadow-xl border border-gray-200 bg-white" >
                <p className="text-2xl font-medium m-auto">
                    <span className="greenc">Seller</span> Login
                </p>
                <div className="w-full ">
                    <p>Email</p>
                    <input onChange={(e)=>{setEmail(e.target.value)}} value={email} placeholder="type here" className="border border-gray-200 rounded w-full p-2 mt-1 outline-lime-600" type="email" required />
                </div>
                <div className="w-full ">
                    <p>Password</p>
                    <input onChange={(e)=>{setPassword(e.target.value)}} value={password} placeholder="type here" className="border border-gray-200 rounded w-full p-2 mt-1 outline-lime-600" type="password" required />
                </div>
                <button className="green hover:transition-all text-white w-full py-2 rounded-md cursor-pointer">
                    Login
                </button>
            </div>
    </form>
  )
}

export default Sellerlogin
