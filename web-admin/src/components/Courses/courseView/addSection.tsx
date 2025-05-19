import React, { useEffect, useState } from 'react'


interface Instructor {
    id: number,
    instructor_name: string
}
const AddSection: React.FC = () => {
    let [instructors, setInstructors] = useState<Array<Instructor>>([])
    let [days, setDays] = useState(new Set<string>([]))
    function toggleDay(day: string) {
        if (days.has(day)) {
            days.delete(day)
        }
        else { days.add(day) }
    }
    const loadInstructors = async () => {
        let response = await fetch('http://localhost:5000/api/v1/instructors')
        let data = await response.json()
        setInstructors(data.instructors)

    }
    useEffect(() => { loadInstructors() }, [])
    return (
        <div id='addSection'>
            <h4>Section Title</h4>
            <input placeholder='Section title' />
            <h4>Instructors</h4>
            <select>
                {instructors.map((instructor) => <option value={instructor.id}>{instructor.instructor_name}</option>)}
            </select>
            <h4>Days</h4>
            <div id='days'>
                <p>Monday</p>
                <p>Tuesday</p>
                <p>Wednesday</p>
                <p>Thursday</p>
            </div>
        </div>
    )
}

export default AddSection