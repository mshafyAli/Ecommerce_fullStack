import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import styles from "../../styles/styles";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineMessage,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { getAllProductsShop } from '../../redux/actions/product'
import backend_Url from "../../backend_Url";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { addTocart } from "../../redux/actions/cart";


const ProductDetails = ({ data }) => {
  const { cart } = useSelector((state) => state.cart);
  const [count, setCount] = useState(1);
  const [click, setClick] = useState(false);
  const [select, setSelect] = useState(0);
  const navigate = useNavigate();



  const {products} = useSelector((state) => state.products);
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(getAllProductsShop(data && data.shop._id))
  },[dispatch])

  const incrementCount = () => {
    setCount(count + 1);
  };
  const decrementCount = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const addToCartHandler = (id) => {
    console.log("cart",cart)
   const isItemExists = cart && cart.find((i) => i._id === id);
    if (isItemExists) {
      toast.error("Item already in cart!");
  }else{
    const cartData = {...data,qty:count}
    dispatch(addTocart(cartData));
    toast.success("Item added to cart!");
  }
  }
  const handleMessageSubmit = () => {
    navigate("/inbox?conversionjdkfdjdjd");
  };

  return (
    <div className="bg-white">
      {data ? (
        <div className={`${styles.section} w-[90%] 800px:w-[80%]`}>
          <div className="w-full py-5">
            <div className="block w-full 800px:flex">
              {/* left Side Content */}

              <div className="w-full 800px:w-[50%]">
              <img src={`${backend_Url}${data && data.images[select]}`} className="w-[80%]" />

                <div className="w-full flex">
                  {
                    data && data.images.map((i,index)=>(
                      <div
                    className={`${
                      select === 0 ? "border" : "null"
                    } cursor-pointer`}
                  >
                    <img src={`${backend_Url}${i}`}
                      alt=""
                      className="h-[200px] overflow-hidden mr-3 mt-3"
                      onClick={() => setSelect(index)}
                    />
                  </div>
                    ))
                  }
                  
                </div>
              </div>

              {/* Right Side Content */}

              <div className="w-full 800px:w-[50%] pt-5">
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

                <div className="flex items-center justify-between mt-12">
                  <div>
                    <button
                      className="bg-gradient-to-r from-teal-400 to-teal-500 text-white px-4 py-2 shadow-lg hover:opacity-75  transition duration-300 ease-in-out"
                      onClick={decrementCount}
                    >
                      -
                    </button>
                    <span className="bg-gray-200 px-4 py-[11px] text-gray-800 font-medium">
                      {count}
                    </span>
                    <button
                      className="bg-gradient-to-r from-teal-400 to-teal-500 text-white px-4 py-2 shadow-lg hover:opacity-75  transition duration-300 ease-in-out"
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
                        onClick={() => setClick(!click)}
                        color={click ? "red" : "#333"}
                        title="Remove from wishlist"
                      />
                    ) : (
                      <AiOutlineHeart
                        size={30}
                        className="cursor-pointer"
                        onClick={() => setClick(!click)}
                        title="Add to wishlist"
                      />
                    )}
                  </div>
                </div>

                <div
                  className={`${styles.button} flex items-center !rounded !h-11 mt-6 `} onClick={() => addToCartHandler(data._id)}
                >
                  <span className="text-white flex items-center">
                    Add to Cart
                    <AiOutlineShoppingCart className="ml-1" />
                  </span>
                </div>

                <div className="flex items-center ">
                <Link to={`/shop/preview/${data?.shop._id}`}>
                  <img
                    src={`${backend_Url}${data.shop.avatar}`}
                    className="w-[50px] h-[50px] rounded-full mr-2"
                    alt=""
                  />
                  </Link>

                  <div className="pr-8">
                  <Link to={`/shop/preview/${data?.shop._id}`}>
                      <h3 className={`${styles.shop_name} pb-1 pt-1`}>
                        {data.shop.name}
                      </h3>
                    </Link>
                    <h5 className="text-[15px] pb-3">
                      (4/5) Ratings
                    </h5>
                  </div>

                  <div
                    className={`${styles.button} bg-[#6443d1] mt-4 !rounded !h-11`}
                    onClick={handleMessageSubmit}
                  >
                    <span className="text-white flex items-center">
                      Send Message
                      <AiOutlineMessage className="ml-1" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <ProductDetailsInfo data={data} products={products} />
          <br />
          <br />
        </div>
      ) : null}
    </div>
  );
};

const ProductDetailsInfo = ({ data,products }) => {
  const [active, setActive] = useState(1);
  return (
    <div className="bg-[#f5f6fb] px-3 800px:px-10 rounded py-2">
      <div className="w-full flex justify-between border-b pt-10 pb-2">
        <div className="relative">
          <h5
            className="text-[#000] text-[18px] 800px:[20px] px-1 leading-5 font-[600] cursor-pointer"
            onClick={() => setActive(1)}
          >
            Product Details
          </h5>
          {active === 1 ? (
            <div className={`${styles.active_indicator}`} />
          ) : null}
        </div>
        <div className="relative">
          <h5
            className="text-[#000] text-[18px] 800px:[20px] px-1 leading-5 font-[600] cursor-pointer"
            onClick={() => setActive(2)}
          >
            Product Reviews
          </h5>
          {active === 2 ? (
            <div className={`${styles.active_indicator}`} />
          ) : null}
        </div>
        <div className="relative">
          <h5
            className="text-[#000] text-[18px] 800px:[20px] px-1 leading-5 font-[600] cursor-pointer"
            onClick={() => setActive(3)}
          >
            Seller Information
          </h5>
          {active === 3 ? (
            <div className={`${styles.active_indicator}`} />
          ) : null}
        </div>
      </div>
      {active === 1 ? (
        <>
          <p className="text-[18px] py-2 leading-8 pb-10 whitespace-pre-line">
            {data.description}
          </p>
         
        </>
      ) : null}

      {active === 2 ? 
      <>
        <div className="flex justify-center items-center w-full min-h-[40vh]">
          <p className="text-[#000] text-[18px]">No Reviews Yet!</p>
        </div>
      
      </> : null}

      {active === 3 && (
        <div className="w-full 800px:flex p-5">
          <div className="w-full 800px:w-[50%]">
          <Link to={`/shop/preview/${data?.shop._id}`}>
            <div className="flex items-center">
              <img src={`${backend_Url}${data.shop.avatar}`}  className="w-[50px] h-[50px] rounded-full mr-2" alt="" />
              <div className="pl-2">
                <h3 className={`${styles.shop_name}`}>{data.shop.name}</h3>
                <h5 className="pb-2 text-[15px]">(4/5) Ratings</h5>
              </div>

            </div>
            </Link>
              <p className="pt-2">
                {data.shop.description}
              </p>
                
          </div>


          <div className="w-full 800px:w-[50%] mt-5 800px:mt-0  800px:flex flex-col items-end">
            <div className="text-left">
              <h5 className="font-[600]">Joined on:{" "} <span className="font-[500]">{data.shop?.createdAt?.slice(0,10) }</span></h5>
              <h5 className="font-[600] pt-3">Total Products: {" "}<span className="font-[500]">{products && products.length}</span></h5>
              <h5 className="font-[600] pt-3">Total Reviews:<span className="font-[500]">234</span></h5>
              <Link to="/">
                <div className={`${styles.button} !rounded-[4px] !h-[40px] mt-4`}>
                <h4 className="text-white">Visit Shop</h4>
                </div>
              </Link>
            </div>
          </div>

        </div>
      )}


    </div>
  );
};

export default ProductDetails;
