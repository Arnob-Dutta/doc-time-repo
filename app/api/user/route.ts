import { connectMongoDb } from "@/lib/dbConnect";
import Users from "@/model/userModel";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {
 const data = await req.json();

 const { username, password, appointment } = data;

 try {
  await connectMongoDb();

  const res = await Users.create({
   username,
   password,
   appointment,
  });
  return NextResponse.json(
   { status: true, msg: "User Create success.", result: res },
   { status: 201 }
  );
 } catch (error) {
  return NextResponse.json(
   { status: false, msg: "Create user failed." },
   { status: 400 }
  );
 }
}
