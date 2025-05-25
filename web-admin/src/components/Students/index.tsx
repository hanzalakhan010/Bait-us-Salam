import React, { useEffect, useState } from 'react';
import './styles.css'
import { Link } from 'react-router-dom';

interface Student {
  id: number,
  name: String,
  docs_folder: string
  email: string
}

const Students: React.FC = () => {
  let [students, setStudents] = useState<Student[]>([])
  const [selected, setSelected] = useState<Set<number>>(new Set());

  const loadStudents = async () => {
    try{
      let response = await fetch('http://localhost:5000/api/v1/students/')
      let data = await response.json()
      setStudents(data.students)
    }
    catch{
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
  useEffect(() => {
    loadStudents()
  }, [])
  return (
    <div>
      <h1>Students</h1>
      <div className='actions'>
        <Link to='/studentActions/new'>+ Add</Link>
        <Link to='/studentActions/attendances'>Attendences</Link>
        <Link to='/studentActions/performance'>Performance</Link>
      </div>
      <div id='tableDiv'>
        {selected.size > 0 ? <div className='actions'>
          <button>Message</button>
          <button>Attendance Summary</button>
          <button>Assign</button>
          <button>Suspend</button>
        </div> : null}
        <table>
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  onChange={toggleAll}
                  checked={selected.size === students.length}
                />
              </th>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>View</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id}>
                <td className="text-center">
                  <input
                    type="checkbox"
                    checked={selected.has(student.id)}
                    onChange={() => toggleOne(student.id)}
                  />
                </td>

                <td>{student.id}</td>
                <td>{student.name} </td>
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