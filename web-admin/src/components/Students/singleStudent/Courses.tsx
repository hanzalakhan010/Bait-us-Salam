import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

const Courses: React.FC = () => {
    const { id } = useParams()
    const loadCourses = async () => {
        let response = await fetch(`http://localhost:5000/api/v1/students/${id}/enrolled_courses`)
        let data = await response.json()
        console.log(data)
    }
    useEffect(() => {
        loadCourses()
    }, [])
    return (
        <div>
            <h2 className="form-title">Courses Enrolled</h2>
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
                    { }
                </tbody>
            </table>

        </div>)
}

export default Courses;