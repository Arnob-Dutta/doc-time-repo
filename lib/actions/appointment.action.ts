"use server";

import Appointment from "@/model/appointmentModel";
import { connectMongoDb } from "@/lib/dbConnect";
import { uuid } from "../utils";
import Users from "@/model/userModel";
import { revalidatePath } from "next/cache";

type Appointment = {
 doctorName: string;
 date: string | undefined;
 time: string;
 userEmail: string | null | undefined;
 fee: number;
 commission: number;
};

export async function createAppointment({
 commission,
 date,
 doctorName,
 fee,
 time,
 userEmail,
}: Appointment) {
 try {
  connectMongoDb();

  const ticket = uuid(6);
  const invoice = uuid(18);

  const res = await Appointment.create({
   doctorName,
   date,
   time,
   userEmail,
   fee,
   commission,
   ticket,
   invoice,
  });
  revalidatePath("/user");
  return res;
 } catch (error: any) {
  throw new Error(`Failed to add appointment: ${error.message}`);
 }
}

// =========================================

export async function getAppointment() {
 try {
  connectMongoDb();

  const res = await Appointment.find();
  return res;
 } catch (error: any) {
  throw new Error(`Failed to find appointment: ${error.message}`);
 }
}

export async function getAppointmentByUser({
 email,
}: {
 email: string | null | undefined;
}) {
 try {
  connectMongoDb();

  const res = await Appointment.find({ userEmail: email });
  return res;
 } catch (error: any) {
  throw new Error(`Failed to find appointment: ${error.message}`);
 }
}

export async function getSingleAppointment({ aid }: { aid: string }) {
 try {
  connectMongoDb();

  const res = await Appointment.findOne({ _id: aid });
  return res;
 } catch (error: any) {
  throw new Error(`Failed to find appointment: ${error.message}`);
 }
}
export async function getCommissionFromAppointment() {
 try {
  connectMongoDb();

  const res = await Appointment.aggregate([
   { $group: { _id: null, amount: { $sum: "$commission" } } },
  ]).exec();

  return res;
 } catch (error: any) {
  throw new Error(`Failed to find appointment: ${error.message}`);
 }
}
