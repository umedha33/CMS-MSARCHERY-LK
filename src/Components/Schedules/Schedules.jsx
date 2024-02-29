import React, { useState } from 'react'
import './Schedules.css'
import { getMonth } from '../Assets/util'
import CalenderHeader from '../CalenderHeader/CalenderHeader'
import CalendarMonth from '../CalendarMonth/CalendarMonth'
import ScheduleSide from '../ScheduleSide/ScheduleSide'

const Schedules = ({ activeNavElem }) => {
  const [currentMonth, setCurrentMonth] = useState(getMonth())

  return (
    // <div>
    //   <h1>Schedules</h1>
    //   <p>personal calendar which can be used to add important tasks.</p>
    //   <p>should display available tasks as well.</p>
    //   <p>should notify upcoming and due tasks.</p>
    //   <p>pending task cards</p>
    // </div>

    <div className='assign-task-container'>
      <div className="row1-assign-header">
        <h1>Schedules</h1>
        <div className="button-set">
          <button id='add-btn'>abc</button>
          <button id='close-btn' onClick={() => { activeNavElem('Tasks'); }}>xyz</button>
        </div>
      </div>

      <div className="row2-calendar-header">
        <CalenderHeader />
      </div>

      <div className="row3-schedule-container">
        <div className="left-side-sch-cont"><CalendarMonth month={currentMonth} /></div>
        <div className="right-side-sch-cont"><ScheduleSide /></div>
      </div>
      
    </div >

  )
}

export default Schedules
