import React, { useContext, useEffect, useState } from 'react'
import './ScheduleSide.css'
import dayjs from 'dayjs'
import { getMonth } from '../Assets/util'
import GlobalContext from '../../context/GlobalContext'

const ScheduleSide = () => {

  const [currentMonthIdx, setCurrentMonthIdx] = useState(dayjs().month())
  const [currentMonth, setCurrentMonth] = useState(getMonth())
  const { monthIndex } = useContext(GlobalContext)

  const handlePrevMonth = () => {
    setCurrentMonthIdx(currentMonthIdx - 1);
  }

  const handleNextMonth = () => {
    setCurrentMonthIdx(currentMonthIdx + 1);
  }

  useEffect(() => {
    setCurrentMonth(getMonth(currentMonthIdx));
  }, [currentMonth])

  useEffect(() => {
    setCurrentMonthIdx(monthIndex);
  }, [monthIndex])

  return (
    <div className='schedule-side-container'>
      <div className="event-btnset">
        <h1>Schedule</h1>
        <button id='sch-add-btn'><i class="fa-solid fa-plus"></i>Create</button>
      </div>
      <div className="small-calendar-cont">
        <div className='top-set-smcal'>
          <p>{dayjs(new Date(dayjs().year(), currentMonthIdx)).format("MMMM YYYY")}</p>
          <div className="smallcalendar-navset">
            <i onClick={handlePrevMonth} class="fa-solid fa-angle-left smallmonthnav"></i>
            <i onClick={handleNextMonth} class="fa-solid fa-angle-right smallmonthnav"></i>
          </div>
        </div>
        <div className="small-cal">
          <div className="grid-lay">
            {currentMonth[0].map((day, i) => (
              <span>
                {day.format('dd').charAt(0)}
              </span>
            ))}
            {currentMonth.map((row, i) => (
              <div key={i}>
                {row.map((day, idx) => (
                  <button key={idx} className={`daybtns`}>
                    <span>{day.format('DD')}</span>
                  </button>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ScheduleSide
