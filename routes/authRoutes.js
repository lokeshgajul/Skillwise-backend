import express from "express";
import { signin, signup } from "../controllers/authController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.get("/verify-token", verifyToken, (req, res) => {
  res.status(200).json({ valid: true, user: req.user });
});

export default router;
