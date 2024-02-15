import React from 'react'
import './Tasks.css'

const Tasks = () => {
    return (
        <div>
            <div className="tasks-container">
                <div className="row1-task-header">
                    <h1>Tasks</h1>
                    <button>Assign Task</button>
                </div>
                <div className="row2-sort-header">
                    <div className="bread-crum">
                        <h2>All</h2>
                        <h2>Ongoing</h2>
                        <h2>Completed</h2>
                        <h2>Alerts</h2>
                    </div>
                    <div className="task-table">
                        <table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Title</th>
                                    <th>Description</th>
                                    <th>Recipient</th>
                                    <th>Assigned Date</th>
                                    <th>Due Date</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>01</td>
                                    <td>Test Task</td>
                                    <td>This is a test task</td>
                                    <td>E Commerce Manager</td>
                                    <td>2/15/2024</td>
                                    <td>4/15/2024</td>
                                    <td><span>Ongoing</span></td>
                                    <td>
                                        <span>
                                        <i class="fa-solid fa-pen-to-square"></i>
                                        <i class="fa-solid fa-trash"></i>
                                        </span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Tasks
