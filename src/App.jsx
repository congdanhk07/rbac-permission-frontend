import { Routes, Route, Navigate, Outlet } from 'react-router-dom'
import Login from '~/pages/Login'
import Dashboard from '~/pages/Dashboard'
import NotFound from './pages/404/NotFound'
import AccessDenied from './pages/AccessDenied'

// Xác định các route nào cần đăng nhập thì mới cho truy cập -> nếu không có user thì redirect về login
// Sử dụng <Outlet /> để render các route con được chứa trong ProtectedRoute
const ProtectedRoute = () => {
  const user = JSON.parse(localStorage.getItem('userInfo'))
  if (!user) return <Navigate to='/login' replace={true} />
  return <Outlet />
}
// Nếu như đã đăng nhập thì đẩy về dashboard
const UnauthorizedRoute = () => {
  const user = JSON.parse(localStorage.getItem('userInfo'))
  if (user) return <Navigate to='/dashboard' replace={true} />
  return <Outlet />
}
function App() {
  return (
    <Routes>
      <Route path='/' element={<Navigate to='/login' replace={true} />} />
      <Route element={<UnauthorizedRoute />}>
        <Route path='/login' element={<Login />} />
      </Route>
      <Route element={<ProtectedRoute />}>
        {/* <Outlet /> chính là các child route này - Các route con được chứa trong ProtectedRoute  */}
        {/* Các routes đều trỏ về Dashboard vì đang gom các page về chung dạng Tabs, trong thực tế sẽ có các component khác nhau */}
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/support' element={<Dashboard />} />
        <Route path='/message' element={<Dashboard />} />
        <Route path='/revenue' element={<Dashboard />} />
        <Route path='/admin-tools' element={<Dashboard />} />
      </Route>
      <Route path='/access-denied' element={<AccessDenied />} />
      <Route path='*' element={<NotFound />} />
    </Routes>
  )
}

export default App
