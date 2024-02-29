import React from 'react'
import MonthDay from '../MonthDay/MonthDay'
import './CalendarMonth.css'
const CalendarMonth = ({ month }) => {
    return (
        <div className="month-container">
            {month.map((row, i) => (
                <div key={i}>
                    {row.map((day, idx) => (
                        <MonthDay day={day} key={idx} />
                    ))}
                </div>
            ))}
        </div>
    )
}

export default CalendarMonth
