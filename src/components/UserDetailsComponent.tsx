import UserHeader from "./UserHeader";
import UserTasksTable from "./UserTasksTable";

interface UserDetailsClientProps {
  userId: string;
}

import dbConnect from "@/db/dbConnect";
import { UserCollectionModel } from "@/models/usermodel";
import { TaskCollectionModel } from "@/models/taskmodel";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function UserDetailsComponent({
  userId,
}: UserDetailsClientProps) {
  const session = await auth();

  if (!session?.user) {
    // Redirect to login page if no session is found
    redirect("/login");
  }
  try {
    await dbConnect();

    const user = await UserCollectionModel.findOne({
      userId,
    }).populate("taskIds");

    if (!user) {
      throw new Error("User not found in path in 'srcapp[userId]page.tsx' ");
    }

    // Find tasks using the converted IDs
    const tasks = await TaskCollectionModel.find({
      _id: { $in: user.taskIds },
    }).lean();

    // Table component expects tasks in a plain javascript format
    const clientTasks = tasks.map((task) => ({
      _id: task._id.toString(),
      itemName: task.itemName,
      issuDate:
        typeof task.issuDate === "string"
          ? task.issuDate
          : new Date(task.issuDate).toISOString(),
      itemQuantity: task.itemQuantity,
      itemUnit: task.itemUnit,
      submitDate: task.submitDate
        ? new Date(task.submitDate).toISOString()
        : "",
      submitQuantity: task.submitQuantity,
      submitUnit: task.submitUnit,
      comment: task.comment,
      taskStatus: task.taskStatus,
      taskPrice: task.taskPrice,
      taskPayment: task.taskPayment,
      assignedTo: task.assignedTo?.toString(),
    }));

    // Pass user and tasks as separate props
    return (
      <div className="container mx-auto px-4 py-8">
        <UserHeader user={user} />
        <div className="mt-8">
          <UserTasksTable clientTasks={clientTasks} />
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error:", error);
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-red-500">
          {error instanceof Error ? error.message : "An error occurred"}
        </div>
      </div>
    );
  }
}
