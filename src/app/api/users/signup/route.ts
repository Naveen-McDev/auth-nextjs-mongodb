import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

connect();

export async function POST(request: NextRequest) {
  try {
    // get the request
    const reqBody = await request.json();

    // destructure the body
    const { username, email, password } = reqBody;

    // check if already exist
    const userExist = await User.findOne({ email });

    // if exist, throw error
    if (userExist) {
      return NextResponse.json(
        { error: "User Already Exist" },
        { status: 400 }
      );
    }

    // hash password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = new User({ username, email, password: hashedPassword });
    const savedUser = await newUser.save();

    return NextResponse.json(
      {
        message: "User Saved Successfully",
        success: true,
        savedUser,
      },
      {
        status: 201,
      }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
