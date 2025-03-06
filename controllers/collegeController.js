import mongoose from "mongoose";
import College from "../models/College.js";

// ✅ Add College
export const addCollege = async (req, res) => {
  try {
    console.log("Received Body:", req.body);
    console.log("Received Files:", req.files);

    // ✅ Extract fields from `req.body`
    const { name, location, ranking, collegeInfo } = req.body;

    // ✅ Extract file URLs from `req.files`
    const image = req.files?.image ? req.files.image[0].path : null;
    const brochure = req.files?.brochure ? req.files.brochure[0].path : null;

    // ✅ Validate all required fields
    if (!name || !location || !ranking || !collegeInfo || !image || !brochure) {
      return res.status(400).json({
        message: "All fields (name, location, ranking, collegeInfo, image, brochure) are required",
      });
    }

    // ✅ Create new college entry
    const newCollege = new College({
      name,
      location,
      ranking,
      collegeInfo,
      image,
      brochure,
    });

    await newCollege.save();
    
    res.status(201).json({
      message: "College added successfully",
      college: newCollege,
    });

  } catch (error) {
    console.error("Error adding college:", error);
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

// ✅ Get All Colleges
export const getColleges = async (req, res) => {
  try {
    const colleges = await College.find();
    res.status(200).json(colleges);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export const updateCollege = async (req, res) => {
  try {
    let { collegeId } = req.params;

    // ✅ Ensure `collegeId` is a string
    collegeId = collegeId.trim();

    // ✅ Convert `collegeId` to ObjectId properly
    if (!mongoose.Types.ObjectId.isValid(collegeId)) {
      return res.status(400).json({ message: "Invalid College ID format" });
    }

    const { name, location, ranking, collegeInfo, image } = req.body;

    // ✅ Update the college
    const updatedCollege = await College.findByIdAndUpdate(
      new mongoose.Types.ObjectId(collegeId), // ✅ Convert to ObjectId
      { name, location, ranking, collegeInfo, image },
      { new: true, runValidators: true }
    );

    if (!updatedCollege) {
      return res.status(404).json({ message: "College not found" });
    }

    res.status(200).json({
      message: "College details updated successfully",
      college: updatedCollege,
    });

  } catch (error) {
    console.error("Error updating college:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};


export default {
  addCollege,
  getColleges,
  updateCollege,
};
