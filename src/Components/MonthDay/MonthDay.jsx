import React from 'react'
import './MonthDay.css'
import dayjs from 'dayjs'

const MonthDay = ({ day, rowIdx }) => {

    const getCurrentDayClass = () => {
        return day.format("DD-MM-YY") === dayjs().format("DD-MM-YY") ? 'current-day' : '';
    }

    return (
        <div className='day-cell'>
            {/* {rowIdx === 0 && (
                <p id='dayname'>{day.format("ddd").toUpperCase()}</p>
            )} */}
            <p id='datenum' className={`${getCurrentDayClass()}`}>{day.format("DD")}</p>
        </div>
    )
}

export default MonthDay
