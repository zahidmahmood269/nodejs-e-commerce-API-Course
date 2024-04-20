import asyncHandler from "express-async-handler";

import CourseStudent from "../model/CourseStudent.js";

// @desc    Create new course
// @route   POST /api/v1/CourseStudent
// @access  Private/Admin
export const createCourseStudentCtrl = asyncHandler(async (req, res) => {
  const { schoolMarks, otherMarks, courseName } = req.body;

  //CourseStudent exists
  const courseStudentExists = await CourseStudent.findOne({ courseName });
  if (courseStudentExists) {
    throw new Error("Course Student Already Exists");
  }

  //create the CourseStudent
  const courseStudent = await CourseStudent.create({
    schoolMarks,
    otherMarks,
    courseName,
    user: req.userAuthId,
  });

  //send response
  res.json({
    status: "success",
    message: "Course Student created successfully",
    courseStudent,
  });
});

// @desc    Get all CourseStudents
// @route   GET /api/v1/CourseStudents
// @access  Public

export const getAllCourseStudentByUserCtrl = asyncHandler(async (req, res) => {
  const userId = req.userAuthId; // Assuming you have user id in your request
  //await the query
  const courseStudents = await CourseStudent.find({ user: userId }).populate(
    "user"
  );

  res.json({
    status: "success",
    results: courseStudents.length,
    message: "Course Students fetched successfully",
    courseStudents,
  });
});
export const getAllCourseStudentCtrl = asyncHandler(async (req, res) => {
  //await the query
  const courseStudents = await CourseStudent.find().populate("user");

  res.json({
    status: "success",
    results: courseStudents.length,
    message: "Course Students fetched successfully",
    courseStudents,
  });
});

// @desc    Get single CourseStudent
// @route   GET /api/CourseStudents/:id
// @access  Public

export const getCourseStudentCtrl = asyncHandler(async (req, res) => {
  const courseStudent = await CourseStudent.findById(req.params.id);
  if (!courseStudent) {
    throw new Error("Course not found");
  }
  res.json({
    status: "success",
    message: "Course Student fetched successfully",
    courseStudent,
  });
});

// @desc    update  CourseStudent
// @route   PUT /api/CourseStudents/:id/update
// @access  Private/Admin

export const updateCourseStudentCtrl = asyncHandler(async (req, res) => {
  const { schoolMarks, otherMarks, courseName, status } = req.body;
  //validation

  //update
  const courseStudent = await CourseStudent.findByIdAndUpdate(
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
    message: "Course Student updated successfully",
    courseStudent,
  });
});

// @desc    delete  CourseStudent
// @route   DELETE /api/CourseStudents/:id/delete
// @access  Private/Admin
export const deleteCourseStudentCtrl = asyncHandler(async (req, res) => {
  await CourseStudent.findByIdAndDelete(req.params.id);
  res.json({
    status: "success",
    message: "Course deleted successfully",
  });
});
