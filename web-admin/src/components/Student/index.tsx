import React, { useEffect, useState } from 'react';
import './styles.css'

interface Student {
  id: number,
  last_name: String,
  docs_folder: string
  email: string
}
const Student: React.FC = () => {
  let [students, setStudents] = useState<Student[]>([])
  const loadStudents = async () => {
    let response = await fetch('http://localhost:5000/api/v1/students')
    let data = await response.json()
    console.log(data)
  }
  useEffect(() => {
    loadStudents()
  }, [])
  return (
    <div>
      <h1>Students</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (<tr key={student.id}>
              <td>{student.id}</td>
              <td>{student.last_name}</td>
              <td>{student.email}</td>
              <td></td>
          </tr>))}

        </tbody>
      </table>
    </div>
  );
};

export default Student;