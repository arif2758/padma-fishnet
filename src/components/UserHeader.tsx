import { Card, Avatar, Statistic, Tag } from "antd";
import { HiIdentification } from "react-icons/hi";
import { BiMoney, BiMoneyWithdraw } from "react-icons/bi";
import { IUser } from "@/models/usermodel";
import UploadTaskModal from "./UploadTaskModal";
import { calculateAmount } from "@/action/calculateAmount";
import { auth } from "@/auth";

type LeanDocument<T> = Omit<T, keyof Document>;

interface UserHeaderProps {
  user: LeanDocument<IUser>;
  isAdminPage: boolean;
}

export default async function UserHeader({
  user,
  isAdminPage,
}: UserHeaderProps) {
  const amounts = await calculateAmount(user.userId);
  const session = await auth();
  if (!session?.user) return null;

  return (
    <Card
      className="w-full rounded-2xl shadow-md border border-gray-200 bg-white "
      styles={{
        body: { padding: 0 },
      }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex justify-between items-center  px-4 py-2">
          {/* User Profile */}
          <div className="flex items-center gap-4">
            <Avatar
              size={80}
              src={user.avatarImage || "/default-avatar.png"}
              alt={user.userName || "User Avatar"}
              className="ring-2 ring-blue-500"
            />
            <div>
              <h2 className="text-xl font-bold text-gray-800">
                {user?.userName}
              </h2>
              <p className="text-gray-500">
                <HiIdentification className="inline mr-1 text-blue-400" />
                <span className="font-mono text-sm">ID: {user?.userId}</span>
              </p>
              <Tag
                color={user.userStatus === "active" ? "green" : "red"}
                className="mt-2 text-sm"
              >
                {user.userStatus.toUpperCase()}
              </Tag>
            </div>
          </div>

          {/* Upload Button */}
          {isAdminPage && session?.user?.role === "admin" && (
            <div>
              <UploadTaskModal userId={user.userId} />
            </div>
          )}
        </div>

        {/* Payment Statistics */}
        <div className="flex flex-wrap gap-4 md:py-8 justify-center md:justify-end md:mr-2">
          <Card>
            <Statistic
              title={<span className="text-blue-800">Total Amount</span>}
              value={amounts.totalAmount}
              prefix={<BiMoney className="text-blue-600" />}
              valueStyle={{ color: "#1E40AF" }}
            />
          </Card>

          <Card>
            <Statistic
              title={<span className="text-green-800">Paid Amount</span>}
              value={amounts.paidAmount}
              prefix={<BiMoneyWithdraw className="text-green-600" />}
              valueStyle={{ color: "#166534" }}
            />
          </Card>

          <Card>
            <Statistic
              title={<span className="text-red-800">Unpaid Amount</span>}
              value={amounts.unPaidAmount}
              prefix={<BiMoneyWithdraw className="text-red-600" />}
              valueStyle={{ color: "#991B1B" }}
            />
          </Card>
        </div>
      </div>
    </Card>
  );
}
