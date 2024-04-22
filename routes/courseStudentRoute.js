import exppress from "express";
import upload from "../config/fileUpload.js";
import {
  createCourseStudentCtrl,
  getAllCourseStudentCtrl,
  getCourseStudentCtrl,
  updateCourseStudentCtrl,
  deleteCourseStudentCtrl,
  getAllCourseStudentByUserCtrl,
  countStudentsByCourseNameCtrl as countCourse,
} from "../controllers/courseStudentCtrl.js";
import isAdmin from "../middlewares/isAdmin.js";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";

const courseRouter = exppress.Router();

courseRouter.post("/", isLoggedIn, createCourseStudentCtrl);
courseRouter.get("/", isLoggedIn, isAdmin, getAllCourseStudentCtrl);
courseRouter.get("/count-course", isLoggedIn, isAdmin, countCourse);
courseRouter.get("/get-by-user", isLoggedIn, getAllCourseStudentByUserCtrl);
courseRouter.get("/:id", getCourseStudentCtrl);
courseRouter.put("/:id", isLoggedIn, updateCourseStudentCtrl);
courseRouter.delete("/:id", isLoggedIn, deleteCourseStudentCtrl);
export default courseRouter;
