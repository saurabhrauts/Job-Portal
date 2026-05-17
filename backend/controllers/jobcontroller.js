import { Job } from "../models/jobmodel.js";
import { Company } from "../models/companymodel.js";

// CREATE JOB
export const createJob = async (req, res) => {

  try {

    const {
      title,
      description,
      requirements,
      salary,
      location,
      jobType,
      position,
      companyId
    } = req.body;

    // validation
    if (
      !title ||
      !description ||
      !requirements ||
      !salary ||
      !location ||
      !jobType ||
      !position ||
      !companyId
    ) {
      return res.status(400).json({
        message: "Something is missing",
        success: false
      });
    }

    // company verify
    const company = await Company.findById(companyId);

    if (!company) {
      return res.status(404).json({
        message: "Company not found",
        success: false
      });
    }

    // ownership check
    if (company.userId.toString() !== req.userId) {
      return res.status(403).json({
        message: "Unauthorized",
        success: false
      });
    }

    // create job
    const job = await Job.create({
      title,
      description,
      requirements,
      salary,
      location,
      jobType,
      position,
      company: companyId,
      createdBy: req.userId
    });

    return res.status(201).json({
      message: "Job created successfully",
      success: true,
      job
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      message: "Server error",
      success: false
    });

  }
};

// GET ALL JOBS
  
// GET ALL JOBS
export const getAllJobs = async (req, res) => {

  try {

    //  QUERY VALUES
    const keyword = req.query.keyword || "";

    const location = req.query.location || "";

    const jobType = req.query.jobType || "";

    //  FILTER QUERY
    const query = {

      title: {
        $regex: keyword,
        $options: "i"
      },

      location: {
        $regex: location,
        $options: "i"
      },

      jobType: {
        $regex: jobType,
        $options: "i"
      }

    };

    //  FIND FILTERED JOBS
    const jobs = await Job.find(query)
      .populate("company")
      .sort({ createdAt: -1 });

    return res.status(200).json({

      jobs,
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
  

// GET SINGLE JOB
export const getJobById = async (req, res) => {

  try {

    const jobId = req.params.id;

    const job = await Job.findById(jobId)
      .populate("company");

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
        success: false
      });
    }

    return res.status(200).json({
      job,
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

// GET RECRUITER JOBS
export const getAdminJobs = async (req, res) => {

  try {

    const userId = req.userId;

    const jobs = await Job.find({
      createdBy: userId
    })
      .populate("company")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      jobs,
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

// UPDATE JOB
export const updateJob = async (req, res) => {

  try {

    const jobId = req.params.id;

    const {
      title,
      description,
      requirements,
      salary,
      location,
      jobType,
      position
    } = req.body;

    const job = await Job.findById(jobId);

    // job exist check
    if (!job) {
      return res.status(404).json({
        message: "Job not found",
        success: false
      });
    }

    // ownership check
    if (job.createdBy.toString() !== req.userId) {
      return res.status(403).json({
        message: "Unauthorized",
        success: false
      });
    }

    // update fields
    if (title) job.title = title;

    if (description) job.description = description;

    if (requirements) job.requirements = requirements;

    if (salary) job.salary = salary;

    if (location) job.location = location;

    if (jobType) job.jobType = jobType;

    if (position) job.position = position;

    await job.save();

    return res.status(200).json({
      message: "Job updated successfully",
      success: true,
      job
    });

  } catch (error) {

    console.log(error);

    return res.status(500).json({
      message: "Server error",
      success: false
    });

  }
};

// DELETE JOB
export const deleteJob = async (req, res) => {

  try {

    const jobId = req.params.id;

    const job = await Job.findById(jobId);

    // check job exist
    if (!job) {
      return res.status(404).json({
        message: "Job not found",
        success: false
      });
    }

    // ownership check
    if (job.createdBy.toString() !== req.userId) {
      return res.status(403).json({
        message: "Unauthorized",
        success: false
      });
    }

    // delete job
    await Job.findByIdAndDelete(jobId);

    return res.status(200).json({
      message: "Job deleted successfully",
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