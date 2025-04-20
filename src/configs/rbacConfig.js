// Roles của user trong hệ thống
// BE định nghĩa role như thế nào thì phía FE sẽ config như vậy để đảm bảo tính đúng đắn của việc xác định role của user (consistent)
export const ROLES = {
  ADMIN: 'admin',
  CLIENT: 'client',
  MODERATOR: 'moderator'
}

// Định nghĩa các permission của user trong hệ thống
// Định nghĩa 1 loạt danh sách các quyền trong hệ thống đang có - VIEW, UPDATE, DELETE, CREATE, READ_ONLY, etc...
export const PERMISSIONS = {
  VIEW_DASHBOARD: 'view_dashboard',
  VIEW_SUPPORT: 'view_support',
  VIEW_REVENUE: 'view_revenue',
  VIEW_MESSAGES: 'view_messages',
  VIEW_ADMIN_TOOLS: 'view_admin_tools'
  // etc...
}

// Định nghĩa các quyền của từng role trong hệ thống
export const ROLES_PERMISSIONS = {
  [ROLES.CLIENT]: [PERMISSIONS.VIEW_DASHBOARD, PERMISSIONS.VIEW_SUPPORT],
  [ROLES.MODERATOR]: [PERMISSIONS.VIEW_DASHBOARD, PERMISSIONS.VIEW_SUPPORT, PERMISSIONS.VIEW_MESSAGES],
  [ROLES.ADMIN]: Object.values(PERMISSIONS) // Tất cả các quyền trong hệ thống
}
