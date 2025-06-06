import React, { useEffect, useState } from "react"
import { X, Pencil, SaveAllIcon } from "lucide-react"
import { useParams } from "react-router-dom"
import './styles.css'

interface Course {
    course_name: string,
    course_description: string,
    status: string

}
interface Requirements {
    id: number,
    field_key: string,
    type: "file" | "text" | "textarea" | "date" | "number" | "email" | "tel" | "url";
    label: string,
    description: string,
    required: boolean
}

const EditDetails: React.FC = () => {
    const { id } = useParams()
    const [edit, setEdit] = useState(false)
    const [updateStatus, setUpdateStatus] = useState('')
    const [course, setCourse] = useState<Course>({
        course_name: '',
        course_description: '',
        status: ''

    })
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
    const loadCourse = async () => {
        try {
            let response = await fetch(`http://localhost:5000/api/v1/courses/${id}/details`, { credentials: 'include' })
            let data = await response.json()
            console.log(data.course)
            setCourse(data.course)
            setRequirements(data.course.requirements ? data.course.requirements : [])
        }
        catch {
            alert('Error connecting to server')
        }
    }
    const saveDetails = async () => {
        let response = await fetch(`http://localhost:5000/api/v1/courses/${id}/details`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'Application/json'
            },
            credentials: 'include',
            body: JSON.stringify({ ...course, requirements })
        })
        let data = await response.json()
        if (response.status == 201) {
            setUpdateStatus(data.message)
        }

    }
    useEffect(() => {
        loadCourse()
    }, [])
    return (
        <div id='courseDetails'>
            <div id='metadata'>
                <div>
                    <button onClick={() => {
                        if (edit) {
                            saveDetails()
                        }
                        setEdit(!edit)
                    }}>
                        {edit ? <SaveAllIcon /> : <Pencil />
                        }
                    </button>
                    <p>{updateStatus}</p>
                </div>
                <h3>Course Name</h3>
                <input disabled={!edit} value={course.course_name}
                    onChange={(e) => {
                        setCourse({ ...course, course_name: e.target.value })
                    }} />
                <h3>Course Status</h3>
                <select disabled={!edit} value={course.status} onChange={(e) => {
                    setCourse({ ...course, status: e.target.value })
                }}>
                    <option value='inactive'>Inactive</option>
                    <option value='open_to_application'>Open to application</option>
                    <option value='close_to_application'>Close to application</option>
                    <option value='running'>Running</option>
                    <option value='finished'>Finished</option>
                    <option value='archived'>Archived</option>
                </select>
                <h3>Course Description</h3>
                <textarea
                    onChange={(e) => {
                        setCourse({ ...course, course_description: e.target.value })
                    }}
                    disabled={!edit}
                    cols={60} value={course.course_description} />

            </div>
            {/* <div> */}
            {requirements.length == 0 ? 'No reqirements' : ""}
            <button
                disabled={!edit}
                className="actionBtn"
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
            >+ Add requirement</button>
            <div id='requirements'>

                {requirements?.map((req, index) => (
                    <div key={index}>
                        <p>Requirement {req.id}</p>
                        <div className='form-group'>
                            <label>Label</label>
                            <input placeholder='Label'
                                disabled={!edit}
                                value={req.label}
                                onChange={(e) => handleRequirementChange(index, 'label', e.target.value)}
                            />
                        </div>
                        <div className='form-group'>
                            <label>Type</label>
                            <select
                                disabled={!edit}
                                onChange={(e) => handleRequirementChange(index, 'type', e.target.value as "upload" | "raw")}
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
                                disabled={!edit}
                                value={req.description}
                                onChange={(e) => handleRequirementChange(index, 'description', e.target.value)}
                            />
                        </div>
                        <div className='form-group'>
                            <label>Required
                                <input type='checkbox'
                                    disabled={!edit}
                                    checked={req.required}
                                    onChange={(e) => handleRequirementChange(index, 'required', e.target.checked)}
                                />
                            </label>
                        </div>
                        <div className='form-group'>
                            <button
                                disabled={!edit}
                                className="actionBtn"
                                onClick={() => removeRequirement(index)}><X /></button>
                        </div>
                        <hr />
                    </div>
                ))}
            </div>
        </div>
        // </div>
    )
}

export default EditDetails