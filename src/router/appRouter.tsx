import { Route, Routes } from 'react-router-dom'
import Login from '../pages/login'
import Users from '../pages/users'
import Companies from '../pages/companies'
import Ads from '../pages/ads'
import Rewards from '../pages/rewards'
import Dashboard from '../pages/dashboard'
import PrivateRoute from './components/PrivateRoute'
import NotFound from '../pages/notFound'
import Aecos from '../pages/aecos'
import Ticket from '../pages/ticket'

const AppRouter = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/companies" element={<Companies />} />
          <Route path="/aecos" element={<Aecos />} />
          <Route path="/ads" element={<Ads />} />
          <Route path="/rewards" element={<Rewards />} />
          <Route path="/users" element={<Users />} />
        </Route>
        <Route path="/ticket" element={<Ticket />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default AppRouter
