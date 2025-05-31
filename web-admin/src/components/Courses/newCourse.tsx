import React, { useState } from 'react';
import { X } from "lucide-react"
import { useNavigate } from 'react-router-dom'
interface Course {
    course_name: string,
    course_description: string
}
interface Requirements {
    id: number,
    field_key: string,
    type: "file" | "text" | "textarea" | "date" | "number" | "email" | "tel" | "url";
    label: string,
    description: string,
    required: boolean
}

const NewCourse: React.FC = () => {
    const navigate = useNavigate()
    const [newCourse, setNewCourse] = useState<Course>({
        course_name: '',
        course_description: ''
    })
    const [error, setError] = useState('')
    const [message, setMessage] = useState('')
    const [requirements, setRequirements] = useState<Requirements[]>([])
    const handleRequirementChange = (index: number, field: keyof Requirements, value: any) => {
        const updated = [...requirements];
        (updated[index][field] as any) = value;


        if (field === 'label') {
            updated[index].field_key = value
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '_')
                .replace(/^_+|_+$/g, '');
        }

        setRequirements(updated);
    };
    const removeRequirement = (index: number) => {
        setRequirements(requirements.filter((_, i) => i !== index))
    }
    const addCourse = async () => {
        let response = await fetch('http://localhost:5000/api/v1/courses/',
            {
                method: "POST",
                headers: {
                    'Content-Type': "Application/json"
                },
                body: JSON.stringify({ ...newCourse, ...{ requirements: requirements } })

            }
        )
        let data = await response.json()
        if (response.status == 201) {
            setError('')
            setMessage(data.message)
            navigate('/courses')
        }
        else {
            setMessage('')
            setError(data.error)
        }



    }
    return (
        <div id='course' className="form-container">
            <div className="form">
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
                    <div className="form-group">
                        <button
                            onClick={() => {
                                setRequirements([...requirements, {
                                    id: requirements.length + 1,
                                    label: '',
                                    required: true,
                                    type: 'file',
                                    description: '',
                                    field_key: ''
                                }])
                            }}
                        >Add requirement</button>

                        {requirements.map((req, index) => (
                            <div>
                                <p>Requirement {req.id}</p>
                                <div className='form-group'>
                                    <label>Label</label>
                                    <input placeholder='Label'
                                        value={req.label}
                                        onChange={(e) => handleRequirementChange(index, 'label', e.target.value)}
                                    />
                                </div>
                                <div className='form-group'>
                                    <label>Type</label>
                                    <select
                                        onChange={(e) => handleRequirementChange(index, 'type', e.target.value)}
                                    >
                                        <option value="file">File Upload</option>
                                        <option value="text">Short Text</option>
                                        <option value="textarea">Long Text (Textarea)</option>
                                        <option value="date">Date</option>
                                        <option value="number">Number</option>
                                        <option value="email">Email</option>
                                        <option value="tel">Phone Number</option>
                                        <option value="select">Select (Dropdown)</option>
                                        <option value="checkbox">Checkbox</option>
                                        <option value="radio">Radio Buttons</option>
                                        <option value="url">URL / Link</option>

                                    </select>
                                </div>
                                <div className='form-group'>
                                    <label>Description</label>
                                    <input placeholder='description'
                                        value={req.description}
                                        onChange={(e) => handleRequirementChange(index, 'description', e.target.value)}
                                    />
                                </div>
                                <div className='form-group'>
                                    <label>Required
                                        <input type='checkbox'
                                            checked={req.required}
                                            onChange={(e) => handleRequirementChange(index, 'required', e.target.checked)}
                                        />
                                    </label>
                                </div>
                                <div className='form-group'>
                                    <button onClick={() => removeRequirement(index)}><X /></button>
                                </div>
                                <hr />
                            </div>
                        ))}
                    </div>
                    <p className='error'>{error}</p>
                    <p className='success'>{message}</p>
                    <div className="form-group">
                        <button onClick={addCourse} className="form-button">Add</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewCourse;