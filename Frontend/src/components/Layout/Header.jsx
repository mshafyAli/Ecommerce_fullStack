import { useSelector } from "react-redux";
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  AiOutlineSearch,
  AiOutlineHeart,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { CgProfile } from "react-icons/cg";

import { BiMenuAltLeft } from "react-icons/bi";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";

import styles from "../../styles/styles.js";
import { categoriesData, productData } from "../../static/data";
import DropDown from "./DropDown";
import NavBar from "./NavBar";
import Cart from "../Cart/Cart"

const Header = ({ activeHeading }) => {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchData, setSearchData] = useState(null);
  const [active, setActive] = useState(false);
  const [dropDown, setDropDown] = useState(false);
  const [openCart,setOpenCart] = useState(false);
  const [openWishList,setOpenWishList] = useState(false);


  // console.log(user);

  const handleChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    const filteredData =
      productData &&
      productData.filter((product) =>
        product.name.toLowerCase().includes(term.toLowerCase())
      );
    setSearchData(filteredData);
  };

  window.addEventListener("scroll", () => {
    if (window.scrollY > 70) {
      setActive(true);
    } else {
      setActive(false);
    }
  });

  return (
    <>
      <div className={`${styles.section}`}>
        <div className="hidden 800px:h-[50px] 800px:my-[20px] 800px:flex  items-center justify-between">
          <div>
            <Link to="/">
              <img
                src="https://shopo.quomodothemes.website/assets/images/logo.svg"
                alt="shop"
              />
            </Link>
          </div>

          {/* Search Box */}

          <div className="w-[50%] relative">
            <input
              type="text"
              placeholder="Search Product.."
              value={searchTerm}
              onChange={handleChange}
              className="h-[40px] w-full px-2 border-[#3957db] border-[2px]  rounded-md"
            />
            <AiOutlineSearch size={30} className="absolute right-2 top-2" />
            {searchData && searchData.length !== 0 ? (
              <div className="absolute min-h-[30vh] bg-slate-50 shadow-sm z-[9] p-4">
                {searchData &&
                  searchData.map((i, index) => {
                    const d = i.name;

                    const product_name = d.replace(/\s+/g, "-");

                    return (
                      <Link to={`/product/${product_name}`} key={index}>
                        <div className="w-full flex items-start py-3">
                          <img
                            src={i.image_Url[0].url}
                            alt=""
                            className="w-[40px] h-[40px] mr-10"
                          />
                          <h1>{i.name}</h1>
                        </div>
                      </Link>
                    );
                  })}
              </div>
            ) : null}
          </div>

          {/* Become Seller */}
          <div className={`${styles.button}`}>
            <Link to="/seller">
              <h1 className="text-[#fff] flex items-center">
                Become Seller <IoIosArrowForward className="ml-1" />
              </h1>
            </Link>
          </div>
        </div>
      </div>

      <div
        className={`${
          active === true ? "shadow-sm fixed top-0 left-0 z-10" : null
        } transition hidden 800px:flex items-center justify-between bg-[#3321c8] w-full h-[70px]`}
      >
        <div
          className={`${styles.section} relative ${styles.noramlFlex} justify-between `}
        >
          {/* Categories */}

          <div onClick={() => setDropDown(!dropDown)}>
            <div className="relative h-[60px] mt-[10px] w-[270px] hidden 1000px:block">
              <BiMenuAltLeft size={30} className="absolute top-3 left-2" />
              <button
                className={`h-[100%] w-full flex items-center justify-between pl-10 bg-white font-sans font-[500] rounded-t-md text-lg select-none`}
              >
                All Categories
              </button>
              <IoIosArrowDown
                size={30}
                className="absolute top-4 right-2 cursor-pointer"
                onClick={() => setDropDown(!dropDown)}
              />
              {dropDown ? (
                <DropDown
                  categoriesData={categoriesData}
                  setDropDown={setDropDown}
                />
              ) : null}
            </div>
          </div>

          {/* Nav items    */}

          <div className={`${styles.noramlFlex}`}>
            <NavBar active={activeHeading} />
          </div>

          {/* Right Side OF Header */}

          <div className="flex">
            <div className={`${styles.noramlFlex}`}>
              <div className="relative cursor-pointer mr-[15px]">
                <AiOutlineHeart size={30} color="rgb(255 255 255 / 83%)" />
                <span className="absolute top-0 right-0 bg-[#3bc177] rounded-full w-4 h-4 p-0 m-0 text-[12px] text-white text-center font-mono leading-tight">
                  0
                </span>
              </div>
            </div>
            <div className={`${styles.noramlFlex}`}>
              <div className="relative cursor-pointer mr-[15px]" onClick={()=>setOpenCart(true)}>
                <AiOutlineShoppingCart
                  size={30}
                  color="rgb(255 255 255 / 83%)"
                />
                <span className="absolute top-0 right-0 bg-[#3bc177] rounded-full w-4 h-4 p-0 m-0 text-[12px] text-white text-center font-mono leading-tight">
                  1
                </span>
              </div>
            </div>
            <div className={`${styles.noramlFlex}`}>
              <div className="relative cursor-pointer mr-[15px]">
                {isAuthenticated ? (
                  <Link to="/profile">
                    <img src={`http://localhost:3000/${user.avatar}`} className="w-[40px] h-[40px] rounded-full" alt="" />
                  </Link>
                ) : (
                  <Link to="/login">
                    <CgProfile size={30} color="rgb(255 255 255 / 83%)" />
                  </Link>
                )}
              </div>
            </div>

          {/* Cart Popups */}
          {
            openCart ? (<Cart setOpenCart={setOpenCart}/>):(null)
          }



          </div>
        </div>
      </div>
    </>
  );
};
export default Header;
