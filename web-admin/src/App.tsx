import { useEffect, useState } from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import { BookOpenText, FileText, GraduationCap, LayoutDashboard, Users } from 'lucide-react'
import Students from './components/Students';
import { Link } from 'react-router-dom';
import NewStudent from './components/Students/newStudent';
import SingleStudent from './components/Students/singleStudent';
import Courses from './components/Courses';
import NewCourse from './components/Courses/newCourse';
import CourseView from './components/Courses/courseView';
import Instructors from './components/Instructors';
import NewInstructor from './components/Instructors/newInstructor';
import Applicaions from './components/Applications';
import Login from './components/Login';
import SingleApplication from './components/Applications/singleApplication';

function App() {
  const [tab, setTab] = useState('dashboard')
  const [login, setLogin] = useState(false)
  const checkAuth = async () => {
    let email = localStorage.getItem('email')
    let token = localStorage.getItem('token')
    console.log(email, token)
    if (email && token) {
      let response = await fetch('http://localhost:5000/api/v1/auth/auth', {
        method: "POST",
        headers: {
          'Content-Type': "application/json"
        },
        body: JSON.stringify({
          email, token
        })
      })
      if (response.status == 200) {
        setLogin(true)
      }
    }
  }
  useEffect(() => {
    checkAuth()
  })
  return (
    <>

      <>
        {
          login ? (<>
            <nav>
              <div>
                <Link to='/dasboard' onClick={() => setTab('dashboard')} className={`flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 hover:text-blue-600 transition-colors ${tab == 'dashboard' ? 'active' : null}`}>
                  <LayoutDashboard className="w-5 h-5" />
                  <span>Dashboard</span>
                </Link>
              </div>
              <div>
                <Link to='/students' onClick={() => setTab('students')} className={`flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 hover:text-blue-600 transition-colors ${tab == 'students' ? 'active' : null} `}>
                  <Users className="w-10 h-10" />
                  <span>Students</span>
                </Link>
              </div>
              <div>
                <Link to='/courses' onClick={() => setTab('courses')} className={`flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 hover:text-blue-600 transition-colors ${tab == 'courses' ? 'active' : null} `}>
                  <BookOpenText className="w-10 h-10" />
                  <span>Courses</span>
                </Link>
              </div>
              <div>
                <Link to='/instructors' onClick={() => setTab('instructors')} className={`flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 hover:text-blue-600 transition-colors ${tab == 'instructors' ? 'active' : null} `}>
                  <GraduationCap className="w-20 h-5" />
                  <span>Instructors</span>
                </Link>
              </div>
              <div>
                <Link to='/applications' onClick={() => setTab('applications')} className={`flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 hover:text-blue-600 transition-colors ${tab == 'applications' ? 'active' : null} `}>
                  <FileText className="w-20 h-5" />
                  <span>Applications</span>
                </Link>
              </div>

            </nav>
            <Routes>
              <Route path="/dasboard" element={<Dashboard />} />
              {/* For Student  */}
              <Route path="/students" element={<Students />} />
              <Route path="/studentActions/new" element={<NewStudent />} />
              <Route path='/students/:id' element={<SingleStudent />} />
              {/* For Courses  */}
              <Route path="/courses" element={<Courses />} />
              <Route path="/courseActions/new" element={<NewCourse />} />
              <Route path='/courses/:id' element={<CourseView />} />
              {/* For Instructors */}
              <Route path="/instructors" element={<Instructors />} />
              <Route path="/instructorActions/new" element={<NewInstructor />} />
              {/* For Applications */}
              <Route path="/applications" element={<Applicaions />} />
              <Route path='/applications/:id' element={<SingleApplication />} />
            </Routes>
          </>
          ) : (
            <Login setLogin={setLogin} />
          )
        }
      </>
    </>
  )
}

export default App
