import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
interface Application {
    id: number,
    submitted_by: string,
    course_name: string,
    created_at: Date,
    exam_status: Status[],
    interview_status: Status[],
    status: Status[],
}

interface Status {
    at: Date,
    by: string,
    status: string
}
const Applicaions: React.FC = () => {
    const [applications, setApplications] = useState<Application[]>([])
    const loadApplications = async () => {
        try {
            let response = await fetch(`http://localhost:5000/api/v1/applications/`,
                { credentials: "include" }
            )
            let data = await response.json()
            setApplications(data.applications)
        }
        catch {
            alert('Error connecting to server')
        }
    }
    useEffect(() => {
        loadApplications()
    }, [])
    return (
        <div className='form-container'>
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
                    {applications.map((application) => (
                        <tr key={application.id}>
                            <td>{application.course_name}</td>
                            <td >{new Date(application?.created_at).toLocaleString().split(',')[0]}</td>
                            <td>{application.exam_status[application.exam_status.length - 1].status}</td>
                            <td>{application.interview_status[application.interview_status.length - 1].status}</td>
                            <td>{application.status[application.status.length - 1].status}</td>
                            {/* <td>{application.status}</td> */}
                            <td>
                                <Link to={`/applications/${application.id}`}>Review</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>)
}

export default Applicaions;