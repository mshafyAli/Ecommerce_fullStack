import React, { useState,useEffect } from 'react'
import Header from '../components/Layout/Header'
import { useSearchParams } from 'react-router-dom'
import styles from '../styles/styles';
import { productData } from '../static/data';
import ProductCard from '../components/Route/ProductCard/ProductCard';
import  { useSelector } from 'react-redux';

const ProductPage = () => {

    const [searchParams] = useSearchParams();
    const categoryData = searchParams.get('category');
    const [data,setData] = useState([]);
    const { allProducts } = useSelector((state) => state.products);


    useEffect(() => {
        if(categoryData === null){
            const d = allProducts && allProducts.sort((a,b)=>a.sold_out
            -b.sold_out);
            setData(d);
        } else{
            const d = allProducts && allProducts.filter(item => item.category === categoryData);
            setData(d);

        }
        // window.scrollTo(0,0);
    },[allProducts])



  return (

    <>
    <Header activeHeading={3} />
    <br />
    <br />
    <div className={`${styles.section}`}>
        <div className='grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12'>
            {
                data && data.map((i,index) => <ProductCard data={i} key={index}/>)
            }
           
         

        </div>
        {
           data && data.length === 0 && <h1 className='text-center text-[20px]  pb-[100px]'>No Product Found!</h1>
        }

    </div>

    </>
  )
}

export default ProductPage