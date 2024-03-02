import React, { useContext } from 'react'
import './EventModal.css'
import GlobalContext from '../../context/GlobalContext'

const EventModal = () => {

    const { setShowEventModal } = useContext(GlobalContext);

    return (
        <div className='event-modal-container'>
            <form className='modal-form-cont' >
                <div className='hedr'>
                    <i className="fa-solid fa-bars"></i>
                    <i onClick={() => setShowEventModal(false)} className="fa-solid fa-x"></i>
                </div>
            </form>
        </div>
    )
}

export default EventModal
