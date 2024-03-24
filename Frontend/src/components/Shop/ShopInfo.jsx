import React from "react";
import { useSelector } from "react-redux";
import styles from "../../styles/styles";
import axios from "axios";
import  backend_Url  from "../../backend_Url";
import baseUrl from "../../baseUrl";

const ShopInfo = ({ isOwner }) => {
  const { seller } = useSelector((state) => state.seller);
  const logoutHandler = () => {
    try{
     const res =  axios.get(`${baseUrl}/shop/logout`, {
        withCredentials: true,
      })
      window.location.reload();
    }catch(err){
      
    }
    
  }
  return (
    <div>
      <div className="w-full py-5">
        <div className="w-full flex items-center justify-center ">
          <img
            src={`${backend_Url}${seller.avatar}`}
            alt=""
            className="rounded-full w-[150px] h-[150px] object-cover"
          />
        </div>
        <h3 className="text-center text-[20px] py-2">{seller.name}</h3>
        <p className="text-[16px] text-[#000000a6] p-[10px] flex items-cente">
          {seller.description}
        </p>
      </div>

      <div className="p-3">
        <h5 className="font-[600]">Address</h5>
        <h4 className="text-[#000000a6]">{seller.address}</h4>
      </div>
      <div className="p-3">
        <h5 className="font-[600]">Phone Number</h5>
        <h4 className="text-[#000000a6]">{seller.phoneNumber}</h4>
      </div>
      <div className="p-3">
        <h5 className="font-[600]">Total Products</h5>
        <h4 className="text-[#000000a6]">10</h4>
      </div>
      <div className="p-3">
        <h5 className="font-[600]">Shop Ratings</h5>
        <h4 className="text-[#000000a6]">4/5</h4>
      </div>
      <div className="p-3">
        <h5 className="font-[600]">Joined on</h5>
        <h4 className="text-[#000000a6]">{seller.createdAt.slice(0, 10)}</h4>
      </div>
      {isOwner && (
        <div className="px-4 py-3">
          <div className={`${styles.button} !w-full !h-[42px] !rounded-[5px]`}>
            <span className="text-white">Edit Shop</span>
          </div>
          <div
            className={`${styles.button} !w-full !h-[42px] !rounded-[5px] `}
            onClick={logoutHandler}
          >
            <span className="text-white">Log Out</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShopInfo;
