import { Card, Tag } from "antd";

import { IUser } from "@/models/usermodel";
import Link from "next/link";
import { FaRegUser } from "react-icons/fa";
import { BsTelephone } from "react-icons/bs";
import { CiLocationOn } from "react-icons/ci";

interface UsersListProps {
  users: IUser[];
}

export default function UserList({ users }: UsersListProps) {
  return (
    <div>
      {/* Header */}

      <div className="max-w-7xl mx-auto py-8 px-6">
        <h2 className="text-xl font-bold mb-4 text-gray-800">
          কর্মীদের তালিকা
        </h2>
        <div className="flex flex-wrap gap-4 text-sm text-gray-500">
          <p>মোট কর্মী: {users.length} জন</p>
        </div>
      </div>

      {/* User List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {users.map((user) => (
          <Link key={user.userId} href={`/admin/${user.userId}`}>
            <Card
              size="small"
              hoverable
              title={
                <Tag bordered={false} color="blue">
                  ID: {user.userId}
                </Tag>
              }
              extra={
                <span
                  className={`text-sm ${
                    user.userStatus === "active"
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {user.userStatus}
                </span>
              }
            >
              <div>
                <div className="flex gap-2 items-center mb-3">
                  <FaRegUser />
                  <h1 className="text-lg font-medium text-gray-800">
                    {user.userName}
                  </h1>
                </div>

                <div className="flex gap-2 items-center mb-3">
                  <BsTelephone />
                  <p className="text-gray-600">{user.mobile}</p>
                </div>
                <div className="flex gap-2 items-center flex-wrap">
                  <CiLocationOn />
                  <p>{user.address}</p>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
