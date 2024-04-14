import React, { useEffect, useState } from "react";
import { RxCross1 } from "react-icons/rx";
import {
  AiOutlineMessage,
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import styles from "../../../styles/styles";
import backend_Url from "../../../backend_Url";
import { useDispatch, useSelector } from "react-redux";
import { addTocart } from "../../../redux/actions/cart";
import { toast } from "react-toastify";
import { addToWishlist, removeFromWishlist } from "../../../redux/actions/wishlist";

const ProductDetailsCard = ({ setOpen, data }) => {
  const { cart } = useSelector((state) => state.cart);
  const { wishlist } = useSelector((state) => state.wishlist);


  const [count, setCount] = useState(1);
  const [click, setClick] = useState(false);
  const [select, setSelect] = useState(false);
  const dispatch = useDispatch();

  const handleMessageSubmit = () => {};

  const decrementCount = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const incrementCount = () => {
    setCount(count + 1);
  };

  const addToCartHandler = (id) => {
    console.log("cart", cart);
    const isItemExists = cart && cart.find((i) => i._id === id);
    if (isItemExists) {
      toast.error("Item already in cart!");
    } else {
      if (data.stock < count) {
        toast.error("Product stock limited!");
      } else {
        const cartData = { ...data, qty: count };
        dispatch(addTocart(cartData));
        toast.success("Item added to cart!");
      }
    }
  };


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

  return (
    <div className="bg-[#fff]">
      {data ? (
        <div className="fixed w-full h-screen bg-[#00000030] top-0 left-0 z-40 flex items-center justify-center">
          <div className="w-[90%] 800px:w-[60%] h-[90vh] overflow-y-scroll 800px:h-[75vh] bg-white rounded-md shadow-sm relative p-4">
            <RxCross1
              size={30}
              className="absolute right-3 top-3 z-50"
              onClick={() => setOpen(false)}
            />

            <div className="block w-full 800px:flex">
              {/* Right Side */}

              <div className="w-full 800px:w-[50%]">
                <img src={`${backend_Url}${data.images && data.images[0]}`} />
                <div className="flex">
                  <img
                    src={`${backend_Url}${data.shop.avatar}`}
                    alt=""
                    className="w-[50px] h-[50px] rounded-full mr-2"
                  />
                  <div>
                    <h3 className={`${styles.shop_name}`}>{data.shop.name}</h3>
                    <h5 className="pb-3 text-[15px]">(4/5)</h5>
                  </div>
                </div>

                <div
                  className={`${styles.button} bg-[#000] rounded-[4px] h-11`}
                  onClick={handleMessageSubmit}
                >
                  <span className="text-[#fff] flex items-center">
                    Send Message
                    <AiOutlineMessage className="ml-1" />
                  </span>
                </div>

                <h5 className="text-[16px] text-[red] mt-5">
                  ({data.sold_out})Sold Out
                </h5>
              </div>

              {/* left Side */}

              <div className="w-full 800px:w-[50%] pt-5 pl-[5px] pr-[5px] ">
                <h1 className={`${styles.productTitle}`}>{data.name}</h1>
                <p>{data.description}</p>

                <div className="flex pt-3">
                  <h4 className={`${styles.productDiscountPrice}`}>
                    {data.discountPrice}$
                  </h4>
                  <h3 className={`${styles.price}`}>
                    {data.originalPrice ? data.originalPrice + "$" : null}
                  </h3>
                </div>

                <div className="flex justify-between items-center mt-12 pr-3">
                  <div>
                    <button
                      className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-1 px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                      onClick={decrementCount}
                    >
                      -
                    </button>

                    <span className="bg-gray-200 text-gray-800 font-medium px-4 py-[11px]">
                      {count}
                    </span>

                    <button
                      className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-1 px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                      onClick={incrementCount}
                    >
                      +
                    </button>
                  </div>

                  <div>
                    {click ? (
                      <AiFillHeart
                        size={30}
                        className="cursor-pointer"
                        onClick={() => removeFromWishlistHandler(data)}
                        color={click ? "red" : "#333"}
                        title="Remove from wishlist"
                      />
                    ) : (
                      <AiOutlineHeart
                        size={30}
                        className="cursor-pointer"
                        onClick={() => addToWishlistHandler(data)}
                        title="Add to wishlist"
                      />
                    )}
                  </div>
                </div>

                {/* Button */}
                <div
                  className={`${styles.button} mt-6 rounded-[4px] h-11 flex items-center`}
                >
                  <span
                    className="text-[#fff] flex items-center"
                    onClick={() => addToCartHandler(data._id)}
                  >
                    Add to cart <AiOutlineShoppingCart className="ml-1" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ProductDetailsCard;
