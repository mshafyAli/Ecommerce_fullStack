// import React, { useEffect } from 'react'
// import styles from '../../../styles/styles'
// // import { productData } from '../../../static/data'
// import ProductCard from '../ProductCard/ProductCard'
// import { useSelector } from 'react-redux'


// const FeatureProduct = () => {
//     const {allProducts} = useSelector((state) => state.products)

    

//   return (
//     <div>
//         <div className={`${styles.section}`}>
//             <div className={`${styles.heading} mt-8`}>
//                 <h1>Feature Products</h1>
//             </div>
//             <div className='grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] border-0'>
        
//         {/* {
//             allProducts && allProducts.length !== 0 &&(
//               <>
//                {allProducts && allProducts.map((i, index) => <ProductCard data={i} key={index} />)}
//               </>
//             )
//            } */}

//            {
//             allProducts && allProducts.map((i, index) => <ProductCard data={i} key={index} />)
//            }
//            {
//             console.log("Products",allProducts)
//            }
//             </div>
//         </div>
//     </div>
//   )
// }

// export default FeatureProduct


import React from 'react';
import styles from '../../../styles/styles';
import ProductCard from '../ProductCard/ProductCard';
import { useSelector } from 'react-redux';

const FeatureProduct = () => {
    const { allProducts } = useSelector((state) => state.products);
    // console.log("All Products:", allProducts); // Log the value of allProduct

    return (
        <div>
            <div className={`${styles.section}`}>
                <div className={`${styles.heading} mt-8`}>
                    <h1>Feature Products</h1>
                </div>
                <div className='grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] border-0'>
                    {allProducts && allProducts.map((i, index) => (
                        <ProductCard data={i} key={index} />
                    ))}
                    {
                      console.log(allProducts)
                    }
                </div>
            </div>
        </div>
    );
};

export default FeatureProduct;
