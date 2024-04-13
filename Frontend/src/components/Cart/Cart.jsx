import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { IoBagHandleOutline } from "react-icons/io5";
import { HiOutlineMinus, HiPlus } from "react-icons/hi";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { removeFromCart, addTocart } from "../../redux/actions/cart";
import { useDispatch } from "react-redux";
import backend_Url from "../../backend_Url";
import { toast } from "react-toastify";
import styles from "../../styles/styles";

const Cart = ({ setOpenCart }) => {
  const { cart } = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  const removeFromCartHandler = (data) => {
    dispatch(removeFromCart(data));
  };

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.qty * item.discountPrice,
    0
  );
  const quantityChangeHandler = (data) => {
    dispatch(addTocart(data));
  };

  return (
    <div className="fixed top-0 left-0 w-full bg-[#0000004b] h-screen z-10">
      <div className="fixed top-0 right-0 min-h-full w-[25%] bg-white flex flex-col justify-between shadow-sm">
       {
        cart && cart.length === 0 ? (
            <div className="w-full h-screen flex justify-center items-center">
                <div className="flex w-full justify-end pt-5 pr-5 fixed top-3 right-3">
                <RxCross1
                size={25}
                className="cursor-pointer"
                onClick={() => setOpenCart(false)}
              />

                </div>
                <h5>Cart Items is empty!</h5>
            </div>
        ):(
            <>
             <div>
          <div className="flex w-full justify-end pt-5 pr-5">
            <RxCross1
              size={25}
              className="cursor-pointer"
              onClick={() => setOpenCart(false)}
            />
          </div>

          {/* Item length */}
          <div className={`${styles.noramlFlex} p-4`}>
            <IoBagHandleOutline size={25} />
            <h1 className="text-[20px] font-[500] pl-2">{cart && cart.length} items</h1>
          </div>

          <br />

          {/* Cart Single Item */}
          <div className="w-full border-t">
            {cart &&
              cart.map((i, index) => (
                <CardSingle
                  key={index}
                  data={i}
                  quantityChangeHandler={quantityChangeHandler}
                  removeFromCartHandler={removeFromCartHandler}
                />
              ))}
          </div>
        </div>

        {/* CheckOut Button */}

        <div className="px-5 mb-3">
          <Link to="/checkOut">
            <div className="h-[45px] w-[100%] flex justify-center items-center rounded-[5px] bg-[#e44343]">
              <h1 className="text-white font-[600] text-[18px]">
                CheckOut Now (USD$ {totalPrice})
              </h1>
            </div>
          </Link>
        </div>
            </>
        )
       }
      </div>
    </div>
  );
};

const CardSingle = ({ data, quantityChangeHandler, removeFromCartHandler }) => {
  const [value, setValue] = useState(data.qty);
  const totalPrice = value * data.discountPrice;

  const increment = (data) => {
    if (data.stock < value) {
      toast.error("Product stock limited!");
    } else {
      setValue(value + 1);
      const updateCartData = { ...data, qty: value + 1 };
      quantityChangeHandler(updateCartData);
    }
  };

  const decrement = (data) => {
    setValue(value === 1 ? 1 : value - 1);
    const updateCartData = { ...data, qty: value === 1 ? 1 : value - 1 };
    quantityChangeHandler(updateCartData);
  };

  return (
    <div className="border-b p-4">
      <div className="w-full flex items-center ">
        <div>
          <div
            className={`bg-[#e44343] border border-[#e4434373] rounded-full w-[25px] h-[25px] ${styles.noramlFlex} justify-center cursor-pointer`}
            onClick={() => increment(data)}
          >
            <HiPlus size={18} color="#fff" />
          </div>
          <span className="pl-[10px]">{value}</span>

          <div
            className={`bg-[#a7abb14f] rounded-full w-[25px] h-[25px] ${styles.noramlFlex} justify-center cursor-pointer`}
            onClick={() => decrement(data)}
          >
            <HiOutlineMinus size={16} color="#7d879c" />
          </div>
        </div>

        <img
          src={`${backend_Url}${data.images[0]}`}
          alt=""
          className="w-[130px] h-min ml-2 mr-2 rounded-[5px]"
        />
        <div className="pl-[5px]">
          <h1>{data.name}</h1>
          <h4 className="font-[400] text-[15px] text-[#00000082]">
            ${data.discountPrice}*{value}
          </h4>
          <h4 className="font-[600] text-[17px] font-Roboto text-[#d02222] pt-[3px]">
            US${totalPrice}
          </h4>
        </div>

        <RxCross1 className="cursor-pointer" onClick={() => removeFromCartHandler(data)} />
      </div>
    </div>
  );
};

export default Cart;
