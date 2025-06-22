import dbConnect from "@/db/dbConnect";
import { UserCollectionModel } from "@/models/usermodel";

import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  await dbConnect();

  // Extract only the fields that the front-end sends
  const { userName, mobile, address, password } = await request.json();

  // Basic validation to ensure fields are provided
  if (!userName || !mobile || !address || !password) {
    return new NextResponse(
      JSON.stringify({ message: "All fields are required." }),
      { status: 400 }
    );
  }

  try {
    // Check if the user already exists in DB by mobile number
    const isMobileAlreadyInDB = await UserCollectionModel.findOne({ mobile });
    if (isMobileAlreadyInDB) {
      return new NextResponse(
        JSON.stringify({
          message: `An account with mobile number ${mobile} already exists.`,
        }),
        { status: 409 } // Use a custom header to indicate mobile conflict
      );
    }

 
    const lastUser = await UserCollectionModel.findOne()
      .sort({ userId: -1 })
      .limit(1);
    const newUserId = lastUser ? parseInt(lastUser.userId) + 1 : 101;
    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create a new user object with only the required fields
    const newUser = {
      userId: newUserId,
      userName,
      mobile,
      address,
      password: hashedPassword,
      role: "user",
      createdAt: new Date(),
    };

    // Create user in the database
    await UserCollectionModel.create(newUser);

    return new NextResponse(
      JSON.stringify({
        message: `User ${userName} has been created successfully.`,
      }),
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating user:", error);
    return new NextResponse(
      JSON.stringify({ message: "Internal Server Error" }),
      { status: 500 }
    );
  }
};
