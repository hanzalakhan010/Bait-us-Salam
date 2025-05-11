import React, { useEffect, useState } from 'react';
import './styles.css'
import { Link } from 'react-router-dom';

interface Student {
  id: number,
  last_name: String,
  docs_folder: string
  email: string
}

const Students: React.FC = () => {
  let [students, setStudents] = useState<Student[]>([])
  const loadStudents = async () => {
    let response = await fetch('http://localhost:5000/api/v1/students')
    let data = await response.json()
    setStudents(data.students)
  }
  useEffect(() => {
    loadStudents()
  }, [])
  return (
    <div>
      <h1>Students</h1>
      <div id='actions'>
        <Link to='/studentActions/new'>+ Add</Link>
        <Link to='/studentActions/attendances'>Attendences</Link>
        <Link to='/studentActions/performance'>Performance</Link>
      </div>
      <div id = 'tableDiv'>

        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>View</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id}>
                <td>{student.id}</td>
                <td>{student.last_name}</td>
                <td>{student.email}</td>
                <td><Link to={`/students/${student.id}`}>View</Link></td>
              </tr>
            ))}

          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Students;