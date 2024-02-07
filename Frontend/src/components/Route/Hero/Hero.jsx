import React from 'react'
import styles from '../../../styles/styles'

const Hero = () => {
  return (
    <div className={`${styles.noramlFlex} min-h-[70vh] 800px:min-h-[80vh] w-full bg-no-repeat relative`} style={{
        backgroundImage:"url(https://themes.rslahmed.dev/rafcart/assets/images/banner-2.jpg)",
    }}>
        <div className={`${styles.section} w-[90%] 800px:w-[60%]`}>
            <h1 className='text-[35px] leading-[1.2] 800px:text-[60px] font-[600] text-[#3d3a3a] capitalize'>
                Best Collection for <br/> home Decoration
            </h1>
            <p className="pt-5 text-[16px] font-[Poppins] font-[400] text-[#000000ba]">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Beatae,
          assumenda? Quisquam itaque <br /> exercitationem labore vel, dolore
          quidem asperiores, laudantium temporibus soluta optio consequatur{" "}
          <br /> aliquam deserunt officia. Dolorum saepe nulla provident.
        </p>
        </div>
        
    </div>
  )
}

export default Hero