import React from 'react'
import styles from '../../../styles/styles'
import EventCard from './EventCard'


const Events = () => {
  return (
    <div>
        <div className={`${styles.section}`}>
            <div className={`${styles.heading} mt-8`}>
                <h1>Popular Events</h1>
            </div>

            <div className='w-full'>
                <EventCard />
            </div>
        </div>
    </div>
  )
}

export default Events