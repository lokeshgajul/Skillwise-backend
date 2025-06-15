import jwt from "jsonwebtoken";

export const verifyToken = (req, res) => {
  const token = req.Headers.authorization?.split("")[1];

  if (!token) {
    return res.status(401).json({ valid: false, message: "No token provided" });
  }

  try {
    const verifiedtoken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    return res.status(200).json({ valid: true, token: verifiedtoken });
  } catch (error) {
    console.log(error);

    return res
      .status(401)
      .json({ valid: false, message: "Invalid or expired token" });
  }
};
