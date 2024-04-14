import { useEffect, useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { addToWishlist, removeFromWishlist } from "../../../redux/actions/wishlist";
import { toast } from "react-toastify";
import { addTocart } from "../../../redux/actions/cart";

const ProductCard = ({ data }) => {
  const { wishlist } = useSelector((state) => state.wishlist);
  const { cart } = useSelector((state) => state.cart);
  const [click, setClick] = useState(false);
  const [open, setOpen] = useState(false);

  const d = data.name;
  const product_name = d.replace(/\s+/g, "-");


  const dispatch = useDispatch();

  useEffect(() => {
    if (wishlist && wishlist.find((i) => i._id === data._id)) {
      setClick(true);
    } else {
      setClick(false);
    }
  }, [wishlist]);

  const removeFromWishlistHandler = (data) => {
    setClick(!click);
    dispatch(removeFromWishlist(data));
  };

  const addToWishlistHandler = (data) => {
    setClick(!click);
    dispatch(addToWishlist(data));
  };

  const addToCartHandler = (id) => {
    const isItemExists = cart && cart.find((i) => i._id === id);
    if (isItemExists) {
      toast.error("Item already in cart!");
    } else {
      if (data.stock < 1) {
        toast.error("Product stock limited!");
      } else {
        const cartData = { ...data, qty: 1 };
        dispatch(addTocart(cartData));
        toast.success("Item added to cart successfully!");
      }
    }
  };

  


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
              onClick={() => removeFromWishlistHandler(data)}
              color={click ? "red" : "#333"}
            />
          ) : (
            <AiOutlineHeart
              size={22}
              className="cursor-pointer absolute right-2 top-5"
              title="Add to wishlist"
              onClick={() => addToWishlistHandler(data)}
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
          onClick={() => addToCartHandler(data._id)}
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
