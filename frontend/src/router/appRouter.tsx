import { Route, Routes } from 'react-router-dom'
import Login from '../pages/login'


const AppRouter = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
      </Routes>
    </>
  )
}

export default AppRouter
