import React, { useState, useEffect } from 'react';
import { useAppcontext } from '../../context/Appcontext';
import Productcard from '../components/productcard';

const Allproducts = () => {
  const { products, searchquery } = useAppcontext();
  const [filterproducts, setFilterproducts] = useState([]); // ❌ was incorrectly destructured

  useEffect(() => {
    if (searchquery.length > 0) {
      setFilterproducts(
        products.filter((product) =>
          product.name.toLowerCase().includes(searchquery.toLowerCase())
        )
      );
    } else {
      setFilterproducts(products);
    }
  }, [products, searchquery]);

  return (
    <div className='mt-16 flex flex-col'>
      <div className='flex flex-col items-end w-max'>
        <p className='text-2xl font-medium uppercase'>All products</p> {/* fixed text size class typo */}
        <div className='w-16 h-0.5 bg-green-500 rounded-full'></div> {/* added bg color class */}
      </div>

      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-6 mt-6'>
        {filterproducts
          .filter((product) => product.inStock)
          .map((product, index) => (
            <Productcard key={index} product={product} />
          ))}
      </div>
    </div>
  );
};

export default Allproducts;
