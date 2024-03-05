import React, { useContext, useEffect, useState } from 'react'
import './EventModal.css'
import GlobalContext from '../../context/GlobalContext'

const labelClasses = ["#ff2300", "#e77c74", "#ffe227", "#32b67a", "#039be6", "#7986cc"];

const EventModal = () => {

    const { setShowEventModal, daySelected, dispatchCalEvent, selectedEvent } = useContext(GlobalContext);

    const [activeBtn, setActiveBtn] = useState('Event');
    const [etitle, setETitle] = useState(selectedEvent ? selectedEvent.etitle : "");
    const [edescription, setEDescription] = useState(selectedEvent ? selectedEvent.edescription : "");
    const [slctedLbl, setSlctedLbl] = useState(selectedEvent ? labelClasses.find((lbl) => lbl === selectedEvent.label) : labelClasses[0]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const calendarEvent = {
            etitle,
            edescription,
            label: slctedLbl,
            day: daySelected.valueOf(),
            id: selectedEvent ? selectedEvent.id : Date.now()
        }
        if (selectedEvent) {
            dispatchCalEvent({ type: 'update', payload: calendarEvent });
        } else {
            dispatchCalEvent({ type: 'push', payload: calendarEvent });
        }
        setShowEventModal(false);
    }

    const preventDef = (event) => {
        event.preventDefault();
    }

    return (
        <div className='event-modal-container'>
            <form className='modal-form-cont' onSubmit={preventDef}>
                <div className='hedr'>
                    <div className='lst-icons'>
                        <i className="fa-solid fa-bars"></i>
                        {selectedEvent && (
                            <i onClick={() => {
                                dispatchCalEvent({ type: "delete", payload: selectedEvent });
                                setShowEventModal(false);
                            }} className="fa-solid fa-trash"></i>
                        )}
                    </div>
                    <i onClick={() => setShowEventModal(false)} className="fa-solid fa-xmark"></i>
                </div>
                <div className="midsec-evnt">
                    <input type="text"
                        id='event-title'
                        value={etitle}
                        onChange={(e) => setETitle(e.target.value)}
                        placeholder='Enter Event/Task Title'
                        required />
                    <div className="btn-evnt-task-set">
                        <button className={activeBtn === 'Event' ? 'btnAct' : ''}
                            id='evntbtnL'
                            onClick={() => setActiveBtn('Event')}>Event</button>
                        <button className={activeBtn === 'Task' ? 'btnAct' : ''}
                            id='tskbtnR'
                            onClick={() => setActiveBtn('Task')}>Task</button>
                        <div className="pert-day">
                            <i className="fa-regular fa-clock"></i>
                            <p>{daySelected.format("dddd, MMMM DD")}</p>
                        </div>
                    </div>
                    <hr id='hr-footer' />

                    <div className="desc-segmnt">
                        <i className="fa-solid fa-align-left"></i>
                        <textarea name="description"
                            placeholder='Description'
                            id="descrptn"
                            cols="30"
                            rows="10"
                            value={edescription}
                            onChange={(e) => setEDescription(e.target.value)}></textarea>
                    </div>
                    <div className="tsk-label">
                        <i className="fa-solid fa-tags"></i>
                        <div className="lbl-set">
                            {labelClasses.map((lblcolor, i) => (
                                <button key={i}
                                    onClick={() => setSlctedLbl(lblcolor)}
                                    style={{ backgroundColor: lblcolor }}>
                                    {slctedLbl === lblcolor && (
                                        <i className="fa-solid fa-check"></i>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="foot">
                        <hr id='hr-footer' />
                        <div className="formfter-sec">
                            <button type='submit'
                                onClick={handleSubmit}>Save</button>
                        </div>
                    </div>
                </div>
            </form >
        </div >
    )
}

export default EventModal
