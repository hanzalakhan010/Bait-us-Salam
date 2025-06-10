import React, { useState } from "react"
import { default as CourseActions, default as CourseSections } from "./CourseSections"
import CourseSessions from "./CourseSessions"
import EditDetails from "./EditDetails"
import './styles.css'

const CourseView: React.FC = () => {
    const [tab, setTab] = useState('editDetails')
    return (
        <div id='course'>
            <div id='courseNav'>
                <button onClick={() => { setTab('editDetails') }}>Edit Details</button>
                <button onClick={() => { setTab('sections') }}>Sections</button>
                <button onClick={() => { setTab('sessions') }}>Sessions</button>
                <button onClick={() => { setTab('announcements') }}>Announcements</button>
                <button onClick={() => { setTab('actions') }}>Actions</button>
            </div>
            <div id='courseTab'>
                {tab == 'editDetails' ? <EditDetails /> : null}
                {tab == 'sections' ? <CourseSections /> : null}
                {tab == 'sessions' ? <CourseSessions /> : null}
                {tab == 'actions' ? <CourseActions /> : null}
                {/* {tab == 'sections' ? <CourseSections /> : null} */}
            </div>
        </div>
    )
}

export default CourseView