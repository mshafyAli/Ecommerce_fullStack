import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import styles from "../../styles/styles";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineMessage,
  AiOutlineShoppingCart,
} from "react-icons/ai";

const ProductDetails = ({ data }) => {
  const [count, setCount] = useState(1);
  const [click, setClick] = useState(false);
  const [select, setSelect] = useState(0);
  const navigate = useNavigate();

  const incrementCount = () => {
    setCount(count + 1);
  };
  const decrementCount = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

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
                <img
                  src={data.image_Url[select].url}
                  alt=""
                  className="w-[80%]"
                />
                <div className="w-full flex">
                  <div
                    className={`${
                      select === 0 ? "border" : "null"
                    } cursor-pointer`}
                  >
                    <img
                      src={data?.image_Url[0].url}
                      alt=""
                      className="h-[200px]"
                      onClick={() => setSelect(0)}
                    />
                  </div>
                  <div
                    className={`${
                      select === 1 ? "border" : "null"
                    } cursor-pointer`}
                  >
                    <img
                      src={data?.image_Url[1].url}
                      alt=""
                      className="h-[200px]"
                      onClick={() => setSelect(1)}
                    />
                  </div>
                </div>
              </div>

              {/* Right Side Content */}

              <div className="w-full 800px:w-[50%] pt-5">
                <h1 className={`${styles.productTitle}`}>{data.name}</h1>
                <p>{data.description}</p>

                <div className="flex pt-3">
                  <h4 className={`${styles.productDiscountPrice}`}>
                    {data.discount_price}$
                  </h4>
                  <h3 className={`${styles.price}`}>
                    {data.price ? data.price + "$" : null}
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
                  className={`${styles.button} flex items-center !rounded !h-11 mt-6 `}
                >
                  <span className="text-white flex items-center">
                    Add to Cart
                    <AiOutlineShoppingCart className="ml-1" />
                  </span>
                </div>

                <div className="flex items-center ">
                  <img
                    src={data.shop.shop_avatar.url}
                    className="w-[50px] h-[50px] rounded-full mr-2"
                    alt=""
                  />

                  <div className="pr-8">
                    <h3 className={`${styles.shop_name} pb-1 pt-1`}>
                      {data.shop.name}
                    </h3>
                    <h5 className="text-[15px] pb-3">
                      ({data.shop.ratings})Ratings
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

          <ProductDetailsInfo data={data} />
          <br />
          <br />
        </div>
      ) : null}
    </div>
  );
};

const ProductDetailsInfo = ({ data }) => {
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
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolor,
            quae dicta voluptate fuga qui maiores dignissimos illo, vel
            voluptatem at minus, tempora consequatur optio nesciunt commodi nam
            ratione. Dicta, possimus Lorem ipsum dolor sit, amet consectetur
            adipisicing elit. Dolorum assumenda corrupti, illum nesciunt ducimus
            velit, fugiat repudiandae cupiditate soluta distinctio et animi,
            molestiae ratione aliquid dignissimos. Consequuntur aspernatur
            corrupti ducimus?
          </p>
          <p className="text-[18px] py-2 leading-8 pb-10 whitespace-pre-line">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolor,
            quae dicta voluptate fuga qui maiores dignissimos illo, vel
            voluptatem at minus, tempora consequatur optio nesciunt commodi nam
            ratione. Dicta, possimus?
          </p>
          <p className="text-[18px] py-2 leading-8 pb-10 whitespace-pre-line">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolor,
            quae dicta voluptate fuga qui maiores dignissimos illo, vel
            voluptatem at minus, tempora consequatur optio nesciunt commodi nam
            ratione. Dicta, possimus?
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
            <div className="flex items-center">
              <img src={data.shop.shop_avatar.url} className="w-[50px] h-[50px] rounded-full mr-2" alt="" />
              <div className="pl-2">
                <h3 className={`${styles.shop_name}`}>{data.shop.name}</h3>
                <h5 className="pb-2 text-[15px]">({data.shop.ratings}) Ratings</h5>
              </div>

            </div>
              <p className="pt-2">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Soluta voluptates maxime dicta accusamus fugit earum perspiciatis nisi velit enim nihil reprehenderit, ab blanditiis dolor ut quod voluptatum dolorum! Maxime, reprehenderit!
              </p>
                
          </div>


          <div className="w-full 800px:w-[50%] mt-5 800px:mt-0  800px:flex flex-col items-end">
            <div className="text-left">
              <h5 className="font-[600]">Joined on:<span className="font-[500]">2 March 2024</span></h5>
              <h5 className="font-[600] pt-3">Total Products:<span className="font-[500]">1023</span></h5>
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
