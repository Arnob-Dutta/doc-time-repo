"use server";

import Doctors from "@/model/doctorModel";
import { connectMongoDb } from "@/lib/dbConnect";
import { revalidatePath } from "next/cache";

interface Doctor {
 name: string;
 title: string;
 thumbnail: string;
 desc: string;
 fee: number;
 commission: number;
 specialty: string;
 path: string;
}

export async function addDoctor({
 name,
 commission,
 desc,
 fee,
 thumbnail,
 title,
 specialty,
 path,
}: Doctor) {
 try {
  connectMongoDb();

  const res = await Doctors.create({
   name,
   title,
   fee,
   thumbnail,
   desc,
   commission,
   specialty,
  });
  revalidatePath(path);
  return res;
 } catch (error: any) {
  throw new Error(`Failed to add doctor: ${error.message}`);
 }
}

// =========================================

export async function getDoctors() {
 try {
  connectMongoDb();

  const res = await Doctors.find();
  return res;
 } catch (error: any) {
  throw new Error(`Failed to find doctor: ${error.message}`);
 }
}
export async function getSingleDoctors({ uid }: { uid: string }) {
 try {
  connectMongoDb();

  const res = await Doctors.findOne({ _id: uid });

  return res;
 } catch (error: any) {
  throw new Error(`Failed to find doctor: ${error.message}`);
 }
}
export async function deleteSingleDoctors({ uid }: { uid: string }) {
 try {
  connectMongoDb();

  const res = await Doctors.findOneAndDelete({ _id: uid });

  return res;
 } catch (error: any) {
  throw new Error(`Failed to delete doctor: ${error.message}`);
 }
}
