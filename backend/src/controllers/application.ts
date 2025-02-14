import { Request, Response } from "express";
import { applicationModel } from "../models/applicationModel";

interface CustomRequest extends Request {
  user: {
    email?: string;
    id?: string;
    role?: string;
  };
}

// Lets Users create an application for a user
export const createApplication = async (req: Request, res: Response) => {
    const authReq  = req as CustomRequest;
  const { university, program } = req.body;
  const studentId = authReq.user.id;

  if (authReq.user.role !== "student") {
    res.status(401).json({
      message: "You are not authorized to apply",
    });
    return;
  }

  try {
    const newApplication = await applicationModel.create({
      studentId,
      university,
      program,
    });
    res.status(201).json({
      message: "Application created",
    });
    return;
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

// Get all applications for a user
export const getApplications = async (req: Request, res: Response) => {
    const authReq = req as CustomRequest;
  const studentId = authReq.user.id;

  try {
    const applications = await applicationModel.find({ studentId });
    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({
      message: "Cannot retrieve applications",
    });
  }
};

// Update application status for admins/agents
export const updateApplicationStatus = async (
  req: Request,
  res: Response
) => {
    const  authReq = req as CustomRequest;
  if (authReq.user.role === "student") {
    res.status(401).json({
      message: "You are not authorized",
    });
    return;
  }
  const { id } = req.params;
  const { application_status } = req.body;

  try {
    const updatedApplication = await applicationModel.findByIdAndUpdate(id, {
      application_status,
      last_updated: Date.now(),
    });
    res.status(200).json({
      updatedApplication,
    });
    return;
  } catch (err) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
};
