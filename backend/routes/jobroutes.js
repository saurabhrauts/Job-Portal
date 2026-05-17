import express from "express";

const router = express.Router();

import {
  createJob,
  getAllJobs,
  getJobById,
  getAdminJobs,
  updateJob,
  deleteJob
} from "../controllers/jobcontroller.js";

import isAuthenticated from "../middleware/isAuthenticated.js";

// CREATE JOB
router.post("/create", isAuthenticated, createJob);

// GET ALL JOBS
router.get("/all", getAllJobs);

// GET RECRUITER JOBS
router.get("/admin-jobs", isAuthenticated, getAdminJobs);

// UPDATE JOB
router.put("/update/:id", isAuthenticated, updateJob);

// DELETE JOB
router.delete("/:id", isAuthenticated, deleteJob);

// GET SINGLE JOB
router.get("/:id", getJobById);

export default router;