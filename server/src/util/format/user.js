export function formatUserForAnswer(user) {
  return {
    fullName: user.fullName,
    avatar: user.avatar.url,
  };
}
