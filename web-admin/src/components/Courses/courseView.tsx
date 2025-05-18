import React, { useState } from "react"
import { useParams } from "react-router-dom"

interface Section {
    title: string,
    intructor: string,
}

interface Course {
    course_name: string,
    course_description: string
    sections?: Section[]

}
const CourseView: React.FC = () => {
    const { id } = useParams()
    const [course, setCourse] = useState<Course>({
        course_name: '',
        course_description: '',

    })
    const loadCourse = async () => {
        let response = await fetch(`http://localhost:5000/api/v1/courses/${id}`)
    }
    return (
        <div>
            <h2>{course.course_name}</h2>

        </div>
    )
}

export default CourseView