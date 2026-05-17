import { Application } from "../models/applicatiommodel.js";
import { Job } from "../models/jobmodel.js";

export const applyJob = async (req, res) => {
  try {
    const userId = req.userId;
    const jobId = req.params.jobId;

    // job exist check
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({
        message: "Job not found",
        success: false
      });
    }

    // already applied check
    const existingApplication = await Application.findOne({
      job: jobId,
      applicant: userId
    });

    if (existingApplication) {
      return res.status(400).json({
        message: "You have already applied",
        success: false
      });
    }

    // create application
    const application = await Application.create({
      job: jobId,
      applicant: userId
    });

    // add application to job
    job.applications.push(application._id);
    await job.save();

    return res.status(201).json({
      message: "Applied successfully",
      success: true,
      application
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error",
      success: false
    });
  }
};

// get applied jobs



export const getAppliedJobs = async (req, res) => {
  try {
    const userId = req.userId;

    const applications = await Application.find({ applicant: userId })
      .populate({
        path: "job",
        populate: {
          path: "company"
        }
      })
      .sort({ createdAt: -1 });

    return res.status(200).json({
      applications,
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

// applicant

export const getApplicants = async (req, res) => {
  try {
    const jobId = req.params.jobId;

    // job check
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({
        message: "Job not found",
        success: false
      });
    }

    // ownership check (recruiter only)
    if (job.createdBy.toString() !== req.userId) {
      return res.status(403).json({
        message: "Unauthorized",
        success: false
      });
    }

    // applications fetch
    const applications = await Application.find({ job: jobId })
      .populate("applicant")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      applications,
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

// update status


export const updateStatus = async (req, res) => {
  try {
    const applicationId = req.params.id;
    const { status } = req.body;

    // valid status check
    if (!["pending", "accepted", "rejected"].includes(status)) {
      return res.status(400).json({
        message: "Invalid status",
        success: false
      });
    }

    const application = await Application.findById(applicationId);

    // check application exist
    if (!application) {
      return res.status(404).json({
        message: "Application not found",
        success: false
      });
    }

    // get job
    const job = await Job.findById(application.job);

    // ownership check
    if (job.createdBy.toString() !== req.userId) {
      return res.status(403).json({
        message: "Unauthorized",
        success: false
      });
    }

    // update status
    application.status = status;
    await application.save();

    return res.status(200).json({
      message: "Status updated successfully",
      success: true,
      application
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error",
      success: false
    });
  }
};