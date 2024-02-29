import React, { useContext, useEffect, useState } from 'react'
import './Schedules.css'
import { getMonth } from '../Assets/util'
import CalendarMonth from '../CalendarMonth/CalendarMonth'
import ScheduleSide from '../ScheduleSide/ScheduleSide'
import GlobalContext from '../../context/GlobalContext'
import dayjs from 'dayjs'

const Schedules = ({ activeNavElem }) => {

  const [currentMonth, setCurrentMonth] = useState(getMonth())
  const { monthIndex, setMonthIndex } = useContext(GlobalContext)

  const handlePrevMonth = () => {
    setMonthIndex(monthIndex - 1);
  }

  const handleNextMonth = () => {
    setMonthIndex(monthIndex + 1);
  }

  const handleResetMonth = () => {
    setMonthIndex(dayjs().month());
  }

  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex));
  }, [monthIndex])

  return (
    <div className='schedule-container'>
      <div className="row1-schedule-header">
        <h1>{dayjs(new Date(dayjs().year(), monthIndex)).format("MMMM YYYY")}</h1>
        <div className="calendar-navset">
          <i onClick={handlePrevMonth} class="fa-solid fa-angle-left monthnav"></i>
          <i onClick={handleNextMonth} class="fa-solid fa-angle-right monthnav"></i>
          <button onClick={handleResetMonth}>Today</button>
        </div>
      </div>

      <div className="row2-divider">
        <h2>.</h2>
      </div>

      <div className="row3-schedule-container">
        <div className="left-side-sch-cont"><CalendarMonth month={currentMonth} /></div>
        <div className="right-side-sch-cont"><ScheduleSide /></div>
      </div>

    </div >

  )
}

export default Schedules
