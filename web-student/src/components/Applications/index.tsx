import React, { useEffect, useState } from 'react';
import { host } from '../../constants';
import { notifyError } from '../../notification';
import { Link } from 'react-router-dom';
interface Status {
    at: Date,
    status: string,
    by: string
}

interface Application {
    id: number,
    course_name: string,
    created_at: Date,
    exam_status: Status,
    interview_status: Status,
    status: Status,
}
interface Student {
    id: number,
    email: string,
}
const Applications: React.FC = () => {
    const [applications, setApplications] = useState<Application[]>([])
    const student: Student = localStorage.getItem('student') ? JSON.parse(localStorage.getItem('student') as string) : null;

    const loadApplications = async () => {
        try {
            let response = await fetch(`${host}/api/v1/students/${student.id}/applications`)
            let data = await response.json()
            if (response.ok) {
                setApplications(data.applications)
            }
        } catch {
            notifyError('Error connecting to server')
        }
    }
    useEffect(() => {
        loadApplications()
    }, [])
    return (
        <div>
            <h1>Applications</h1>
            {applications.length !== 0 ? (
                <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
                    <table style={{ minWidth: "600px", width: "100%" }}>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Course</th>
                                <th>Exam Status</th>
                                <th>Interview Status</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {applications.map((application, index) => (
                                <tr key={index}>
                                    <td>{application.id}</td>
                                    <td>{application.course_name}</td>
                                    <td><i>{application.exam_status.status}</i></td>
                                    <td><i>{application.interview_status.status}</i></td>
                                    <td><i>{application.status.status}</i></td>
                                    <Link to={`/applications/${application.id}`}>View</Link>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (<h4>No applications</h4>)}
        </div>
    );
};

export default Applications;