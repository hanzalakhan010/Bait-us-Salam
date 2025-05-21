import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// import './styles.css';

interface Instructor {
    id: number,
    instructor_name: String,
    phone: string
}

const Instructors: React.FC = () => {
    let [instructors, setInstructors] = useState<Instructor[]>([])
    const [selected, setSelected] = useState<Set<number>>(new Set());

    const loadInstructors = async () => {
        try {
            let response = await fetch('http://localhost:5000/api/v1/instructors/')
            let data = await response.json()
            setInstructors(data.instructors)
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
            ? new Set<number>(instructors.map((instructors) => instructors.id))
            : new Set<number>();
        setSelected(newSet);
    };
    useEffect(() => {
        loadInstructors()
    }, [])
    return (
        <div>
            <h1>Courses</h1>
            <div className='actions'>
                <Link to='/instructorActions/new'>+ Add</Link>
            </div>
            <div id='tableDiv'>
                {selected.size > 0 ? <div className='actions'>

                    {/* application open */}
                </div> : null}
                <table>
                    <thead>
                        <tr>
                            <th>
                                <input
                                    type="checkbox"
                                    onChange={toggleAll}
                                    checked={selected.size === instructors.length}
                                />
                            </th>
                            <th>ID</th>
                            <th>Instructor name</th>
                            <th>Phone</th>
                        </tr>
                    </thead>
                    <tbody>
                        {instructors.map((instructor) => (
                            <tr key={instructor.id}>
                                <td className="text-center">
                                    <input
                                        type="checkbox"
                                        checked={selected.has(instructor.id)}
                                        onChange={() => toggleOne(instructor.id)}
                                    />
                                </td>

                                <td>{instructor.id}</td>
                                <td>{instructor.instructor_name}</td>
                                <td>{instructor.phone}</td>
                                <td><Link to={`/instructors/${instructor.id}`}>View</Link></td>
                            </tr>
                        ))}

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Instructors;