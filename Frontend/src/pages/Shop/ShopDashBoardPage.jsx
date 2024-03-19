import React from "react";
import DashBoardHeader from "../../components/Shop/Layout/DashBoardHeader";
import DashBoardSidebar from "../../components/Shop/Layout/DashBoardSidebar";

const ShopDashBoardPage = () => {
  return (
    <div>
      <DashBoardHeader />
      
      <div className="w-[80px] 800px:w-[330px]">
        <DashBoardSidebar active={1}/>
      </div>
    </div>
  );
};

export default ShopDashBoardPage;
