import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { loadCourses } from '../../api/courses'
import { loadApplications } from '../../api/applications'
interface Application {
    id: number,
    submitted_by: string,
    course_name: string,
    created_at: Date,
    exam_status: Status,
    interview_status: Status,
    status: Status,
}

interface Status {
    at: Date,
    by: string,
    status: string
}
interface Course {
    id: number,
    course_name: string
}

interface Filter {
    course_id?: string,
    interview_status?: string,
    exam_status?: string,
    application_status?: string,
}
const Applicaions: React.FC = () => {
    const [applications, setApplications] = useState<Application[]>([])
    const [courses, setCourses] = useState<Course[]>([])
    const [filters, setFilters] = useState<Filter>({})
    // const loadApplications = async () => {
    //     try {
    //         let response = await fetch(`http://localhost:5000/api/v1/applications?status=Pending`,
    //             { credentials: "include" }
    //         )
    //         let data = await response.json()
    //         setApplications(data.applications)
    //     }
    //     catch {
    //         alert('Error connecting to server')
    //     }
    // }
    const fetchApplications = async () => {
        let applications = await loadApplications({ "status": "Pending", ...filters })
        setApplications(applications)
    }
    const fetchCourses = async () => {
        let courses = await loadCourses({ status: 'open_to_application' })
        setCourses(courses)
    }
    useEffect(() => {
        fetchApplications()
        fetchCourses()
    }, [filters])
    return (
        <div className='form-container'>
            <div className="header">
                <h2 className="form-title">Applicaions</h2>
            </div>
            <h4>{applications.length == 0 && 'No Pending application'}</h4>
            <div id='filterDiv'>
                <div>
                    <h6>Filter by Course</h6>
                    {courses.map((course, index) => (
                        <label key={index}>
                            <input type='radio' name='courseFilter' value={course.id}
                                checked={filters.course_id == course.id.toString()}
                                onChange={(e) => {
                                    setFilters({ ...filters, course_id: e.target.value })
                                }} />
                            {course.course_name}
                        </label>
                    ))}
                    <div>
                        <button onClick={() => {
                            delete filters['course_id']
                            setFilters(filters)
                        }}>Clear Filter</button>
                    </div>
                </div>
                <div>
                    <h6>Filter by Status</h6>

                </div>

            </div>
            {applications.length == 0 && (
                <h3>No applications</h3>
            )}
            <table className="table">
                <thead>
                    <tr>
                        <th><input type='checkbox' /></th>
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
                            <td><input type="checkbox" /></td>
                            <td>{application.course_name}</td>
                            <td >{new Date(application?.created_at).toLocaleString().split(',')[0]}</td>
                            <td>{application.exam_status?.status}</td>
                            <td>{application.interview_status?.status}</td>
                            <td>{application.status?.status}</td>
                            <td>
                                <Link to={`/applications/${application.id}`}>Review</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div >)
}

export default Applicaions;