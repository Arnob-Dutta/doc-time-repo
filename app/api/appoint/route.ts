import { connectMongoDb } from "@/lib/dbConnect";
import Users from "@/model/userModel";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {
 const data = await req.json();

 const { username } = data;

 try {
  await connectMongoDb();

  const res = await Users.findOne({ username });
  return NextResponse.json(
   { status: true, msg: "Appointment found success.", result: res },
   { status: 201 }
  );
 } catch (error) {
  return NextResponse.json(
   { status: false, msg: "Appointment not found." },
   { status: 400 }
  );
 }
}
