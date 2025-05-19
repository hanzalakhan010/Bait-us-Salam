import React, { useState } from 'react';
import './newCourse.css';

interface Course {
    course_name: string,
    course_description: string
}

const NewCourse: React.FC = () => {
    const [newCourse, setNewCourse] = useState<Course>({
        course_name: '',
        course_description: ''
    })
    const [error, setError] = useState('')
    const [message, setMessage] = useState('')

    const addCourse = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()


        let response = await fetch('http://localhost:5000/api/v1/courses/',
            {
                method: "POST",
                headers: {
                    'Content-Type': "Application/json"
                },
                body: JSON.stringify(newCourse)

            }
        )
        let data = await response.json()
        if (response.status == 201) {
            setError('')
            setMessage(data.message)
        }
        else {
            setMessage('')
            setError(data.error)
        }



    }
    return (
        <div id='course' className="form-container">
            <form className="form" onSubmit={addCourse}>
                <h1 className="form-title">New Course</h1>
                <div className="form-grid">
                    <div className="form-group">
                        <label htmlFor="course_name" className="form-label">Course Name:</label>
                        <input type="text" id="course_name" name="course_name" className="form-input" required
                            value={newCourse.course_name}
                            onChange={(e) => setNewCourse({ ...newCourse, course_name: e.target.value })} />
                    </div>
                    <br />
                    <div className="form-group">
                        <label htmlFor="course_description" className="form-label">Course Description:</label>
                        <textarea id="course_description" name="course_description" className="form-input" required
                            value={newCourse.course_description}
                            onChange={(e) => setNewCourse({ ...newCourse, course_description: e.target.value })} />
                    </div>

                </div>
                <p className='error'>{error}</p>
                <p className='success'>{message}</p>
                <button className="form-button">Add</button>
            </form>
        </div>
    );
};

export default NewCourse;