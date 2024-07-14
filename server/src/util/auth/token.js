import jwt from 'jsonwebtoken';

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

export const getValidBearerToken = (req) => {
  const header = req.headers.authorization;

  if (!header || !header.startsWith('Bearer ')) {
    return null;
  }

  const token = header.substring(7);
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        reject(err);
        return;
      }
      const expirationTime = decoded.exp;
      const currentTimestamp = Math.floor(Date.now() / 1000);
      return expirationTime < currentTimestamp ? resolve(null) : resolve(token);
    });
  });
};
