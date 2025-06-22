import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { notifyError, notifySuccess } from '../../notification';
import { host } from '../../constants';
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
interface Student {
    id: number,
    email: string,
}
const Apply: React.FC = () => {
    const { course_id } = useParams()
    const [selectedCourse, setSelectedCourse] = useState<Course | null>()
    const [requirements, setRequirements] = useState<Requirements[]>([])
    const student: Student = localStorage.getItem('student') ? JSON.parse(localStorage.getItem('student') as string) : null;

    const loadSelectedCourse = async (course_id: number) => {
        setRequirements([])
        try {

            let response = await fetch(`${host}/api/v1/courses/${course_id}/details`,
                {
                    credentials: 'include'
                }
            )
            let data = await response.json()
            if (response.status == 200) {
                setSelectedCourse(data.course)
                setRequirements(data.course.requirements)
            }
            else {
                notifyError(data.error)
            }
        } catch {
            notifyError("Error connecting to server")
        }

    }
    const apply = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (selectedCourse?.id && student) {
            try {

                let formData = new FormData(event.currentTarget)
                // console.log(formData)
                let response = await fetch(`${host}/api/v1/students/${student.id}/applications/`, {
                    credentials:'include',
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
            } catch {
                notifyError('Error connecting to server')
            }
        }
    }
    useEffect(() => {
        if (course_id) {
            loadSelectedCourse(parseInt(course_id))
        }
    }, [])
    return (
        <div>
            <h1>Apply for { }</h1>
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

export default Apply;