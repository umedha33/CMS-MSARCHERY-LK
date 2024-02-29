import React from 'react'

const MonthDay = ({ day }) => {
    return (
        <div>
            {day.format()}
        </div>
    )
}

export default MonthDay
