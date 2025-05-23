import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const AddApplication: React.FC = () => {
    const { id } = useParams()
    const loadAvailableCourse = async () => {
        let response = await fetch(`http://localhost:5000/api/v1/students/${id}/courses?courses=available`)
        let data = await response.json()
        console.log(data)
    }
    useEffect(() => {
        loadAvailableCourse()
    }, [])
    return (
        <div>
            <h1>Add Enrollment</h1>
            <select>

            </select>
        </div>
    );
};

export default AddApplication;