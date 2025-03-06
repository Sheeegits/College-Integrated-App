import express from "express";
import { addCollege, getColleges, updateCollege } from "../controllers/collegeController.js";
import { addCourse, getCoursesByCollege, updateCourse } from "../controllers/courseController.js";
import { addFaculty, getFacultyByCollege, updateFaculty } from "../controllers/facultyController.js";
import { addPlacementData, getPlacementByCollege, updatePlacement } from "../controllers/placementController.js";
import upload from "../middlewares/upload.js";  // ✅ Only One Import
import validateCollege from "../middlewares/validateCollege.js";
import {
    addAdmissionProcess,
    getAdmissionProcessByCollege,
    updateAdmissionProcess
} from "../controllers/admissionProcessController.js";
import { addHostel, getHostelByCollege, updateHostel } from "../controllers/hostelController.js";
import { addCampus, getCampusByCollege, updateCampus } from "../controllers/campusController.js";
const router = express.Router();

// ✅ Apply `upload` only for `/add`
router.post("/add", upload.fields([{ name: "image" }, { name: "brochure" }]), validateCollege, addCollege);
router.get("/all", getColleges);
router.put("/update/:collegeId", updateCollege);

// ✅ Courses & Fees Routes
router.post("/courses/add", addCourse);
router.get("/courses/:collegeId", getCoursesByCollege);
router.put("/courses/update/:courseId", updateCourse);

// ✅ Faculty Routes
router.post("/faculty/add", addFaculty);
router.get("/faculty/:collegeId", getFacultyByCollege);
router.put("/faculty/update/:facultyId", updateFaculty);

// ✅ Placement Routes
router.post("/placement/add", addPlacementData);
router.get("/placement/:collegeId", getPlacementByCollege);
router.put("/placement/update/:placementId", updatePlacement);

// ✅ Admission Process Routes
router.post("/admission/add", addAdmissionProcess);
router.get("/admission/:collegeId", getAdmissionProcessByCollege);
router.put("/admission/update/:admissionProcessId", updateAdmissionProcess);

// ✅ Hostel Routes
router.post(
    "/hostel/add", upload.fields([{ name: "photos", maxCount: 5 }, { name: "videos", maxCount: 2 }]),
    addHostel
  );
router.get("/hostel/:collegeId", getHostelByCollege);
router.put("/hostel/update/:hostelId", upload.fields([{ name: "photos" }, { name: "videos" }]), updateHostel);

//Campus Routes
router.post("/campus/add", upload.fields([{ name: "photos", maxCount: 5 }, { name: "videos", maxCount: 2 }]), addCampus);
router.get("/campus/:collegeId", getCampusByCollege);
router.put("/campus/update/:campusId", upload.fields([{ name: "photos" }, { name: "videos" }]), updateCampus);

export default router;
