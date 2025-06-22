import { Input, Select,  } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { IUser } from "@/models/usermodel";
import Link from "next/link";
import Image from "next/image";

interface UsersListProps {
  users: IUser[];
}

export default function UserList({ users }: UsersListProps) {



 
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-100">
      {/* Header */}
      <div className="bg-white border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto py-8 px-6">
          <h2 className="text-xl font-bold mb-4 text-gray-800">
            কর্মীদের তালিকা
          </h2>
          <div className="flex flex-wrap gap-4 text-sm text-gray-500">
            <p>মোট কর্মী: {users.length} জন</p>
           
          </div>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="sticky top-0 z-10 backdrop-blur-md bg-white/60 shadow-sm border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto py-4 px-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <Input
              placeholder="নাম বা মোবাইল নম্বর দিয়ে খুঁজুন"
              prefix={<SearchOutlined className="text-gray-400" />}
              className="flex-grow max-w-md"
              value={"searchQuery"}
             
            />
            <Select
              placeholder="এলাকা বাছাই করুন"
              allowClear
              value={"locations"}
             
              className="min-w-[200px]"
              
            />
          </div>
        </div>
      </div>

      {/* User List */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {users.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500 text-lg">কোন কর্মী পাওয়া যায়নি</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {users.map((user) => (
              <Link
                key={user.userId}
                href={`/admin/${user.userId}`}
                className="block"
              >
                <div className="border rounded-lg p-4 hover:shadow-lg transition-shadow">
                  <div className="flex items-center gap-4">
                    <Image
                      src={`https://api.dicebear.com/7.x/personas/svg?seed=${user.userId}`}
                      alt={user.userName}
                      width={48}
                      height={48}
                      className="rounded-full"
                    />
                    <div>
                      <h3 className="text-lg font-semibold">
                        {user.userName}
                      </h3>
                      <p className="text-gray-600">{user.mobile}</p>
                    </div>
                  </div>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">{user.address}</p>
                    <div className="mt-2 flex justify-between items-center">
                      <span
                        className={`text-sm ${
                          user.userStatus === "active"
                            ? "text-green-500"
                            : "text-red-500"
                        }`}
                      >
                        {user.userStatus}
                      </span>
                      <span className="text-sm text-gray-600">
                        Ref: {user.reference}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
