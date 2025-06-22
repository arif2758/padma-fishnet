import { NextResponse } from "next/server";
import dbConnect from "@/db/dbConnect";
import { TaskCollectionModel } from "@/models/taskmodel";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ taskId: string }> }
) {
  try {
    await dbConnect();
    const { taskId } = await params;
    const body = await request.json();

    const task = await TaskCollectionModel.findByIdAndUpdate(
      taskId,
      { $set: body },
      { new: true }
    );

    if (!task) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      task: {
        _id: task._id.toString(),
        taskStatus: task.taskStatus,
        taskPayment: task.taskPayment,
      },
    });
  } catch (error) {
    console.error("Error updating task:", error);
    return NextResponse.json({ error: "Error updating task" }, { status: 500 });
  }
}
