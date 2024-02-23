import React from 'react'
import './AssignTask.css'

const AssignTask = () => {
    return (
        <div className='assign-task-container'>
            <div className="row1-assign-header">
                <h1>Add Task</h1>
                <button>Close</button>
            </div>

            <div className="row2-divider">
                <h2>.</h2>
            </div>

            <div className="row3-assign-form">
                <div className="input-elems">
                    <label>Title</label>
                    <input type="text" name="title" id="title" placeholder='Task Title' />
                    <label>Title</label>
                    <input type="text" name="title" id="title" placeholder='Task Title' />
                </div>
            </div>
        </div>
    )
}

export default AssignTask
