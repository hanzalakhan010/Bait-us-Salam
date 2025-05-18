import React, { useState } from "react"
import { useParams } from "react-router-dom"

interface Sections{
    title:string,
    intructor:string,
}

interface Course {
    course_name: string,
    course_description: string

}
const CourseView: React.FC = () => {
    const { id } = useParams()
    const [course, setCourse] = useState<Course>({
        course_name: '',
        course_description: ''
    })
    return (
        <div>
            <h2></h2>
        </div>
    )
}

export default CourseView