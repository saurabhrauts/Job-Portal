import express from "express";
const router = express.Router();

import { createCompany, getcompanies, getcompanyById, updateCompany } from "../controllers/companyConroller.js";
import isAuthenticated from "../middleware/isAuthenticated.js";

// Create Company
router.post("/create", isAuthenticated, createCompany);

// Get All Companies
router.get("/get", isAuthenticated, getcompanies);

// Get Single Company
router.get("/:id", isAuthenticated, getcompanyById);

// Update Company
router.put("/update/:id", isAuthenticated, updateCompany);

export default router;