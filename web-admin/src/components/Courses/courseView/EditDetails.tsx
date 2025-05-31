import React, { useEffect, useState } from "react"
import { X } from "lucide-react"
import { useParams } from "react-router-dom"
import './styles.css'

interface Course {
    course_name: string,
    course_description: string,

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
    const [course, setCourse] = useState<Course>({
        course_name: '',
        course_description: '',
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
        let response = await fetch(`http://localhost:5000/api/v1/courses/${id}`)
        let data = await response.json()
        console.log(data.course)
        setCourse(data.course)
        setRequirements(data.course.requirements ? data.course.requirements : [])
    }
    useEffect(() => {
        loadCourse()
    }, [])
    return (
        <>
            <h2>Course Name : <i><span>{course.course_name}</span></i></h2>
            <p>Course Description : <i><span>{course.course_description}</span></i></p>
            <div className="form-group">
                <button
                    className="actionBtn"
                    onClick={() => {
                        setRequirements([...requirements, {
                            id: requirements.length + 1,
                            label: '',
                            required: true,
                            type: 'text',
                            description: '',
                            field_key: ''
                        }])
                    }}
                >Add requirement</button>

                {requirements?.map((req, index) => (
                    <div key={index}>
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
                            <button
                                className="actionBtn"
                                onClick={() => removeRequirement(index)}><X /></button>
                        </div>
                        <hr />
                    </div>
                ))}
            </div>
        </>
    )
}

export default EditDetails