//product schema
import mongoose from "mongoose";
const Schema = mongoose.Schema;

const CourseSchema = new Schema(
  {
    schoolMarks: {
      type: Number,
      required: true,
    },
    otherMarks: {
      type: Number,
      required: true,
    },
    courseName: {
      type: String,
      required: true,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },

    status: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
);

const Courses = mongoose.model("Courses", CourseSchema);

export default Courses;
