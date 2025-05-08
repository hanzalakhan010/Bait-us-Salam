import { useState } from 'react'
import './App.css'
import Login from './components/Login'

function App() {
  const [login, setLogin] = useState(false)
  return (
    <>
      {login ? <h1>Welcome</h1> : <Login setLogin={setLogin} />}
    </>
  )
}

export default App
