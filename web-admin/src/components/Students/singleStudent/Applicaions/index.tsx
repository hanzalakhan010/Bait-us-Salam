import React, { useEffect, useState } from 'react'
import { useParams, } from 'react-router-dom'
import AddApplication from './addApplication'

interface Application {
    id: number,
    submitted_by: string,
    course_name: string,
    created_at: string,
    exam_status: string,
    interview_status: string,
    status: string,
}

const Applicaions: React.FC = () => {
    const { id } = useParams()
    const [addApplication, setAddApplication] = useState(false)
    const [applications, setApplications] = useState<Application[]>([])
    const loadApplications = async () => {
        let response = await fetch(`http://localhost:5000/api/v1/students/${id}/applications/`,
            {
                headers: {
                    "Token": localStorage.getItem('token') || '',
                    "Email": localStorage.getItem('email') || ''
                }
            }
        )
        let data = await response.json()
        setApplications(data.applications)
    }
    useEffect(() => {
        loadApplications()
    }, [])
    return (
        <div className='form-container'>
            <div className="header">
                <h2 className="form-title">Applicaions</h2>
                <button onClick={() => setAddApplication(!addApplication)}>{addApplication ? "Cancel" : "Add Application"}</button>
            </div>

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
                        {applications.map((application) => (
                            <tr>
                                <td>{application.course_name}</td>
                                <td >{new Date(application.created_at).toLocaleString().split(',')[0]}</td>
                                <td>{application.exam_status}</td>
                                <td>{application.interview_status}</td>
                                <td>{application.status}</td>
                                <td>
                                    <button>Review</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

        </div>)
}

export default Applicaions;