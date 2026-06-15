


export function setTokenInCookie(res, user){
  res.cookie("accessToken", user.accessToken, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    // maxAge: 15 * 60 * 1000, // 15 min,
    maxAge: 1 * 60 * 1000, // 1 minute
  });

  res.cookie("refreshToken", user.refreshToken, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
    
}