import React from 'react'
import Productcard from './productcard'
import { useAppcontext } from '../../context/Appcontext'

const Bestseller = () => {
    const {products} = useAppcontext();
  return (
    <div className='mt-16'>
        <p className='text-2x1 md:text-3xl font-medium'>Best Sellers</p>
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md: gap-6 lg:grid-cols-5 mt-6'>
            <Productcard product={products[0]}/>
            <Productcard product={products[1]}/>
            <Productcard product={products[2]}/>
            <Productcard product={products[3]}/>
            <Productcard product={products[4]}/>
            <Productcard product={products[5]}/>
            <Productcard product={products[6]}/>
            <Productcard product={products[7]}/>
            <Productcard product={products[8]}/>
            <Productcard product={products[9]}/>
        </div>
    </div>
  )
}

export default Bestseller
