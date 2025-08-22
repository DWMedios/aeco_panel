import { Route, Routes } from 'react-router-dom'
import Login from '../pages/login'
import Users from '../pages/users'
import Companies from '../pages/companies'
import Rewards from '../pages/rewards'
import Dashboard from '../pages/dashboard'
import PrivateRoute from './components/PrivateRoute'
import NotFound from '../pages/notFound'
import Aecos from '../pages/aecos'
import Ticket from '../pages/ticket'
import Products from '../pages/products'
import Advertising from '../pages/advertisings'
import ForgotPassword from '../pages/forgotPassword'
import ResetPassword from '../pages/resetPassword'
import EmailVerified from '../pages/emailVerified'

const AppRouter = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/companies" element={<Companies />} />
          <Route path="/aecos" element={<Aecos />} />
          <Route path="/advertisings" element={<Advertising />} />
          <Route path="/rewards" element={<Rewards />} />
          <Route path="/users" element={<Users />} />
          <Route path="/products" element={<Products />} />
        </Route>
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/ticket" element={<Ticket />} />
        <Route path="/verify-email" element={<EmailVerified />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default AppRouter
