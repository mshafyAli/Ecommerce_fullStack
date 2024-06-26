import React from 'react'
import styles from '../../../styles/styles'
import CountDown from './CountDown'
import backend_Url from '../../../backend_Url'

const EventCard = ({active,data}) => {
  return (
      <div className={`w-full block bg-white rounded-lg ${active ? "unset" :"mb-12"} lg:flex  p-2`}>
        <div className='w-full lg:w-[50%] mx-auto'>
            <img src={`${backend_Url}${data.images[0]}`} alt="" />
        </div>
        <div className='w-full lg:w-[50% flex flex-col justify-center'>
            <h2 className={`${styles.productTitle}`}>{data.name}</h2>
            <p>{data.description}</p>
            
            <div className='flex py-3 justify-between'>
                <div className='flex'>
                    <h5 className='text-[18px] text-[#d55b45] font-[500] line-through pr-3'>{data.originalPrice}$</h5>
                    <h5 className='font-bold text-[20px] text-[#333]   font-Roboto'>{data.discountPrice}$</h5>
                </div>
                <div>
                    <span className='pr-3 font-[400] text-[17px] text-[#44a55e]'>120 Sold</span>
                </div>
            </div>
            <CountDown data={data} />
        </div>

      </div>  



  )
}

export default EventCard