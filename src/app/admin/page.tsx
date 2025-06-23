import UserList from "@/components/UserList";
import dbConnect from "@/db/dbConnect";
import { UserCollectionModel } from "@/models/usermodel";

export default async function AdminHome() {
  await dbConnect();

  // Fetch users directly from MongoDB
  const users = await UserCollectionModel.find({
    role: { $ne: "admin" },
  }).lean();

  return (
    <main className="min-h-screen p-4">
      <UserList users={users} />
    </main>
  );
}
