import React, { useEffect, useState } from 'react';
import { loadCourses } from '../../api/courses';
import { loadSectionsByCourse } from '../../api/sections'

interface Course {
    id: number,
    course_name: string
}
interface Section {
    id: number,
    title: string
}

interface Session {
    course_id: number,
    section_id: number,
    topic: string,
    instructor_notes: string,
    status: "Completed" | 'Cancelled' | "Scheduled"
}
const AddSession: React.FC = () => {
    const [courses, setCourses] = useState<Course[]>([])
    const [sections, setSections] = useState<Section[]>([])
    const [sessionDetails, setSessionDetails] = useState<Session>({
        course_id: 0,
        section_id: 0,
        topic: '',
        instructor_notes: '',
        status: "Scheduled"
    });
    // const loadCourses = async () => {
    //     try {
    //         let reponse = await fetch('http://localhost:5000/api/v1/courses?status=running',
    //             { credentials: "include" })
    //         if (reponse.status == 200) {
    //             let data = await reponse.json()
    //             setCourses(data.courses)
    //             console.log(data)
    //         }
    //     }
    //     catch {
    //         alert('Error connecting to server')
    //     }

    // }
    const fetchCourses = async () => {
        let courses = await loadCourses({ status: 'running' })
        setCourses(courses)
    }
    // const loadSectionsByCourse = async (course_id: number) => {
    //     let response = await fetch(`http://localhost:5000/api/v1/courses/${course_id}/sections?size=short`, {
    //         credentials: 'include'
    //     })
    //     if (response.status == 200) {
    //         let data = await response.json()
    //         setSections(data.sections)
    //         console.log(data)
    //     }

    // }
    const fetchSections = async (course_id: number) => {
        let sections = await loadSectionsByCourse(course_id, { 'size': 'short' })
        setSections(sections)
    }

    useEffect(() => {
        fetchCourses()
    }, [])
    return (
        <>
            <h1>Add Session</h1>
            <div id='addSessionDiv'>
                <div>

                    <div>
                        <h4>Select Course</h4>
                        <select value={sessionDetails?.course_id} onChange={(e) => {
                            setSessionDetails({ ...sessionDetails, course_id: parseInt(e.target.value) })
                            fetchSections(parseInt(e.target.value))
                        }}>
                            <option>Select Course</option>
                            {courses.map((course) => <option value={course.id} key={course.id}>{course.course_name}</option>)}
                        </select>
                    </div>
                    <div>
                        <h4>Select Section</h4>
                        <select>
                            <option>Select Section</option>
                            {sections.map((section) => <option key={section.id} value={section.id}>{section.title}</option>)}
                        </select>
                    </div>
                    <div>
                        <h4>Topic</h4>
                        <input placeholder='Topic' value={sessionDetails.topic}
                            onChange={(e) => { setSessionDetails({ ...sessionDetails, topic: e.target.value }) }}
                        />
                    </div>
                </div>
                <div>
                    <h4>Instructor Notes</h4>
                    <textarea value={sessionDetails.instructor_notes}
                        onChange={(e) => { setSessionDetails({ ...sessionDetails, instructor_notes: e.target.value }) }}

                    />
                </div>
                <div>
                    <h4>Status</h4>
                    <select value={sessionDetails.status}
                        onChange={(e) => { setSessionDetails({ ...sessionDetails, status: e.target.value as "Completed" | "Cancelled" | "Scheduled" }) }}
                    >
                        <option value='Scheduled'>Scheduled</option>
                        <option value='Completed'>Completed</option>
                        <option value='Cancelled'>Cancelled</option>
                    </select>
                </div>
                <div>
                    <button>Save    </button>
                </div>
            </div>
        </>
    );
};

export default AddSession;