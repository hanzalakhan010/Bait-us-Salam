import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

interface Course {
    id: number,
    course_name: String,
    enrollments: number
}

const Courses: React.FC = () => {
    let [courses, setCourses] = useState<Course[]>([])
    const [selected, setSelected] = useState<Set<number>>(new Set());

    const loadCourses = async () => {
        try {
            let response = await fetch('http://localhost:5000/api/v1/courses/')
            let data = await response.json()
            setCourses(data.courses)
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
            ? new Set<number>(courses.map((courses) => courses.id))
            : new Set<number>();
        setSelected(newSet);
    };
    useEffect(() => {
        loadCourses()
    }, [])
    return (
        <div>
            <h1>Courses</h1>
            <div className='actions'>
                <Link to='/courseActions/new'>+ Add</Link>
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
                                    checked={selected.size === courses.length}
                                />
                            </th>
                            <th>ID</th>
                            <th>Course name</th>
                            <th>Enrollments</th>
                        </tr>
                    </thead>
                    <tbody>
                        {courses.map((course) => (
                            <tr key={course.id}>
                                <td className="text-center">
                                    <input
                                        type="checkbox"
                                        checked={selected.has(course.id)}
                                        onChange={() => toggleOne(course.id)}
                                    />
                                </td>

                                <td>{course.id}</td>
                                <td>{course.course_name}</td>
                                <td>{course.enrollments}</td>
                                <td><Link to={`/courses/${course.id}`}>View</Link></td>
                            </tr>
                        ))}

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Courses;