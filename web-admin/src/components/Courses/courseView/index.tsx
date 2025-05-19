import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import './styles.css'
import AddSection from "./addSection"
interface Section {
    title: string,
    intructor: string,
}

interface Course {
    course_name: string,
    course_description: string
    sections: Section[]

}
const CourseView: React.FC = () => {
    const { id } = useParams()
    const [addSection, setAddSection] = useState(false)
    const [course, setCourse] = useState<Course>({
        course_name: '',
        course_description: '',
        sections: []
    })
    const loadCourse = async () => {
        let response = await fetch(`http://localhost:5000/api/v1/courses/${id}`)
        let data = await response.json()
        console.log(data)
        setCourse(data.course)
    }
    useEffect(() => {
        loadCourse()
    }, [])
    return (
        <div id='course'>
            <h2>{course.course_name}</h2>
            {/* {course.sections} */}
            <div id='sections'>
                <button
                    onClick={() => { setAddSection(!addSection) }}
                    style={{ backgroundColor: addSection ? 'red' : '#007bff' }}>{addSection ? "Cancel" : "+ Add Section"}</button>
                {addSection ? <AddSection /> : null}
                <h2>Sections</h2>
                {course.sections.map((section) => (<div>
                    <h3>{section.title}</h3>
                    <p>Instructor: {section.intructor}</p>
                </div>))}
            </div>

        </div>
    )
}

export default CourseView