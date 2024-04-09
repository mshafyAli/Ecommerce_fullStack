import { useState } from "react";
import React from "react";
import { Link } from "react-router-dom";
import styles from "../../../styles/styles";
import ProductDetailsCard from "../ProductDetailsCard/ProductDetailsCard"

import {
  AiFillHeart,
  AiFillStar,
  AiOutlineEye,
  AiOutlineHeart,
  AiOutlineShoppingCart,
  AiOutlineStar,
} from "react-icons/ai";
import backend_Url from "../../../backend_Url";

const ProductCard = ({ data }) => {
  const [click, setClick] = useState(false);
  const [open, setOpen] = useState(false);

  const d = data.name;
  const product_name = d.replace(/\s+/g, "-");

  return (
    <>
      <div className="w-full h-[370px] bg-white rounded-lg shadow-sm p-3 relative cursor-pointer">
        <div className="flex justify-end"></div>
        <Link to={`/product/${product_name}`}>
          <img
            src={`${backend_Url}${data.images && data.images[0]}`}
            alt=""
            className="w-full h-[170px] object-contain"
          />
        </Link>

        <Link to={`/shop/preview/${data?.shop._id}`}>
          <h5 className={`${styles.shop_name}`}>{data.shop.name}</h5>
        </Link>
        <Link to={`/product/${product_name}`}>
          <h4 className="pb-3 font-[500]">
            {data.name.length > 40 ? data.name.slice(0, 40) + "..." : data.name}
          </h4>

          <div className="flex">
            <AiFillStar
              color="#F6BA00"
              size={20}
              className="mr-2 cursor-pointer"
            />
            <AiFillStar
              color="#F6BA00"
              size={20}
              className="mr-2 cursor-pointer"
            />
            <AiFillStar
              color="#F6BA00"
              size={20}
              className="mr-2 cursor-pointer"
            />
            <AiFillStar
              color="#F6BA00"
              size={20}
              className="mr-2 cursor-pointer"
            />
            <AiOutlineStar
              color="#F6BA00"
              size={20}
              className="mr-2 cursor-pointer"
            />
          </div>

          <div className="flex items-center justify-between py-3">
            <div className="flex">
              <h5 className={`${styles.productDiscountPrice}`}>
               {data.originalPrice === 0 ? data.originalPrice : data.discountPrice }
              </h5>
              <h4 className={`${styles.price}`}>
              {data.originalPrice ? data.originalPrice + " $" : null}
              </h4>
            </div>

            <span className="font-[400] text-[17px] text-[#68d284]">
              {data?.sold_out } Sold
            </span>
          </div>
        </Link>

        {/* Side Options    */}

        <div>
          {click ? (
            <AiFillHeart
              size={22}
              className="cursor-pointer absolute right-2 top-5"
              title="Remove from wishlist"
              onClick={() => setClick(!click)}
              color={click ? "red" : "#333"}
            />
          ) : (
            <AiOutlineHeart
              size={22}
              className="cursor-pointer absolute right-2 top-5"
              title="Add to wishlist"
              onClick={() => setClick(!click)}
              color={click ? "red" : "#333"}
            />
          )}
        </div>

        <AiOutlineEye
          size={22}
          className="cursor-pointer absolute right-2 top-14"
          title="Quick View"
          onClick={() => setOpen(!open)}
          color="#333"
        />

        <AiOutlineShoppingCart
          size={25}
          className="cursor-pointer absolute right-2 top-24"
          title="Add to Cart"
          onClick={() => setOpen(!open)}
          color="#444"
        />

        {

            open ?(<ProductDetailsCard setOpen={setOpen} data={data}/>):null
        }    


      </div>
    </>
  );
};

export default ProductCard;
