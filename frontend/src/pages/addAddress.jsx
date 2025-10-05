import React, { useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import { useAppcontext } from '../../context/Appcontext'
import toast from 'react-hot-toast';

function AddAddress() {
    const InputField = ({ type, placeholder, name, handleChange, address })=>(
    <input className='w-full px-2 py-2.5 border border-gray-500/30 rounded outline-none
    text-gray-500 focus:border-primary transition'
    type={type}
    placeholder={placeholder}
    onChange={handleChange}
    name={name}
    value={address[name]}
    required/>
    )
    const { axios, user, navigate, setAddresses } = useAppcontext();
    const [address, setAddress] = useState({
        firstName:'',
        lastName:'',
        email:'',
        street:'',
        city:'',
        state:'',
        zipcode:'',
        country:'',
        phone:'',}
    )
    const handleChange = (e)=>{
        const { name, value } = e.target;
        setAddress((prevAddress) => ({
            ...prevAddress,[name]: value,
        }))}
    const onSubmitHandler = async(e)=>{
        e.preventDefault();
        try {
            // const { data } = await axios.post("http://localhost:4000/api/address/add",
            const { data } = await axios.post("/api/address/add",
                { ...address, userId: user._id },{ withCredentials: true } // ✅ send JWT cookie
            );
            if (data.success) {
                toast.success(data.message);
                // ✅ Add new address to global addresses
                setAddresses((prev) => [...prev, data.address]);
                // ✅ Redirect back to cart
                navigate("/cart");
            }
            else{
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }
    useEffect(()=>{
        if(!user){
            navigate('/cart')
        }
    },)
  return (
    <div className='mt-16 pb-16'>
        <p className='text-2x1 md:text-3x1 text-gray-500'>Add Shipping <span
        className='font-semibold greenc'>Address</span></p>
        <div className='flex flex-col-reverse md:flex-row justify-between mt-10'>
            <div className='flex-1 max-wd-md'>
                <form onSubmit={onSubmitHandler} className='space-y-3 mt-6 text-sm'>
                    <div className='grid grid-cols-2 gap-4'>
                    <InputField handleChange={handleChange} address={address}
                    name='firstName' type="text" placeholder="First Name"/>
                    <InputField handleChange={handleChange} address={address} name='lastName'
                    type="text" placeholder="Last Name"/>
                    </div>
                    <InputField handleChange={handleChange} address={address} name='email'
                        type="email" placeholder="Email address"/>
                    <InputField handleChange={handleChange} address={address} name='street'
                        type="text" placeholder="Street" />
                    <div className='grid grid-cols-2 gap-4'>
                        <InputField handleChange={handleChange} address={address} name='city'
                        type="text" placeholder="City" />
                        <InputField handleChange={handleChange} address={address} name='state'
                        type="text" placeholder="State" />
                    </div>
                    <div className='grid grid-cols-2 gap-4'>
                        <InputField handleChange={handleChange} address={address} name='zipcode'
                        type="number" placeholder="Zip code" />
                        <InputField handleChange={handleChange} address={address} name='country'
                        type="text" placeholder="Country" />
                    </div>
                    <InputField handleChange={handleChange} address={address} name="phone"
                    type="text" placeholder="Phone" />
                    <button className='w-full mt-6 green text-white py-3 hover:bg-primary-dull transition cursor-pointer uppercase'>
                        Save address
                    </button>
                </form>
            </div>
            <img className='md:mr-16 mb-16 md:mt-0' src={assets.add_address_iamge} alt='add address'/>
        </div>
    </div>
  )
}
export default AddAddress