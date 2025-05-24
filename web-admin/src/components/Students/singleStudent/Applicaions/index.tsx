import React, { useEffect, useState } from 'react'
import { useParams, } from 'react-router-dom'
import AddApplication from './addApplication'

const Applicaions: React.FC = () => {
    const { id } = useParams()
    const [addApplication, setAddApplication] = useState(false)
    const loadApplications = async () => {
        let response = await fetch(`http://localhost:5000/api/v1/students/${id}/applications`)
        let data = await response.json()
        console.log(data)
    }
    useEffect(() => {
        loadApplications()
    }, [])
    return (
        <div className='form-container'>
            <div className="section">
                <div className="header">
                    <h2 className="form-title">Applicaions</h2>
                </div>
                <button onClick={() => setAddApplication(!addApplication)}>{addApplication ? "Cancel" : "Add Application"}</button>

                {addApplication ? (<AddApplication />) : (
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
                )}
            </div>

        </div>)
}

export default Applicaions;