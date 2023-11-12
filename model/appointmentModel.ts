import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
 {
  doctorName: {
   type: String,
   require: true,
  },
  date: {
   type: String,
   require: true,
  },
  time: {
   type: String,
   require: true,
  },
  userEmail: {
   type: String,
   require: true,
  },
  fee: {
   type: Number,
   require: true,
  },
  commission: {
   type: Number,
   require: true,
  },
  ticket: {
   type: String,
   require: true,
  },
  invoice: {
   type: String,
   require: true,
  },
  paymentVerified: {
   type: Boolean,
   require: true,
   default: false,
  },
 },
 {
  timestamps: true,
 }
);

const Appointment =
 mongoose.models.appointment ||
 mongoose.model("appointment", appointmentSchema);

export default Appointment;
