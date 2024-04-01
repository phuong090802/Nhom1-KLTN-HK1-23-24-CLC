// sendToken when login, refresh token
export const sendToken = (res, accessToken, refreshToken, userInformation) => {
  const options = {
    expires: refreshToken.expires,
    httpOnly: true,
    path: '/api/auth',
    secure: true,
    // sameSite: 'None',
  };

  res.cookie('refreshToken', refreshToken.token, options).json({
    success: true,
    user: userInformation,
    token: accessToken,
    code: 2072,
  });
};

// clear token when refresh token fail, logout
export const clearToken = (res) => {
  res.clearCookie('refreshToken', {
    httpOnly: true,
    path: '/api/auth',
    secure: true,
    // sameSite: 'None',
  });
};
