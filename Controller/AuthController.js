import jwt from "jsonwebtoken";
import Users from "../Schema/Users.js";
import bcryptjs from "bcryptjs";

export const signup = async (req, res) => {
  try {
    const { email, username, password } = req.body;
    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ message: "email and password are requierd " });
    }

    const existingUser = await Users.findOne({ username });

    if (existingUser) {
      return res.status(409).json({ message: "Username already taken." });
    }
    const hashPass = await bcryptjs.hash(password, 10);

    const newUser = new Users({
      username,
      email,
      password: hashPass,
    });
    await newUser.save();
    console.log("signup successfully ", newUser);
    return res
      .status(201)
      .json({ message: "User registered successfully!", user: newUser });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error during signup.",
      error: error.message,
    });
  }
};

export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Username and password are required." });
    }

    const user = await Users.findOne({ email }).select("+password");

    if (!user) {
      return res.status(401).josn({ message: "Inavalid Credentials " });
    }

    const isMatch = await bcryptjs.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid Credentials " });
    }

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        username: user.username,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "24h" }
    );

    const userResponse = {
      id: user._id,
      username: user.username,
      email: user.email,
    };
    console.log("token", token, "response ", userResponse);

    return res.status(200).json({ token, user: userResponse });
  } catch (error) {
    res.status(400).json({ message: "Error Occurred ", error });
    console.error("Signin error:", error);
  }
};
