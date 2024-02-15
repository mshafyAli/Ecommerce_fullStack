import React from 'react'
import Header from '../components/Layout/Header'
import Hero from '../components/Route/Hero/Hero'
import Categories from '../components/Route/Categories/Categories'
import BestDetails from '../components/Route/BestDetails/BestDetails'
import FeatureProduct from '../components/Route/FeatureProduct/FeatureProduct'


const HomePage = () => {
  return (
    <div>
        <Header activeHeading={1}/>
        <Hero/>
        <Categories/>
        <BestDetails/>
        <FeatureProduct />
        
    </div>
  )
}

export default HomePage