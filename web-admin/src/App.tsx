import { useState } from 'react';
import './App.css';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import { BookOpenText, FileText, GraduationCap, LayoutDashboard, Users } from 'lucide-react'
import Student from './components/Student';

function App() {
  const [login, setLogin] = useState(false)
  const [tab, setTab] = useState('dashboard')
  return (
    <>
      {login ?
        <>
          <nav>
            <button onClick={()=>setTab('dashboard')} className={`flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 hover:text-blue-600 transition-colors ${tab == 'dashboard' ? 'active' : null}`}>
              <LayoutDashboard className="w-5 h-5" />
              <span>Dashboard</span>
            </button>
            <button onClick={()=>setTab('students')} className={`flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 hover:text-blue-600 transition-colors ${tab == 'students' ? 'active' : null} `}>
              <Users className="w-10 h-10" />
              <span>Students</span>
            </button>
            <button onClick={()=>setTab('courses')} className={`flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 hover:text-blue-600 transition-colors ${tab == 'courses' ? 'active' : null} `}>
              <BookOpenText className="w-10 h-10" />
              <span>Courses</span>
            </button>
            <button onClick={()=>setTab('instructors')} className={`flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 hover:text-blue-600 transition-colors ${tab == 'instructors' ? 'active' : null} `}>
              <GraduationCap className="w-20 h-5" />
              <span>Instructors</span>
            </button>
            <button onClick={()=>setTab('applications')} className={`flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 hover:text-blue-600 transition-colors ${tab == 'applications' ? 'active' : null} `}>
              <FileText className="w-20 h-5" />
              <span>Applications</span>
            </button>

          </nav>
          <div id='tab'>
            {tab == 'dashboard' ? <Dashboard /> : null}
            {tab == 'students' ? <Student /> : null}
          </div>
        </>
        :
        <Login setLogin={setLogin} />}
    </>
  )
}

export default App
