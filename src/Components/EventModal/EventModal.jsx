import React, { useContext, useState } from 'react'
import './EventModal.css'
import GlobalContext from '../../context/GlobalContext'

const labelClasses = ["#d50100", "#e77c74", "#f6bf26", "#32b67a", "#039be6", "#7986cc"];

const EventModal = () => {

    const { setShowEventModal, daySelected } = useContext(GlobalContext);
    const [activeBtn, setActiveBtn] = useState('Event');

    const handleFormSubmit = (event) => {
        event.preventDefault();
    }

    const [etitle, setETitle] = useState('');
    const [edescription, setEDescription] = useState('');
    const [slctedLbl, setSlctedLbl] = useState(labelClasses[0]);

    return (
        <div className='event-modal-container'>
            <form className='modal-form-cont' onSubmit={handleFormSubmit}>
                <div className='hedr'>
                    <i className="fa-solid fa-bars"></i>
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
                        <i class="fa-solid fa-tags"></i>
                        <div className="lbl-set">
                            {labelClasses.map((lblcolor, i) => (
                                <button key={i}
                                    onClick={() => setSlctedLbl(lblcolor)}
                                    style={{ backgroundColor: lblcolor }}>
                                    {slctedLbl === lblcolor && (
                                        <i class="fa-solid fa-check"></i>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="foot">
                        <hr id='hr-footer' />
                        <div className="formfter-sec">
                            <button type='submit'>Save</button>
                        </div>
                    </div>
                </div>
            </form >
        </div >
    )
}

export default EventModal
