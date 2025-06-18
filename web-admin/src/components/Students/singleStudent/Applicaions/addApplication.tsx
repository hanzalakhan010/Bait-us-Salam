import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { notifyError } from '../../../../notifications';
import { notifySuccess } from '../../../../notifications';
interface Requirements {
    id: number,
    field_key: string,
    type: "file" | "text" | "textarea" | "date" | "number" | "email" | "tel" | "url";
    label: string,
    description: string,
    required: boolean,
    error?: string,
    value: any
}
interface Course {
    course_description: string,
    course_name: string,
    id: number,
    status: string,
    requirements: Requirements[]
}

const AddApplication: React.FC = () => {
    const { id } = useParams()
    const [available_courses, setAvailable_courses] = useState<Course[]>([])
    const [selectedCourse, setSelectedCourse] = useState<Course | null>()
    const [requirements, setRequirements] = useState<Requirements[]>([])


    const loadSelectedCourse = async (course_id: number) => {
        setRequirements([])
        let response = await fetch(`http://localhost:5000/api/v1/courses/${course_id}/details`,
            {
                credentials: 'include'
            }
        )
        let data = await response.json()
        if (response.status == 200) {
            setSelectedCourse(data.course)
            setRequirements(data.course.requirements)
        }

    }

    const loadAvailableCourse = async () => {
        let response = await fetch(`http://localhost:5000/api/v1/students/${id}/available_courses`)
        let data = await response.json()
        setAvailable_courses(data.courses)
    }
    const apply = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        console.log(selectedCourse)
        if (selectedCourse?.id) {
            let formData = new FormData(event.currentTarget)
            // console.log(formData)
            let response = await fetch(`http://localhost:5000/api/v1/students/${id}/applications/`, {
                method: "POST",
                headers: { "Course-Id": selectedCourse.id.toString() },
                body: formData
            })
            let data = await response.json()
            if (response.status == 201) {
                notifySuccess(data.message)
            } else {
                notifyError(data.error)
            }
        }
    }
    useEffect(() => {
        loadAvailableCourse()
    }, [])
    return (
        <div>
            <h1>Apply for Course</h1>
            <select
                onChange={(e) => {
                    loadSelectedCourse(parseInt(e.target.value))
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
                        <div>
                            <form onSubmit={
                                apply
                            }>
                                {requirements?.length ? (
                                    <>
                                        <h3>Requirements</h3>
                                        {requirements?.map((req, index) => (
                                            <div key={index}>
                                                <p>Required: {req.label}</p>
                                                <input type={req.type} placeholder={req.label}
                                                    accept='image/*'
                                                    // value={req.value}
                                                    name={req.field_key}
                                                    required={req.required}
                                                // onChange={(e) => handleRequirementChange(index, e.target.value)}
                                                />
                                                <p><i>{req.description}</i></p>
                                            </div>
                                        ))}
                                    </>
                                ) : <h3>No additional requirements</h3>}
                                {selectedCourse ? (
                                    <input type='submit' value='Apply'></input>
                                ) : null}
                            </form>

                        </div>
                    </>
                ) : null
                }
            </div>
        </div>
    );
};

export default AddApplication;