import React, { useContext, useEffect, useState } from 'react'
import './MonthDay.css'
import dayjs from 'dayjs'
import GlobalContext from '../../context/GlobalContext'

const MonthDay = ({ day, rowIdx }) => {
    const { setDaySelected, setShowEventModal, savedEvents } = useContext(GlobalContext);
    const [dayEvents, setDayEvents] = useState([]);

    useEffect(() => {
        const events = savedEvents.filter(evt => dayjs(evt.day).format("DD-MM-YY") === day.format("DD-MM-YY"));
        setDayEvents(events)
    }, [savedEvents, day])

    const getCurrentDayClass = () => {
        return day.format("DD-MM-YY") === dayjs().format("DD-MM-YY") ? 'current-day' : '';
    }

    const dayCLick = (day) => {
        setDaySelected(day);
        setShowEventModal(true);
    }

    return (
        <div className='day-cell' onClick={() => dayCLick(day)}>
            <p id='datenum' className={`${getCurrentDayClass()}`}>{day.format("DD")}</p>
            {dayEvents.map((evt, idx) => (
                <div key={idx} className="evnt-lb" style={{ backgroundColor: evt.label }}>
                    {evt.etitle}
                </div>
            ))}
        </div>
    )
}

export default MonthDay
