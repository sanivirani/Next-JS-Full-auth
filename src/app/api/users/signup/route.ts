import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { username, email, password } = reqBody;

    console.log(reqBody);

    // check if user already exits
    const user = await User.findOne({ email });

    if (user) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    // hash password

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    // console.log("hashedPassword", hashedPassword);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    console.log("newUser", newUser);

    const savedUser = await newUser.save();
    console.log("savedUser", savedUser);

    // send verification email
    // --- note:: emailType : also should be [env and enemaration or constant (const) file] ---//

    await sendEmail({ email, emailType: "VERIFY", userId: savedUser._id });

    return NextResponse.json({
      message: "User create successfully",
      success: true,
      savedUser,
    });
  } catch (error: any) {
    console.log("Err", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
