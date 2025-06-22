import { NextResponse } from "next/server";
import dbConnect from "@/db/dbConnect";
import { UserCollectionModel } from "@/models/usermodel";
import { TaskCollectionModel } from "@/models/taskmodel";
import mongoose from "mongoose";
import { PaymentStatus, TaskStatus } from "@/models/enumType";
import { calculateTaskPrice,  } from "@/utils/priceMap";

export async function POST(request: Request) {
  try {
    // 1. Connect to database
    await dbConnect();

    // 2. Validate request body
    const body = await request.json();
    const { userId, itemName, itemQuantity, itemUnit } = body;

    if (!userId || !itemName || !itemQuantity || !itemUnit) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // 3. Find user and validate
    const user = await UserCollectionModel.findOne({ userId });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

 // Calculate Task Price based on itemQuantity and a fixed price per unit

const taskPrice = calculateTaskPrice(itemName, itemQuantity, itemUnit);

    // 5. Create new task with proper validation
    const taskData = {
    
      itemName,
      issuDate: new Date(),
      itemQuantity,
      itemUnit,
      submitQuantity: 0, // Initialize with 0
      submitUnit: "pcs", // Same as issue unit
      taskStatus: TaskStatus.PROCESSING,
      taskPrice: taskPrice , // Initialize with 0
      taskPayment: PaymentStatus.UNPAID,
      assignedTo: user._id,
    };

    // 6. Create and save the task
    const task = new TaskCollectionModel(taskData);
    await task.save();

    // 7. Update user's taskIds array
    await UserCollectionModel.findByIdAndUpdate(
      user._id,
      {
        $push: { taskIds: task._id },
      },
      { new: true }
    );

    // 8. Return success response with created task
    return NextResponse.json(
      {
        message: "Task created successfully",
        task: {
          id: task._id,
          itemName: task.itemName,
          issuDate: task.issuDate,
          status: task.taskStatus,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error in task creation:", error);

    // Handle specific MongoDB errors
    if (error instanceof mongoose.Error.ValidationError) {
      return NextResponse.json(
        { error: "Invalid data provided" },
        { status: 400 }
      );
    }

    // Generic error response
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
