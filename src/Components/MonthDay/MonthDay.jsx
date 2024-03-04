import React, { useContext } from 'react'
import './MonthDay.css'
import dayjs from 'dayjs'
import GlobalContext from '../../context/GlobalContext'

const MonthDay = ({ day, rowIdx }) => {

    const getCurrentDayClass = () => {
        return day.format("DD-MM-YY") === dayjs().format("DD-MM-YY") ? 'current-day' : '';
    }

    const { setDaySelected, setShowEventModal } = useContext(GlobalContext);

    const dayCLick = (day) => {
        setDaySelected(day);
        setShowEventModal(true);
    }

    return (
        <div className='day-cell' onClick={() => dayCLick(day)}>
            <p id='datenum' className={`${getCurrentDayClass()}`}>{day.format("DD")}</p>
        </div>
    )
}

export default MonthDay
