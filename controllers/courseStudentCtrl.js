import asyncHandler from "express-async-handler";

import CourseStudent from "../model/CourseStudent.js";

// @desc    Create new course
// @route   POST /api/v1/CourseStudent
// @access  Private/Admin
export const createCourseStudentCtrl = asyncHandler(async (req, res) => {
  const { schoolMarks, otherMarks, courseName } = req.body;
  const student = req.userAuthId;
  //CourseStudent exists
  const courseStudentExists = await CourseStudent.findOne({ student });
  if (courseStudentExists) {
    throw new Error("Student Course Already Registered");
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

export const countStudentsByCourseNameCtrl = asyncHandler(async (req, res) => {
  const courseCounts = await CourseStudent.aggregate([
    {
      $group: {
        _id: "$courseName",
        totalStudents: { $sum: 1 },
        courseStudents: { $push: "$$ROOT" }, // Push all documents for each courseName
      },
    },
    {
      $unwind: "$courseStudents", // Unwind the courseStudents array
    },
    {
      $lookup: {
        from: "users", // Assuming your User model collection name is "users"
        localField: "courseStudents.user",
        foreignField: "_id",
        as: "userDetails",
      },
    },
    {
      $addFields: {
        "courseStudents.userDetails": { $arrayElemAt: ["$userDetails", 0] }, // Get the first element of userDetails array
      },
    },
    {
      $group: {
        _id: "$_id",
        totalStudents: { $first: "$totalStudents" },
        courseStudents: { $push: "$courseStudents" }, // Group courseStudents back into an array
      },
    },
  ]);

  res.json({
    status: "success",
    results: courseCounts.length,
    message: "Total students counted by course name",
    courseCounts,
  });
});
