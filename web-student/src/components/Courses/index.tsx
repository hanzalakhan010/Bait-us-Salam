import React, { useEffect, useState } from 'react';
import { host } from '../../constants';
import { notifyError } from '../../notification';
import './styles.css'

interface Course {
    id: number,
    course_name: string
}
// {'id': 4, 'title': 'Best', 'timings': [{'day': 'Monday', 'timings': {'start': '11:11', 'end': '11:11'}}]}}]
interface Timing {
    day: string,
    timings: {
        start: string,
        end: string
    }
}
interface Section {
    id: number,
    title: string,
    timings: Timing[]
}
interface CourseSection {
    course: Course,
    section: Section,
}
interface Student {
    id: number,
    email: string,
}
const Courses: React.FC = () => {
    const [enrolledSections, setEnrolledSection] = useState<CourseSection[]>([])
    const student: Student = localStorage.getItem('student') ? JSON.parse(localStorage.getItem('student') as string) : null;


    const loadCourses = async () => {
        try {
            let response = await fetch(`${host}/api/v1/students/${student.id}/enrolled_courses`,
                { credentials: 'include' })
            let data = await response.json()
            if (response.ok) {
                setEnrolledSection(data.courses)
            }
            else {
                notifyError(data.error)
            }
        } catch {
            notifyError('Error connecting to server')
        }


    }
    useEffect(() => {
        loadCourses()
    }, [])
    return (
        <div>
            <h1>Enrolled Courses</h1>
            {enrolledSections.map((enrolledSection, index) => (
                <div key={index} className='courseDiv'>
                    <h2>Course: {enrolledSection.course.course_name}</h2>
                    <h3>Section: {enrolledSection.section.title}</h3>
                    <div>
                        {enrolledSection.section.timings.map((timing, index_) => (<div key={index_}>
                            <p>Day:{timing.day}</p>
                            <p>Start:{timing?.timings?.start}</p>
                            <p>End:{timing?.timings?.end}</p>
                        </div>))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Courses;