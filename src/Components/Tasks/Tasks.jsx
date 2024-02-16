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
                </div>

                <div className="row3-task-table">
                    <table id='table-setting'>
                        <thead id='table-heading'>
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
                        <tbody id='table-elements'>
                            <tr>
                                <td>01</td>
                                <td>Test Task</td>
                                <td>Lorem ipsum, dolor sit amet consectetur adipisicing elit. </td>
                                <td>E Commerce Manager</td>
                                <td>2/15/2024</td>
                                <td>2/18/2024</td>
                                <td><span className='status-ico'><i class="fa-solid fa-circle-check"></i></span></td>
                                <td>
                                    <span className='action-btn'>
                                        <i id='edit-btn' class="fa-solid fa-pen-to-square"></i>
                                        <br />
                                        <i id='delete-btn' class="fa-solid fa-trash"></i>
                                    </span>
                                </td>
                            </tr>
                            <tr>
                                <td>02</td>
                                <td>Aperiam quia autem earum, maiores, non at optio doloribus, accusantium culpa esse sint</td>
                                <td>Nihil nulla minus at, ab illo laborum tempora praesentium earum totam aspernatur quasi obcaecati</td>
                                <td>Manager</td>
                                <td>2/16/2024</td>
                                <td>2/17/2024</td>
                                <td><span className='status-ico'><i class="fa-solid fa-bars-progress"></i></span></td>
                                <td>
                                    <span className='action-btn'>
                                        <i id='edit-btn' class="fa-solid fa-pen-to-square"></i>
                                        <br />
                                        <i id='delete-btn' class="fa-solid fa-trash"></i>
                                    </span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Tasks
