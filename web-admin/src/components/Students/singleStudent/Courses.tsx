import React from 'react'

const Courses: React.FC = () => {
    return (
    <div className='form-container'>
        <div className="section">
            <div className="header">
                <h2 className="form-title">Courses Enrolled</h2>
            </div>

            <table className="table">
                <thead>
                    <tr>
                        <th>Course</th>
                        <th>Section</th>
                        <th>Instructor</th>
                        <th>Timings</th>
                    </tr>
                </thead>
                <tbody id="body">
                   {}
                </tbody>
            </table>
        </div>

    </div>)
}

export default Courses;