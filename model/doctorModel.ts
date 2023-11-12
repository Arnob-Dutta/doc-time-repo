import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema(
 {
  name: {
   type: String,
   require: true,
  },
  title: {
   type: String,
   require: true,
  },
  fee: {
   type: Number,
   require: true,
  },
  thumbnail: {
   type: String,
   require: true,
  },
  desc: {
   type: String,
   require: true,
  },
  commission: {
   type: Number,
   require: true,
   default: 0,
  },
  specialty: {
   type: String,
   require: true,
  },
 },
 {
  timestamps: true,
 }
);

const Doctors =
 mongoose.models.doctors || mongoose.model("doctors", doctorSchema);

export default Doctors;
