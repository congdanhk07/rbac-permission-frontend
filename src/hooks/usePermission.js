import { ROLES_PERMISSIONS } from '../configs/rbacConfig'

export const usePermission = (userRole) => {
  // Kiểm tra xem user có quyền truy cập vào 1 permission nào đó không
  const hasPermission = (permission) => {
    // Đây là 1 Array các permission mà user được phép truy cập
    const allowedPermissions = ROLES_PERMISSIONS[userRole] || []
    return allowedPermissions.includes(permission)
  }
  return { hasPermission }
}
