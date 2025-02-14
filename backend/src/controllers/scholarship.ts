import { Request, Response, Router } from "express";
import { scholarshipModel } from "../models/scholarshipModel";


interface CustomRequest extends Request {
  user: {
    email?: string;
    id?: string;
    role?: string;
  };
}

export const createScholarship = async (req: Request, res: Response) => {
  try {
    const authReq = req as CustomRequest;
    if (authReq.user.role !== "admin") {
      res.status(401).json({
        message: "You are not authorized",
      });
      return;
    }
    const { name, criteria, amount } = req.body;
    const scholarship = await scholarshipModel.create({
      name,
      criteria,
      amount,
    });
    res.json({
      message: "Scholarship created successfully",
      scholarship,
    });
    return;
  } catch (error) {
    res.status(500).json({
      message: "Failed to add scholarships",
    });
    return;
  }
};

export const getScholarships = async (req: Request, res: Response) => {
  //   const authReq = req as CustomRequest;
  try {
    const scholarships = await scholarshipModel.find({});
    res.status(200).json({
      scholarships,
    });
    return;
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch scholarships",
    });
    return;
  }
};

export const searchScholarships = async (req: Request, res: Response) => {
  try {
    const { criteria } = req.body;
    const scholarships = await scholarshipModel.find({
      criteria: { $lte: criteria },
    });
    if (scholarships.length === 0) {
      res.status(404).json({
        message: "No scholarships are available for the given criteria",
      });
      return;
    }
    res.status(200).json({
      scholarships,
    });
    return;
  } catch (error) {
    res.status(500).json({
      message: "Failed to search for scholarships",
    });
  }
};
