import React, { useContext, useEffect, useState } from 'react'
import './Schedules.css'
import { getMonth } from '../Assets/util'
import CalendarMonth from '../CalendarMonth/CalendarMonth'
import ScheduleSide from '../ScheduleSide/ScheduleSide'
import GlobalContext from '../../context/GlobalContext'
import dayjs from 'dayjs'
import EventModal from '../EventModal/EventModal'

const Schedules = ({ activeNavElem }) => {

  const [currentMonth, setCurrentMonth] = useState(getMonth());
  const { monthIndex, showEventModal, setMonthIndex } = useContext(GlobalContext);

  const handlePrevMonth = () => {
    setMonthIndex(monthIndex - 1);
  }

  const handleNextMonth = () => {
    setMonthIndex(monthIndex + 1);
  }

  const handleResetMonth = () => {
    setMonthIndex(monthIndex === dayjs().month() ? monthIndex + Math.random() : dayjs().month());
  }

  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex));
  }, [monthIndex])

  return (
    <div className='schedule-container'>
      <div className="row1-schedule-header">
        <h1>{dayjs(new Date(dayjs().year(), monthIndex)).format("MMMM YYYY")}</h1>
        <div className="calendar-navset">
          <i onClick={handlePrevMonth} className="fa-solid fa-angle-left monthnav"></i>
          <i onClick={handleNextMonth} className="fa-solid fa-angle-right monthnav"></i>
          <button onClick={handleResetMonth}>Today</button>
        </div>
      </div>

      <div className="row2-divider">
        <h2>.</h2>
      </div>

      <div className="row3-schedule-container">
        {showEventModal && <EventModal />}
        <div className="top-btm-set">
          <div className="daynames-set">
            <h2>MON</h2>
            <h2>TUE</h2>
            <h2>WED</h2>
            <h2>THU</h2>
            <h2>FRI</h2>
            <h2>SAT</h2>
            <h2>SUN</h2>
          </div>
          <div className="left-side-sch-cont"><CalendarMonth month={currentMonth} /></div>
        </div>
        <div className="right-side-sch-cont"><ScheduleSide /></div>
      </div>

    </div >

  )
}

export default Schedules
