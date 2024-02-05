import { useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";

import styles from "../../styles/styles.js";
import { productData } from "../../static/data";

const Header = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchData, setSearchData] = useState(null);

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
              <h1 className="text-[#fff] flex items-center">Become Seller <IoIosArrowForward className="ml-1"/></h1>

            </Link>
          </div>
            

        </div>
      </div>
    </>
  );
};
export default Header;
