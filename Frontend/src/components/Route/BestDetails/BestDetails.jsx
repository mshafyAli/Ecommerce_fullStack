import React, { useEffect, useState } from 'react'
import { productData } from '../../../static/data';
import styles from '../../../styles/styles';
import ProductCard from '../ProductCard/ProductCard';
import { useSelector } from 'react-redux';



const BestDetails = () => {
    const [data, setData] = useState([]);
    const { allProducts } = useSelector((state) => state.products);

    useEffect(() => {
        if (allProducts) {
            const firstFive = allProducts.slice(0, 5); // Adjusted to slice first 5 items
            setData(firstFive);
        }
    }, [allProducts]);

    return (
        <div>
            <div className={`${styles.section}`}>
                <div className={`${styles.heading}`}>
                    <h1>Best Deals</h1>
                </div>
                <div className='grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] border-0'>
                    {
                        data.map((item, index) => (
                            <ProductCard data={item} key={index} />
                        ))
                    }
                </div>
            </div>
        </div>
    );
}



export default BestDetails