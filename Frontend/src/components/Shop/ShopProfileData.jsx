import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "../../styles/styles";
import  { productData } from "../../static/data";
import ProductCard from "../Route/ProductCard/ProductCard"

const ShopProfileData = ({ isOwner }) => {
  const [active, setActive] = useState(1);
  return (
    <div className="w-full">
      <div className="w-full flex items-center">
       <div className="w-full flex">
       <div
          className="flex items-center cursor-pointer pr-[20px]"
          onClick={() => setActive(1)}
        >
          <h5
            className={`font-[600] text-[20px] ${
              active === 1 ? "text-[crimson]" : "text-[#555]"
            } `}
          >
            Shop Products
          </h5>
        </div>
        <div
          className="flex items-center cursor-pointer pr-[20px]"
          onClick={() => setActive(2)}
        >
          <h5
            className={`font-[600] text-[20px] ${
              active === 2 ? "text-[crimson]" : "text-[#555]"
            } `}
          >
            Running Events
          </h5>
        </div>
        <div
          className="flex items-center cursor-pointer pr-[20px]"
          onClick={() => setActive(3)}
        >
          <h5
            className={`font-[600] text-[20px] ${
              active === 3 ? "text-[crimson]" : "text-[#555]"
            } `}
          >
            Shop Reviews
          </h5>
        </div>
       </div>

       <div>
        {
          isOwner &&(
            <div>
              <Link to={"/dashboard"}>
                <div className={`${styles.button} !h-[42px] !rounded-[4px]`}>
                  <span className="text-white">Go Dasboard</span>

                </div>
              </Link>
            </div>
          )
        }
       </div>
      </div> 

      <br />

     <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] xl:grid-cols-4 xl:gap-[20px] mb-12 border-0">
      {
        productData && productData.map((item, index) => (
         <ProductCard key={index} data={item} isShop={true} />
       ))
      }
      </div>   

    </div>
  );
};

export default ShopProfileData;
