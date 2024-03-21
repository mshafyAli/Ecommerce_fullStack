import React from 'react'
import DashBoardSidebar from '../../components/Shop/Layout/DashBoardSidebar'
import DashBoardHeader from '../../components/Shop/Layout/DashBoardHeader'
import AllProducts from '../../components/Shop/AllProducts'

const ShopAllProducts = () => {
  return (
    <div>
    <DashBoardHeader />
    <div className="flex justify-between w-full">
      <div className="w-[80px] 800px:w-[330px]">
        <DashBoardSidebar active={3} />
      </div>
      <div className="w-full flex justify-center">
        <AllProducts />
      </div>
    </div>
  </div>
  )
}

export default ShopAllProducts