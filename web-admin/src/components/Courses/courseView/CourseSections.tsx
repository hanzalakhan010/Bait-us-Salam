import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import AddSection from "./addSection"
import './styles.css'
interface Section {
    title: string,
    instructor_name: string,
    enrollment_count: number
}

// interface Course {
//     course_name: string,
//     course_description: string
//     sections: Section[]

// }
const CourseSections: React.FC = () => {
    const { id } = useParams()
    const [addSection, setAddSection] = useState(false)
    const [sections, setSection] = useState<Section[]>(
        [])
    const loadSections = async () => {
        let response = await fetch(`http://localhost:5000/api/v1/courses/${id}/sections`)
        let data = await response.json()
        console.log(data)
        setSection(data.sections)
    }
    useEffect(() => {
        loadSections()
    }, [])
    return (
        // <div id='course'>
            <div id='sections'>
                <button
                    onClick={() => { setAddSection(!addSection) }}
                    style={{ backgroundColor: addSection ? 'red' : '#007bff' }}>{addSection ? "Cancel" : "+ Add Section"}</button>
                {addSection ? <AddSection setAddSection={setAddSection} /> : null}
                <h2>Sections</h2>
                {sections.map((section) => (<div>
                    <h3>{section.title}</h3>
                    <p>Instructor: {section.instructor_name}</p>
                    <p>Enrollments:{section.enrollment_count}</p>

                </div>))}
            </div>

        // </div>
    )
}

export default CourseSections;