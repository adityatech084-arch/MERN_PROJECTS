

import jwt from "jsonwebtoken";



export const generateToken = (userId, res) => {
  const token = jwt.sign(
    { id: userId },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );

  // Get values from .env and convert to numbers
  const hours = Number(process.env.COOKIE_EXPIRE_HOURS) || 0;
  const minutes = Number(process.env.COOKIE_EXPIRE_MINUTES) || 0;

  // Calculation: (Hours * 3600 + Minutes * 60) * 1000ms
  const maxAgeInMs = (hours * 60 * 60 * 1000) + (minutes * 60 * 1000);

  res.cookie("token", token, {
    maxAge: maxAgeInMs || 24 * 60 * 60 * 1000, // Fallback to 24h if 0
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
  });

  return token;
};