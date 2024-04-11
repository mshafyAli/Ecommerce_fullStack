import React from 'react'
import Header from '../components/Layout/Header'
import Hero from '../components/Route/Hero/Hero'
import Categories from '../components/Route/Categories/Categories'
import BestDetails from '../components/Route/BestDetails/BestDetails'
import FeatureProduct from '../components/Route/FeatureProduct/FeatureProduct'
import Events from '../components/Route/Events/Events'
import Sponsored from '../components/Route/Sponsored'
import Footer from '../components/Layout/Footer'

const HomePage = () => {
  return (
    <div>
        <Header activeHeading={1}/>
        <Hero/>
        <Categories/>
        <BestDetails/>
        <Events />
        <FeatureProduct />
        <Sponsored />
        <Footer />
        
    </div>
  )
}

export default HomePage