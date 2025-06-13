"use client";

import { Card, Avatar, Statistic } from "antd";
import { HiIdentification } from "react-icons/hi";
import { FaTasks, FaCheckCircle } from "react-icons/fa";
import { BsClockHistory } from "react-icons/bs";
import { BiMoney, BiMoneyWithdraw } from "react-icons/bi";
import { MdPendingActions } from "react-icons/md";
import { Task } from "@/types/worker";

interface WorkerHeaderProps {
  workerId: string;
  name?: string;
  tasks: Task[];
}

export default function WorkerHeader({
  workerId,
  name,
  tasks,
}: WorkerHeaderProps) {
  const totalAmount = tasks.reduce((sum, task) => sum + task.amount, 0);
  const paidAmount = tasks
    .filter((task) => task.payment === "paid")
    .reduce((sum, task) => sum + task.amount, 0);
  const dueAmount = totalAmount - paidAmount;

  return (
    <Card className="shadow-sm border-gray-200/50 mb-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Avatar
            size={64}
            icon={<HiIdentification className="text-3xl" />}
            className="bg-gradient-to-r from-blue-500 to-blue-600"
          />
          <div>
            <h2 className="text-xl font-bold text-gray-800">
              {name || "কর্মীর বিস্তারিত"}
            </h2>
            <p className="text-gray-500">Worker ID: #{workerId}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <Card className="!px-4 !py-2 rounded-full bg-blue-50 border-blue-100 shadow-none">
            <div className="flex items-center gap-2">
              <FaTasks className="text-blue-600" />
              <p className="text-blue-600 font-medium">
                মোট কাজ: {tasks.length}
              </p>
            </div>
          </Card>
          <Card className="!px-4 !py-2 rounded-full bg-green-50 border-green-100 shadow-none">
            <div className="flex items-center gap-2">
              <FaCheckCircle className="text-green-600" />
              <p className="text-green-600 font-medium">
                সম্পন্ন:{" "}
                {tasks.filter((task) => task.status === "complete").length}
              </p>
            </div>
          </Card>
          <Card className="!px-4 !py-2 rounded-full bg-amber-50 border-amber-100 shadow-none">
            <div className="flex items-center gap-2">
              <BsClockHistory className="text-amber-600" />
              <p className="text-amber-600 font-medium">
                চলমান:{" "}
                {tasks.filter((task) => task.status === "partial").length}
              </p>
            </div>
          </Card>
        </div>
      </div>

      {/* Financial Stats */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="!bg-purple-50 border-purple-100 shadow-none">
          <div className="flex items-center gap-3">
            <Avatar
              icon={<BiMoney className="text-xl" />}
              className="!bg-purple-100 !text-purple-600"
            />
            <Statistic
              title={<span className="text-purple-600">মোট টাকা</span>}
              value={totalAmount}
              prefix="৳"
              valueStyle={{ color: "#7e22ce" }}
            />
          </div>
        </Card>

        <Card className="!bg-emerald-50 border-emerald-100 shadow-none">
          <div className="flex items-center gap-3">
            <Avatar
              icon={<BiMoneyWithdraw className="text-xl" />}
              className="!bg-emerald-100 !text-emerald-600"
            />
            <Statistic
              title={<span className="text-emerald-600">পরিশোধিত</span>}
              value={paidAmount}
              prefix="৳"
              valueStyle={{ color: "#059669" }}
            />
          </div>
        </Card>

        <Card className="!bg-rose-50 border-rose-100 shadow-none">
          <div className="flex items-center gap-3">
            <Avatar
              icon={<MdPendingActions className="text-xl" />}
              className="!bg-rose-100 !text-rose-600"
            />
            <Statistic
              title={<span className="text-rose-600">বকেয়া</span>}
              value={dueAmount}
              prefix="৳"
              valueStyle={{ color: "#e11d48" }}
            />
          </div>
        </Card>
      </div>
    </Card>
  );
}
