import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

interface Course {
    course_description: string,
    course_name: string,
    id: number,
    status: string
}

const AddApplication: React.FC = () => {
    const { id } = useParams()
    const [available_courses, setAvailable_courses] = useState<Course[]>([])
    const [selectedCourse, setSelectedCourse] = useState<Course | null>()
    const loadAvailableCourse = async () => {
        let response = await fetch(`http://localhost:5000/api/v1/students/${id}/available_courses`)
        let data = await response.json()
        console.log(data)
        setAvailable_courses(data.courses)
    }
    useEffect(() => {
        loadAvailableCourse()
    }, [selectedCourse])
    return (
        <div>
            <h1>Apply for Course</h1>
            <select
                onChange={(e) => {
                    const selected = available_courses.find((course) => course.id == parseInt(e.target.value));
                    console.log(selected)
                    if (selected) {
                        setSelectedCourse(selected);
                    }
                }}>
                <option>Select Course</option>
                {available_courses.map((available_course) => (<option value={available_course.id}
                    key={available_course.id}>{available_course.course_name}</option>))}
            </select>
            <div>
                {selectedCourse ? (
                    <>
                        <p><i>Course Name: </i>{selectedCourse.course_name}</p>
                        <p><i>Description: </i>{selectedCourse.course_description}</p>
                        <p><i>Course Status: </i>{selectedCourse.status}</p>
                    </>
                ) : null
                }
            </div>
            <button>Apply</button>
        </div>
    );
};

export default AddApplication;