import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import './styles.css'

interface Course {
    course_name: string,
    course_description: string

}
const EditDetails: React.FC = () => {
    const { id } = useParams()
    const [course, setCourse] = useState<Course>({
        course_name: '',
        course_description: '',
    })
    const loadCourse = async () => {
        let response = await fetch(`http://localhost:5000/api/v1/courses/${id}`)
        let data = await response.json()
        console.log(data.course)
        setCourse(data.course)
    }
    useEffect(() => {
        loadCourse()
    }, [])
    return (
        <div >
            <h2>Course Name : <i><span>{course.course_name}</span></i></h2>
            <p>Course Description : <i><span>{course.course_description}</span></i></p>
        </div>
    )
}

export default EditDetails