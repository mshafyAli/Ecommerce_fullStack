import React from 'react'
import DashBoardHeader from '../../components/Shop/Layout/DashBoardHeader'
import DashBoardSidebar from '../../components/Shop/Layout/DashBoardSidebar'
import CreateEvents from '../../components/Shop/CreateEvents'

const ShopCreateEvents = () => {
  return (
    <div>
    <DashBoardHeader />
    <div className="flex items-center justify-between w-full">
      <div className="w-[80px] 800px:w-[330px]">
        <DashBoardSidebar active={6} />
      </div>
      <div className="w-full flex justify-center">
        <CreateEvents />
      </div>
    </div>
  </div>
  )
}

export default ShopCreateEvents