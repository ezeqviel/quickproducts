import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Main from './pages/Main'

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/main" element={<Main />} />
      <Route path="*" element={<Login />} />
    </Routes>
  )
}