"use server";

import dbConnect from "@/db/dbConnect";
import { UserCollectionModel } from "@/models/usermodel";
import { PaymentStatus, TaskStatus } from "@/models/enumType";
import { ITask } from "@/models/taskmodel";

export async function calculateAmount(userId: string) {
  try {
    await dbConnect();

    const user = await UserCollectionModel.findOne({ userId })
      .populate({ path: "taskIds", model: "TaskCollection" })
      .lean();

    if (!user) throw new Error("User not found");

    const tasks = (user.taskIds as unknown as ITask[]) || [];

    const totalAmount = tasks
      .filter((task) => task.taskStatus === TaskStatus.COMPLETE)
      .reduce((sum, task) => sum + (task.taskPrice || 0), 0);

    const paidAmount = tasks
      .filter((task) => task.taskPayment === PaymentStatus.PAID)
      .reduce((sum, task) => sum + (task.taskPrice || 0), 0);

    const unPaidAmount = totalAmount - paidAmount;

    return { totalAmount, paidAmount, unPaidAmount };
  } catch (err) {
    console.error("Amount calculation error:", err);
    throw err;
  }
}
