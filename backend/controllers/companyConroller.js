import { Company } from "../models/companymodel.js";

// CREATE COMPANY
export const createCompany = async (req, res) => {
  try {

    const { name, description, website, location } = req.body;

    if (!name) {
      return res.status(400).json({
        message: "Company name is required",
        success: false
      });
    }

    const userId = req.userId;

    // check company already exists
    const existingCompany = await Company.findOne({
      name,
      userId
    });

    if (existingCompany) {
      return res.status(400).json({
        message: "Company already exists",
        success: false
      });
    }

    // create company
    const newCompany = await Company.create({
      name,
      description,
      website,
      location,
      userId
    });

    return res.status(201).json({
      message: "Company created successfully",
      success: true,
      company: newCompany
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      message: "Server error",
      success: false
    });

  }
};

// GET ALL COMPANIES
export const getcompanies = async (req, res) => {
  try {

    const userId = req.userId;

    const companies = await Company.find({ userId });

    return res.status(200).json({
      companies,
      success: true
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      message: "Server error",
      success: false
    });

  }
};

// GET SINGLE COMPANY
export const getcompanyById = async (req, res) => {
  try {

    const companyId = req.params.id;

    const company = await Company.findById(companyId);

    if (!company) {
      return res.status(404).json({
        message: "Company not found",
        success: false
      });
    }

    return res.status(200).json({
      company,
      success: true
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      message: "Server error",
      success: false
    });

  }
};

// UPDATE COMPANY
export const updateCompany = async (req, res) => {
  try {

    const companyId = req.params.id;

    const { name, description, website, location } = req.body;

    const company = await Company.findById(companyId);

    if (!company) {
      return res.status(404).json({
        message: "Company not found",
        success: false
      });
    }

    // update fields
    if (name) company.name = name;

    if (description) company.description = description;

    if (website) company.website = website;

    if (location) company.location = location;

    await company.save();

    return res.status(200).json({
      message: "Company updated successfully",
      success: true,
      company
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      message: "Server error",
      success: false
    });

  }
};