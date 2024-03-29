import React from 'react'
import styles from '../../../styles/styles'
import CountDown from './CountDown'

const EventCard = ({active}) => {
  return (
      <div className={`w-full block bg-white rounded-lg ${active ? "unset" :"mb-12"} lg:flex  p-2`}>
        <div className='w-full lg:w-[50%] mx-auto'>
            <img src="https://m.media-amazon.com/images/I/31Vle5fVdaL.jpg" alt="" />
        </div>
        <div className='w-full lg:w-[50% flex flex-col justify-center'>
            <h2 className={`${styles.productTitle}`}>Iphone 14pro max5/256 gb</h2>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Odit iste voluptas reiciendis voluptatum, consequuntur voluptate sed culpa corporis deleniti. Eius, explicabo eum tenetur beatae minus facilis quasi dicta quos delectus Lorem ipsum dolor sit amet consectetur, adipisicing elit. Odit iste voluptas reiciendis voluptatum, consequuntur voluptate sed culpa corporis deleniti. Eius, explicabo eum tenetur beatae minus facilis quasi dicta quos delectus
            </p>
            <div className='flex py-3 justify-between'>
                <div className='flex'>
                    <h5 className='text-[18px] text-[#d55b45] font-[500] line-through pr-3'>1099$</h5>
                    <h5 className='font-bold text-[20px] text-[#333]   font-Roboto'>999$</h5>
                </div>
                <div>
                    <span className='pr-3 font-[400] text-[17px] text-[#44a55e]'>120 Sold</span>
                </div>
            </div>
            <CountDown />
        </div>

      </div>  



  )
}

export default EventCard