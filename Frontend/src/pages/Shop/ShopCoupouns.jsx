import React from 'react'
import DashBoardSidebar from '../../components/Shop/Layout/DashBoardSidebar'
import DashBoardHeader from '../../components/Shop/Layout/DashBoardHeader'
import AllCoupouns from '../../components/Shop/AllCoupouns'

const ShopCoupouns = () => {
  return (
    <div>
    <DashBoardHeader />
    <div className="flex  justify-between w-full">
      <div className="w-[80px] 800px:w-[330px]">
        <DashBoardSidebar active={9} />
      </div>
      <div className="w-full flex justify-center">
        <AllCoupouns />
      </div>
    </div>
  </div>
  )
}

export default ShopCoupouns