import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { ROLES } from '~/configs/rbacConfig'
import { usePermission } from '~/hooks/usePermission'

const RbacRoute = ({ requiredPermissions, redirectTo = '/access-denied', children }) => {
  const user = JSON.parse(localStorage.getItem('userInfo'))
  const userRole = user?.role || ROLES.CLIENT
  const { hasPermission } = usePermission(userRole)
  if (!hasPermission(requiredPermissions)) {
    return <Navigate to={redirectTo} replace={true} />
  }
  // Cách này dùng cho React-Router v6 trở lên
  return <Outlet />

  // Cách này dùng cho React-Router v5
  //   return children
}

export default RbacRoute
