import React from 'react'
import DashBoardSidebar from '../../components/Shop/Layout/DashBoardSidebar'
import DashBoardHeader from '../../components/Shop/Layout/DashBoardHeader'
import AllEvents from '../../components/Shop/AllEvents'

const ShopAllEvents = () => {
  return (
    <div>
    <DashBoardHeader />
    <div className="flex justify-between w-full">
      <div className="w-[80px] 800px:w-[330px]">
        <DashBoardSidebar active={5} />
      </div>
      <div className="w-full flex justify-center">
        <AllEvents />
      </div>
    </div>
  </div>
  )
}

export default ShopAllEvents