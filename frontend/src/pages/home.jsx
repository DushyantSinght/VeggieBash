import React from 'react'
import Banner from '../components/banner'
import Categories from '../components/categories'
import Bestseller from '../components/bestseller'
import Bottombanner from '../components/bottombanner'
import Newsletter from '../components/newsletter'
import Footer from '../components/footer'

const Home = () => {
  return (
    <div className='mt-10'>
        <Banner/>
        <Categories/>
        <Bestseller/>
        <Bottombanner/>
        <Newsletter/>
    </div>
  )
}

export default Home
