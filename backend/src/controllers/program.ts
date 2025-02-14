import { Request, Response, Router } from "express";
import { universityModel } from "../models/universityModel";
import { programModel } from "../models/universityModel";

interface CustomRequest extends Request {
  user: {
    email?: string;
    id?: string;
    role?: string;
  };
}

export const addProgram = async (req: Request, res: Response) => {
  try {
    const authReq = req as CustomRequest;
    if (authReq.user.role !== "admin") {
      res.status(411).json({
        message: "You are not authorized",
      });
      return;
    }
    const { name, duration, fees } = req.body;
    const getPrograms = await programModel.create({
      name,
      duration,
      fees,
    });
    res.status(200).json({
      message: "Program created successfully",
    });
    return;
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const getPrograms = async (req: Request, res: Response) => {
  try {
    const getAllPrograms = await programModel.find({});
    res.status(200).json({
      getAllPrograms,
    });
    return;
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const updateProgram = async (req: Request, res: Response) => {
  try {
    const authReq = req as CustomRequest;
    if (authReq.user.role !== "admin") {
      res.status(411).json({
        message: "You are not authorized",
      });
      return;
    }
    const { name, duration, fees } = req.body;
    const { id } = req.params;

    const updatedProgram = await programModel.findByIdAndUpdate(id, {
      name,
      duration,
      fees,
    });
    res.status(200).json({
      message: "Program updated",
    });
    return;
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
};
