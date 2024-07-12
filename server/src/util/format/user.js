export function formatUserForAnswer(user) {
  return {
    fullName: user?.fullName || 'Tài khoản đã bị xóa',
    avatar: user?.avatar?.url || null,
  };
}
