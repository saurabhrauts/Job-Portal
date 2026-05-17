import express from "express";
const router = express.Router();

import {
  applyJob,
  getAppliedJobs,
  getApplicants,
  updateStatus
} from "../controllers/applicationControoler.js";

import isAuthenticated from "../middleware/isAuthenticated.js";

// Apply job
router.post(
  "/apply/:jobId",
  isAuthenticated,
  applyJob
);

// Get applied jobs
router.get(
  "/my-applications",
  isAuthenticated,
  getAppliedJobs
);

// Update status
router.put(
  "/status/:id",
  isAuthenticated,
  updateStatus
);

// Get applicants
router.get(
  "/:jobId",
  isAuthenticated,
  getApplicants
);

export default router;