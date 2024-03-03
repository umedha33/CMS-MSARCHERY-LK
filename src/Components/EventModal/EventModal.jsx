import React, { useContext, useState } from 'react'
import './EventModal.css'
import GlobalContext from '../../context/GlobalContext'

const EventModal = () => {

    const { setShowEventModal } = useContext(GlobalContext);
    const [activeBtn, setActiveBtn] = useState('Event');

    const handleFormSubmit = (event) => {
        event.preventDefault(); 
    }
    return (
        <div className='event-modal-container'>
            <form className='modal-form-cont' onSubmit={handleFormSubmit}>
                <div className='hedr'>
                    <i className="fa-solid fa-bars"></i>
                    <i onClick={() => setShowEventModal(false)} className="fa-solid fa-xmark"></i>
                </div>
                <div className="midsec-evnt">
                    <input type="text" id='event-title' placeholder='Enter Event/Task Title' />
                    <div className="btn-evnt-task-set">
                        <button className={activeBtn === 'Event' ? 'btnAct' : ''} id='evntbtnL' onClick={() => setActiveBtn('Event')}>Event</button>
                        <button className={activeBtn === 'Task' ? 'btnAct' : ''} id='tskbtnR' onClick={() => setActiveBtn('Task')}>Task</button>
                    </div>
                    {/* event title */}
                    {/* event date */}
                    {/* event label */}
                    {/* event description */}
                    {/* event description */}
                </div>
            </form>
        </div>
    )
}

export default EventModal
