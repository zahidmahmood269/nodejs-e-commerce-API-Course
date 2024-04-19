import asyncHandler from "express-async-handler";

import Courses from "../model/Courses.js";

// @desc    Create new course
// @route   POST /api/v1/courses
// @access  Private/Admin
export const createCoursesCtrl = asyncHandler(async (req, res) => {
  const { schoolMarks, otherMarks, courseName } = req.body;

  //Courses exists
  const CoursesExists = await Courses.findOne({ courseName });
  if (CoursesExists) {
    throw new Error("Courses Already Exists");
  }

  //create the Courses
  const courses = await Courses.create({
    schoolMarks,
    otherMarks,
    courseName,
    user: req.userAuthId,
  });

  //send response
  res.json({
    status: "success",
    message: "Courses created successfully",
    courses,
  });
});

// @desc    Get all Coursess
// @route   GET /api/v1/Coursess
// @access  Public

export const getAllCoursesCtrl = asyncHandler(async (req, res) => {
  //await the query
  const courses = await Courses.find();
  res.json({
    status: "success",
    results: courses.length,
    message: "Coursess fetched successfully",
    courses,
  });
});

// @desc    Get single Courses
// @route   GET /api/Coursess/:id
// @access  Public

export const getCoursesCtrl = asyncHandler(async (req, res) => {
  const courses = await Courses.findById(req.params.id);
  if (!courses) {
    throw new Error("Course not found");
  }
  res.json({
    status: "success",
    message: "Courses fetched successfully",
    courses,
  });
});

// @desc    update  Courses
// @route   PUT /api/Coursess/:id/update
// @access  Private/Admin

export const updateCourseCtrl = asyncHandler(async (req, res) => {
  const { schoolMarks, otherMarks, courseName, status } = req.body;
  //validation

  //update
  const courses = await Courses.findByIdAndUpdate(
    req.params.id,
    {
      schoolMarks,
      otherMarks,
      courseName,
      status,
    },
    {
      new: true,
      runValidators: true,
    }
  );
  res.json({
    status: "success",
    message: "Courses updated successfully",
    courses,
  });
});

// @desc    delete  Courses
// @route   DELETE /api/Coursess/:id/delete
// @access  Private/Admin
export const deleteCourseCtrl = asyncHandler(async (req, res) => {
  await Courses.findByIdAndDelete(req.params.id);
  res.json({
    status: "success",
    message: "Course deleted successfully",
  });
});

export const getCoursesByMarksCtrl = async (req, res) => {
  try {
    const { schoolMarks, otherMarks } = req.body;

    console.log(req.body);

    // Query courses based on schoolMarks and otherMarks criteria
    const courses = await Courses.find({
      schoolMarks: { $lte: schoolMarks },
      otherMarks: { $lte: otherMarks },
    }).exec();

    res.status(200).json({ success: true, data: courses });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
