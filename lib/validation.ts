import * as z from "zod";

export const loginSchema = z.object({
 email: z.string().email({
  message: "Enter valid emails.",
 }),
 password: z.string().min(6, {
  message: "Password must be at least 6 characters.",
 }),
});

export const signUpSchema = z.object({
 firstName: z.string().min(2, {
  message: "First Name must be at least 2 characters.",
 }),
 lastName: z.string().min(2, {
  message: "Last Name must be at least 2 characters.",
 }),
 email: z.string().email({
  message: "Enter a valid email address.",
 }),
 password: z.string().min(6, {
  message: "Password must be at least 6 characters.",
 }),
});

export const addDoctorSchema = z.object({
 name: z.string().min(6),
 title: z.string().min(6),
 desc: z.string().min(20),
 fee: z.coerce.number().positive().gt(0),
 commission: z.coerce.number().positive().gt(0),
 thumbnail: z.any(),
});
