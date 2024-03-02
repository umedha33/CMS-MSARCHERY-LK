import React, { useContext, useEffect, useState } from 'react'
import './ScheduleSide.css'
import dayjs from 'dayjs'
import { getMonth } from '../Assets/util'
import GlobalContext from '../../context/GlobalContext'

const ScheduleSide = () => {

  const [currentMonthIdx, setCurrentMonthIdx] = useState(dayjs().month())
  const [currentMonth, setCurrentMonth] = useState(getMonth())
  const { monthIndex, setSmallCalendarMonth, daySelected, setDaySelected, setShowEventModal } = useContext(GlobalContext)

  const handlePrevMonth = () => {
    setCurrentMonthIdx(currentMonthIdx - 1);
  }

  const handleNextMonth = () => {
    setCurrentMonthIdx(currentMonthIdx + 1);
  }

  const getDayClass = (day) => {
    const format = "DD-MM-YY";
    const nowDay = dayjs().format(format);
    const currDay = day.format(format);
    const slcDay = daySelected && daySelected.format(format);

    if (nowDay === currDay) {
      return "currDay";
    } else if (currDay === slcDay) {
      return "slcDay";
    } else {
      return "";
    }
  }

  useEffect(() => {
    setCurrentMonth(getMonth(currentMonthIdx));
  }, [currentMonthIdx])

  useEffect(() => {
    setCurrentMonthIdx(monthIndex);
  }, [monthIndex])

  return (
    <div className='schedule-side-container'>
      <div className="event-btnset">
        <h1>Schedule</h1>
        <button onClick={() => setShowEventModal(true)} id='sch-add-btn'><i className="fa-solid fa-plus"></i>Create</button>
      </div>
      <div className="small-calendar-cont">
        <div className='top-set-smcal'>
          <p>{dayjs(new Date(dayjs().year(), currentMonthIdx)).format("MMMM YYYY")}</p>
          <div className="smallcalendar-navset">
            <i onClick={handlePrevMonth} className="fa-solid fa-angle-left smallmonthnav"></i>
            <i onClick={handleNextMonth} className="fa-solid fa-angle-right smallmonthnav"></i>
          </div>
        </div>
        <div className="small-cal">
          <div className="grid-lay">
            {currentMonth[0].map((day, i) => (
              <span key={i}>
                {day.format('dd').charAt(0)}
              </span>
            ))}
          </div>
          <div>
            {currentMonth.map((row, i) => (
              <div key={i} className='datesgrd'>
                {row.map((day, idx) => (
                  <button key={idx} onClick={() => {
                    setSmallCalendarMonth(currentMonthIdx);
                    setDaySelected(day);
                  }} className={`daybtns ${getDayClass(day)}`}>
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
