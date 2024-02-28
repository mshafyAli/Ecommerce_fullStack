import React, { useState } from 'react'
import { RxCross1 } from 'react-icons/rx'
import { IoBagHandleOutline } from "react-icons/io5";
import { HiOutlineMinus, HiPlus } from "react-icons/hi";
import { Link } from 'react-router-dom';


import styles from '../../styles/styles'

const Cart = ({setOpenCart}) => {

    const cartData = [
        {
            name:"Iphone 14 pro max pro max 256 gb ssd and 8gb silver colour",
            description:"test",
            price:1000,
        },
        {
            name:"Iphone 14 pro max pro max 256 gb ssd and 8gb silver colour",
            description:"test",
            price:2000,
        },
        {
            name:"Iphone 14 pro max pro max 256 gb ssd and 8gb silver colour",
            description:"test",
            price:3000,
        }
    ]

  return (
    <div className='fixed top-0 left-0 w-full bg-[#0000004b] h-screen z-10'>
        <div className='fixed top-0 right-0 min-h-full w-[25%] bg-white flex flex-col justify-between shadow-sm'>
            <div>
                <div className='flex w-full justify-end pt-5 pr-5'>
                <RxCross1
                size={25}
                className="cursor-pointer"
                onClick={() => setOpenCart(false)}
              />

                </div>

                {/* Item length */}
                <div className={`${styles.noramlFlex} p-4`}>
                <IoBagHandleOutline size={25} />
                <h1 className='text-[20px] font-[500] pl-2'>3 items</h1>
                </div>

                <br />

                {/* Cart Single Item */}
                <div className='w-full border-t'>
                   {
                    cartData && cartData.map((i,index)=>(
                        <CardSingle key={index} data={i} />
                    ))
                   } 
                </div>

            </div>

            {/* CheckOut Button */}

              <div className='px-5 mb-3'>
                <Link to="/checkOut"> 
                <div className='h-[45px] w-[100%] flex justify-center items-center rounded-[5px] bg-[#e44343]'>
                   <h1 className='text-white font-[600] text-[18px]'>CheckOut Now (USD 1080)</h1>
                </div>
                 </Link>
            </div>     


        </div>
    </div>
  )
}

const CardSingle = ({data}) => {
    const [value ,setValue] = useState(1);
    const totalPrice = value * data.price;

    return(
        <div className='border-b p-4'>
            <div className='w-full flex items-center '>
                <div>
                    <div className={ `bg-[#e44343] border border-[#e4434373] rounded-full w-[25px] h-[25px] ${styles.noramlFlex} justify-center cursor-pointer`} onClick={()=>setValue(value+1)}>
                    <HiPlus size={18} color="#fff" />
                    </div>
                    <span className='pl-[10px]'>{value}</span>

                    <div className={`bg-[#a7abb14f] rounded-full w-[25px] h-[25px] ${styles.noramlFlex} justify-center cursor-pointer`}onClick={() =>setValue(value === 1 ? 1:value-1)}>
                    <HiOutlineMinus size={16} color="#7d879c" />

                    </div>
                </div>

                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdx-g3PbxGmAQry6pTbmBHFm_ADz6ygYZWxQ&usqp=CAU" alt="" className='w-[80px] h-[80px] ml-2' />
                <div className='pl-[5px]'>
                    <h1>{data.name}</h1>
                    <h4 className='font-[400] text-[15px] text-[#00000082]'>${data.price}*{value}</h4>
                    <h4 className='font-[600] text-[17px] font-Roboto text-[#d02222] pt-[3px]'>US${totalPrice}</h4>
                </div>

                <RxCross1 className='cursor-pointer'/>


            </div>

        </div>
    )
}

export default Cart