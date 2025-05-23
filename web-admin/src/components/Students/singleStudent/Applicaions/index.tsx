import React from 'react'

const Applicaions: React.FC = () => {
    return (
        <div className='form-container'>
            <div className="section">
                <div className="header">
                    <h2 className="form-title">Applicaions</h2>
                </div>

                <table className="table">
                    <thead>
                        <tr>
                            <th>Course</th>
                            <th>Date Applied</th>
                            <th>Exam Status</th>
                            <th>Interview Status</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody id="body">
                        { }
                    </tbody>
                </table>
            </div>

        </div>)
}

export default Applicaions;