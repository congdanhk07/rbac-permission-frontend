import { Routes, Route, Navigate, Outlet } from 'react-router-dom'
import Login from '~/pages/Login'
import Dashboard from '~/pages/Dashboard'
import NotFound from './pages/404/NotFound'
import AccessDenied from './pages/AccessDenied'
import { PERMISSIONS } from './configs/rbacConfig'
import RbacRoute from './components/core/RbacRoute'
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

        {/* Nếu RBAC viết theo kiểu <Outlet /> nghĩa là React-Router-Dom v6 thì dùng cách này */}
        <Route element={<RbacRoute requiredPermissions={PERMISSIONS.VIEW_DASHBOARD} />}>
          <Route path='/dashboard' element={<Dashboard />} />
        </Route>
        <Route element={<RbacRoute requiredPermissions={PERMISSIONS.VIEW_SUPPORT} />}>
          <Route path='/support' element={<Dashboard />} />
        </Route>
        <Route element={<RbacRoute requiredPermissions={PERMISSIONS.VIEW_MESSAGES} />}>
          <Route path='/message' element={<Dashboard />} />
        </Route>
        <Route element={<RbacRoute requiredPermissions={PERMISSIONS.VIEW_REVENUE} />}>
          <Route path='/revenue' element={<Dashboard />} />
        </Route>
        <Route element={<RbacRoute requiredPermissions={PERMISSIONS.VIEW_ADMIN_TOOLS} />}>
          <Route path='/admin-tools' element={<Dashboard />} />
        </Route>

        {/* Nếu RBAC viết theo kiểu Children nghĩa là React-Router-Dom v5 thì dùng cách này */}
        {/* <Route
          path='/dashboard'
          element={
            <RbacRoute requiredPermissions={PERMISSIONS.VIEW_DASHBOARD}>
              <Dashboard />
            </RbacRoute>
          }
        /> */}
      </Route>
      <Route path='/access-denied' element={<AccessDenied />} />
      <Route path='*' element={<NotFound />} />
    </Routes>
  )
}

export default App
