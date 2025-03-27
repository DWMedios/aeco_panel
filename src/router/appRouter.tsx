import { Route, Routes } from 'react-router-dom'
import Login from '../pages/login'
import Users from '../pages/users'
import Companies from '../pages/companies'
import Machines from '../pages/machines'
import Ads from '../pages/ads'
import Rewards from '../pages/rewards'
import Dashboard from '../pages/dashboard'

const AppRouter = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/companies" element={<Companies />} />
        <Route path="/machines" element={<Machines />} />
        <Route path="/ads" element={<Ads />} />
        <Route path="/rewards" element={<Rewards />} />
        <Route path="/users" element={<Users />} />
      </Routes>
    </>
  )
}

export default AppRouter
