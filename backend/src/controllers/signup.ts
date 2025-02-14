import { Request, Response } from "express";
import { signupInput } from "../config/types";
import { hashPassword } from "../utils/passHash";
import { userDB } from "../models/userModel";
import jwt from "jsonwebtoken";

export const signup = async (req: Request, res: Response) => {
  const body = req.body;
  try {
    if (body.role === "admin") {
      const existingAdmin = await userDB.findOne({ role: "admin" });
      if (existingAdmin) {
        res.status(400).json({
          message: "Admin already exists",
          success: false,
        });
        return;
      }
    }
    const { success } = signupInput.safeParse(body);
    if (!success) {
      res.json({
        message: "Wrong inputs",
        success: false,
      });
      return;
    }
    const findUser = await userDB.findOne({
      email: body.email,
    });
    if (findUser) {
      res.status(409).json({
        message: "Email already exists",
        success: false,
      });
      return;
    }
    const hashedPassword = await hashPassword(body.password);
    const user = await userDB.create({
      name: body.name,
      email: body.email,
      password: hashedPassword,
      role: body.role,
    });

    const token = jwt.sign(
      { email: body.email, role: body.role, id: user._id.toString() },
      String(process.env.SECRET_KEY)
    );
    res.status(200).json({
      success: true,
      message: "User created",
      token,
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};
