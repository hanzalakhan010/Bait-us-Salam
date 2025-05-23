import React, { useState } from "react"
import './styles.css'
import EditDetails from "./EditDetails"
import CourseSections from "./CourseSections"

const CourseView: React.FC = () => {
    const [tab, setTab] = useState('editDetails')
    return (
        <div id='course'>
            <div id='courseNav'>
                <button onClick={() => { setTab('editDetails') }}>Edit Details</button>
                <button onClick={() => { setTab('sections') }}>Sections</button>
                <button onClick={() => { setTab('') }}>Edit Details</button>
            </div>
            <div id='courseTab'>
                {tab == 'editDetails' ? <EditDetails /> : null}
                {tab == 'sections' ? <CourseSections /> : null}
            </div>
        </div>
    )
}

export default CourseView