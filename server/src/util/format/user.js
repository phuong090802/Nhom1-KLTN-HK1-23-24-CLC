export function formatUser(user) {
  return {
    fullName: user.fullName,
    avatar: user.avatar.url,
  };
}
