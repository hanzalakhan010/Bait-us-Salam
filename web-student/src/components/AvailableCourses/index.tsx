import React, { useEffect, useState } from 'react';
import { notifyError } from '../../notification';
import { host } from '../../constants';
import './styles.css'
import { Link } from 'react-router-dom';
interface Student {
    id: number,
    email: string,
}
interface AvailableCourses {
    id: number,
    course_name: string,
    logoImg: string,
    bannerImg: string,
}
const AvailableCourses: React.FC = () => {
    const student: Student = localStorage.getItem('student') ? JSON.parse(localStorage.getItem('student') as string) : null;
    const [availableCourses, setAvailableCourses] = useState<AvailableCourses[]>([])
    const loadAvailableCourses = async () => {
        if (!student) {
            notifyError('Student data not found in  localstorage,Logout first')
            return
        }
        try {
            let response = await fetch(`${host}/api/v1/students/${student.id}/available_courses`, { credentials: 'include' })
            let data = await response.json()
            if (response.ok) (
                setAvailableCourses(data.courses)
            )

        } catch {
            notifyError('Error connecting to server')
        }
    }
    useEffect(() => {
        loadAvailableCourses()
    }, [])
    return (
        <div>
            {availableCourses.length != 0 ? (
                <>
                    <h1>Available Courses</h1>
                    {availableCourses.map((course, index) => (
                        <div key={index} className='course'>
                            <img className='logo' src={`${host}/uploads/courses/${course.logoImg}.png`} />
                            <img className='banner' src={`${host}/uploads/courses/${course.bannerImg}.png`} />
                            <Link to={`/apply/${course.id}`}>Apply now</Link>
                        </div>
                    ))}
                </>
            ) : (<h3>Currently there is no course open for application</h3>)}
        </div>
    );
};

export default AvailableCourses;