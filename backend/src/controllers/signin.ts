import { Request, Response } from "express";
import { userDB } from "../models/userModel";
import { comparePassword } from "../utils/passCompare";
import jwt from "jsonwebtoken";

export const signin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const isUser = await userDB.findOne({ email });

    if (!isUser) {
      res.status(404).json({
        message: "User does not exist. Please create an account.",
      });
      return;
    }

    const correctPass = await comparePassword(password, isUser.password);
    if (!correctPass) {
      res.status(403).json({
        message: "Invalid Password",
      });
      return;
    } else {
      const token = jwt.sign(
        {
          email,
          role: isUser.role,
          id: isUser._id.toString(),
        },
        String(process.env.SECRET_KEY)
      );
      res.status(200).json({
        message: "Login successful",
        token,
      });
      return;
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
    return;
  }
};
