"use client";

import { Tag } from "antd";
import { Task } from "@/types/worker";
import {
  FaList,
  FaCalendarAlt,
  FaBox,
  FaRegCommentDots,
  FaTasks,
} from "react-icons/fa";
import { BiMoney } from "react-icons/bi";
import { MdPayments } from "react-icons/md";

interface WorkerTasksTableProps {
  tasks: Task[];
  containerClassName?: string;
}

const statusColor = (status: string) => {
  if (status === "complete") return "green";
  if (status === "pending") return "volcano";
  if (status === "partial") return "gold";
  return "blue";
};

export default function WorkerTasksTable({
  tasks,
  containerClassName = "",
}: WorkerTasksTableProps) {
  return (
    <div
      className={`bg-white rounded-lg shadow-sm border border-gray-200/50 overflow-hidden ${containerClassName}`}
    >
      <div className="p-4 bg-gray-50 border-b border-gray-200/50">
        <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-800">
          <FaTasks />
          সকল কাজের তালিকা
        </h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-900">
                <div className="flex items-center gap-1">
                  <FaList className="text-gray-600" />
                  Task No
                </div>
              </th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-900">
                <div className="flex items-center gap-1">
                  <FaBox className="text-gray-600" />
                  আইটেম
                </div>
              </th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-900">
                <div className="flex items-center gap-1">
                  <FaCalendarAlt className="text-gray-600" />
                  ইস্যু তারিখ
                </div>
              </th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-900">
                পরিমাণ
              </th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-900">
                <div className="flex items-center gap-1">
                  <FaCalendarAlt className="text-gray-600" />
                  জমা তারিখ
                </div>
              </th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-900">
                পরিমাণ
              </th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-900">
                <div className="flex items-center gap-1">
                  <FaRegCommentDots className="text-gray-600" />
                  মন্তব্য
                </div>
              </th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-900">
                স্ট্যাটাস
              </th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-900">
                <div className="flex items-center gap-1">
                  <BiMoney className="text-gray-600" />
                  মূল্য
                </div>
              </th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-900">
                <div className="flex items-center gap-1">
                  <MdPayments className="text-gray-600" />
                  পেমেন্ট
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {tasks.map((task) => (
              <tr key={task.key} className="hover:bg-gray-50">
                <td className="py-3 px-4 text-sm text-gray-900">{task.key}</td>
                <td className="py-3 px-4 text-sm text-gray-900">{task.item}</td>
                <td className="py-3 px-4 text-sm text-gray-500">
                  {task.issueDate}
                </td>
                <td className="py-3 px-4 text-sm text-gray-500">
                  {task.issueQuantity} {task.issueUnit}
                </td>
                <td className="py-3 px-4 text-sm text-gray-500">
                  {task.submitDate || "-"}
                </td>
                <td className="py-3 px-4 text-sm text-gray-500">
                  {task.submitQuantity} {task.submitUnit}
                </td>
                <td className="py-3 px-4 text-sm text-gray-500">
                  {task.comment}
                </td>
                <td className="py-3 px-4">
                  <Tag
                    color={statusColor(task.status)}
                    className="min-w-[80px] text-center"
                  >
                    {task.status.toUpperCase()}
                  </Tag>
                </td>
                <td className="py-3 px-4 text-sm font-medium text-gray-900">
                  ৳{task.amount.toLocaleString()}
                </td>
                <td className="py-3 px-4">
                  <Tag
                    color={task.payment === "paid" ? "green" : "red"}
                    className="min-w-[80px] text-center"
                  >
                    {task.payment.toUpperCase()}
                  </Tag>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
