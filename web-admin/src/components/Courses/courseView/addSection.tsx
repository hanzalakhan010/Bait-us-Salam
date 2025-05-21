import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'


interface Instructor {
    id: number,
    instructor_name: string
}
interface formData {
    section_title: string,
    instructor_id: number,
    course_id: number,
    days: any,
    start_time: string,
    end_time: string,
    room: string
}
const AddSection: React.FC = () => {
    let [instructors, setInstructors] = useState<Array<Instructor>>([])
    let [message, setMessage] = useState('')
    let [error, setError] = useState('')
    let { id } = useParams()
    let [formData, setFormData] = useState<formData>({
        section_title: '',
        instructor_id: 1,
        days: [],
        course_id: 0,
        start_time: '',
        end_time: '',
        room: ''
    })

    // console.log(id)
    // if (id) {
    //     formData.course_id = parseInt(id)
    // }
    const loadInstructors = async () => {
        let response = await fetch('http://localhost:5000/api/v1/instructors')
        let data = await response.json()
        setInstructors(data.instructors)

    }
    const addSection = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        let timings = formData.days.map((day: string) => ({ 'day': day, timings: { start: formData.start_time, end: formData.end_time } }));

        let response = await fetch(`http://localhost:5000/api/v1/courses/course_sections?course_id=${id}`,
            {
                method: "POST",
                headers: {
                    'Content-Type': "Application/json"

                },
                body: JSON.stringify({ ...formData, timings: timings })
            }
        )
        let data = await response.json()
        if (response.status == 201) {
            setMessage(data.message)
            setError('')
        }
        else {
            setMessage('')
            setError(data.error)
        }

    }
    const handleDaysChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            days: checked
                ? [...prev.days, value]
                : prev.days.filter((day: string) => day !== value),
        }));
    };

    useEffect(() => {
        loadInstructors()

    }, [])
    return (
        <div >
            <form id='addSection' onSubmit={addSection}>
                <h4>Section Title</h4>
                <input placeholder='Section title' name='section_title'
                    value={formData.section_title}
                    onChange={(e) => setFormData({ ...formData, section_title: e.target.value })}
                />

                <h4>Instructors</h4>
                <select name='instructor' value={formData.instructor_id} onChange={(e) => setFormData({ ...formData, instructor_id: parseInt(e.target.value) })}>
                    {instructors.map((instructor) => <option key={instructor.id} value={instructor.id}>{instructor.instructor_name}</option>)}
                </select>
                <h4>Days</h4>
                <div id="days">
                    {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map((day) => (
                        <label key={day}>
                            <input type='checkbox' name='days' value={day}
                                onChange={handleDaysChange}
                            />
                            {day}
                        </label>
                    ))}
                </div>
                <div>
                    <h4>Timinigs</h4>
                    <label>
                        Start Time:
                        <input type="time" name="start_time" required
                            value={formData.start_time}
                            onChange={(e) => { setFormData({ ...formData, start_time: e.target.value }) }}
                        />
                    </label>

                    <label>
                        End Time:
                        <input type="time" name="end_time" required
                            value={formData.end_time}
                            onChange={(e) => { setFormData({ ...formData, end_time: e.target.value }) }}
                        />
                    </label>
                </div>
                <h4>Room</h4>
                <input placeholder='Room' name='room' value={formData.room}
                    onChange={(e) => { setFormData({ ...formData, room: e.target.value }) }}
                />
                <input type='submit' value='Add' />
                <p>{message}</p>
                <p>{error}</p>
            </form>
        </div>
    )
}

export default AddSection