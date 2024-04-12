import React from 'react'
import styles from '../../../styles/styles'
import EventCard from './EventCard'
import { useSelector } from 'react-redux'


const Events = () => {
  const { allEvents,isLoading } = useSelector((state) => state.events)
  console.log("allEvents",allEvents)
  return (
    <div>
        {
          !isLoading && <div className={`${styles.section}`}>
          <div className={`${styles.heading} mt-8`}>
              <h1>Popular Events</h1>
          </div>

          <div className='w-full'>
              <EventCard data={allEvents && allEvents[1]} />
          </div>
      </div>
        }
    </div>
  )
}

export default Events