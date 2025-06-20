import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ valid: false, message: "No token provided" });
  }

  try {
    const verifiedtoken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = verifiedtoken; // { id, username }
    // console.log("user data", req.user);
    next();
  } catch (error) {
    console.log(error);

    return res
      .status(401)
      .json({ valid: false, message: "Invalid or expired token" });
  }
};
