import { Request, Response, Router } from "express";
import { universityModel } from "../models/universityModel";

interface CustomRequest extends Request {
  user: {
    email?: string;
    id?: string;
    role?: string;
  };
}

export const addUniversity = async (req: Request, res: Response) => {
  try {
    const authReq = req as CustomRequest;
    if (authReq.user.role !== "admin") {
      res.status(411).json({
        message: "You are not authorized",
      });
      return;
    }
    const { university } = req.body;
    const allUniversity = await universityModel.create({
      university,
    });
    res.status(200).json({
      message: "University added",
      allUniversity,
    });
    return;
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    });
    return;
  }
};

export const getUniversity = async (req: Request, res: Response) => {
  try {
    const allUniversity = await universityModel.find({});
    res.status(200).json({
      allUniversity,
    });
    return;
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch universities",
    });
    return;
  }
};

// export const updateUniversity = async (req: Request, res: Response) => {
//     try {
//          const authReq = req as CustomRequest;
//          if (authReq.user.role !== "admin") {
//            res.status(411).json({
//              message: "You are not authorized",
//            });
//            return;
//          }
//          const {}
//     } catch (error) {

//     }
// }
