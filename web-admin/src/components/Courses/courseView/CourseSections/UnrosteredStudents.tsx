import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

interface Student {
    id: number,
    name: string,
    enrollment_date: Date,
}
interface Section {
    id: number,
    title: string,
    instructor_name: string,
    enrollment_count: number
}
interface UnrosteredStudentsProp {
    sections: Section[]
}
const UnrosteredStudents: React.FC<UnrosteredStudentsProp> = ({ sections }) => {
    const { id } = useParams()
    const [students, setStudents] = useState<Student[]>([])
    const [selected, setSelected] = useState<Set<number>>(new Set())
    const [selectedSectionID, setSelectedSectionID] = useState<string | undefined>()
    const loadUnrostered = async () => {
        try {

            let response = await fetch(`http://localhost:5000/api/v1/courses/${id}/unrostered`, { credentials: 'include' })
            let data = await response.json()
            if (response.status == 200) {

                setStudents(data.students)
            }
        }
        catch {
            alert('Error connecting to server')
        }
    }
    const toggleOne = (id: number) => {
        const newSet: Set<number> = new Set(selected);
        newSet.has(id) ? newSet.delete(id) : newSet.add(id);
        setSelected(newSet);
    };
    const toggleAll = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newSet: Set<number> = e.target.checked
            ? new Set<number>(students.map((student) => student.id))
            : new Set<number>();
        setSelected(newSet);
    };
    const assign = async () => {
        if ((selected.size > 20) && (!confirm('Are you sure for this bulk action?'))) return
        const studentIdsArray = Array.from(selected);
        let response = await fetch(`http://localhost:5000/api/v1/courseSection/${selectedSectionID}/assign`,
            {
                credentials: 'include', method: "POST",
                headers: { 'Content-type': 'Application/json' },
                body: JSON.stringify({
                    course_id: id,
                    student_ids: studentIdsArray
                })
            })
        let data = await response.json()
        console.log(data)

    }
    useEffect(() => { loadUnrostered() }, [])
    return (
        <div>
            {students.length > 0 && (<>
                <h2>Unrostered Students</h2>
                {selected.size > 0 ? (
                    <div id='actionsDiv'>
                        <h4>Assign</h4>
                        <div>
                            {sections.map((section) => <label><input name='section'
                                value={section.id}
                                onChange={(e) => { setSelectedSectionID(e.target.value) }}
                                type='radio' />{section.title}</label>)}
                        </div>
                        <button onClick={assign}>Confirm</button>
                    </div>
                ) : null}
                <table>
                    <thead>
                        <tr>
                            <th><input type='checkbox'
                                onChange={toggleAll}
                                checked={selected.size === students.length}
                            /></th>
                            <th>Student Name</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map((student, index) => <tr key={index} >
                            <td><input type='checkbox'
                                checked={selected.has(student.id)}
                                onChange={() => toggleOne(student.id)} /></td>
                            <td>{student.name}</td>
                            <td>{new Date(student.enrollment_date).toDateString()}</td>

                        </tr>)}
                    </tbody>
                </table>
            </>)}
        </div>
    );
};

export default UnrosteredStudents;