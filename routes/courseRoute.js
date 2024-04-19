import exppress from "express";
import upload from "../config/fileUpload.js";
import {
  createCoursesCtrl,
  getAllCoursesCtrl,
  getCoursesCtrl,
  updateCourseCtrl,
  deleteCourseCtrl,
  getCoursesByMarksCtrl,
} from "../controllers/courseCtrl.js";
import isAdmin from "../middlewares/isAdmin.js";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";

const courseRouter = exppress.Router();

courseRouter.post("/", isLoggedIn, isAdmin, createCoursesCtrl);
courseRouter.get("/", getAllCoursesCtrl);
courseRouter.post("/get-courses", getCoursesByMarksCtrl);
courseRouter.get("/:id", getCoursesCtrl);
courseRouter.put("/:id", isLoggedIn, isAdmin, updateCourseCtrl);
courseRouter.delete("/:id", isLoggedIn, isAdmin, deleteCourseCtrl);
export default courseRouter;
