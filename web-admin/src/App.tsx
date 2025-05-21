import { useState } from 'react';
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

function App() {
  const [tab, setTab] = useState('dashboard')
  return (
    <>

      <>
        <nav>
          <div>
            <Link to='/dasboard' className={`flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 hover:text-blue-600 transition-colors ${tab == 'dashboard' ? 'active' : null}`}>
              <LayoutDashboard className="w-5 h-5" />
              <span>Dashboard</span>
            </Link>
          </div>
          <div>
            <Link to='/students' className={`flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 hover:text-blue-600 transition-colors ${tab == 'students' ? 'active' : null} `}>
              <Users className="w-10 h-10" />
              <span>Students</span>
            </Link>
          </div>
          <div>
            <Link to='/courses' className={`flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 hover:text-blue-600 transition-colors ${tab == 'courses' ? 'active' : null} `}>
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

        </Routes>
        {/* <div id='tab'>
          {tab == 'dashboard' ? <Dashboard /> : null}
          {tab == 'students' ? <Student /> : null}
        </div> */}
      </>
    </>
  )
}

export default App
