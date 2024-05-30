import { useState } from 'react'
import './App.css'
import MainPage from './MainPage'
import SettingPage from './SettingPage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <SettingPage/>
      {/* <MainPage/> */}
    </>
  )
}

export default App
