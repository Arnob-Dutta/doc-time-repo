import { connectMongoDb } from "@/lib/dbConnect";
import Users from "@/model/userModel";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {
 const data = await req.json();

 const { username, password } = data;

 try {
  await connectMongoDb();

  const res = await Users.findOne({ username, password });
  return NextResponse.json(
   { status: true, msg: "User found success.", result: res },
   { status: 200 }
  );
 } catch (error) {
  return NextResponse.json(
   { status: false, msg: "User not found." },
   { status: 400 }
  );
 }
}
