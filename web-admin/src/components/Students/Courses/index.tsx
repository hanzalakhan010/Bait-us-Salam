import React from 'react'

const Courses: React.FC = () => {
    return (
    <div className='form-container'>
        <div className="form enrollment-section">
            <div className="enrollment-header">
                <h2 className="form-title">Courses Enrolled</h2>
                <button className="add-btn">+ Add Enrollment</button>
            </div>

            <table className="enrollment-table">
                <thead>
                    <tr>
                        <th>Course</th>
                        <th>Section</th>
                        <th>Instructor</th>
                        <th>Timings</th>
                    </tr>
                </thead>
                <tbody id="enrollment-body">
                   
                </tbody>
            </table>
        </div>

    </div>)
}

export default Courses;