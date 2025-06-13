"use client";

import React from "react";
import { Task } from "@/types/worker";
import WorkerTasksTable from "./WorkerTasksTable";

const data: Task[] = [
  {
    key: "1",
    item: "পকেট",
    issueDate: "2025-06-01",
    issueQuantity: 10,
    issueUnit: "পিস",
    submitDate: "2025-06-05",
    submitQuantity: 10,
    submitUnit: "পিস",
    comment: "সমাপ্ত",
    status: "complete",
    payment: "paid",
    amount: 1000,
  },
  {
    key: "2",
    item: "রিং জাল",
    issueDate: "2025-06-02",
    issueQuantity: 5,
    issueUnit: "বান্ডেল",
    submitDate: "2025-06-06",
    submitQuantity: 3,
    submitUnit: "বান্ডেল",
    comment: "আংশিক জমা",
    status: "partial",
    payment: "unpaid",
    amount: 600,
  },
  {
    key: "3",
    item: "লেজ",
    issueDate: "2025-06-03",
    issueQuantity: 8,
    issueUnit: "পিস",
    submitDate: "",
    submitQuantity: 0,
    submitUnit: "পিস",
    comment: "অপেক্ষমাণ",
    status: "pending",
    payment: "unpaid",
    amount: 800,
  },
];

interface WorkerDetailsClientProps {
  workerSlug: string;
}

export default function WorkerDetailsClient({
  workerSlug,
}: WorkerDetailsClientProps) {
  const totalAmount = data.reduce((sum, task) => sum + task.amount, 0);
  const paidAmount = data
    .filter((task) => task.payment === "paid")
    .reduce((sum, task) => sum + task.amount, 0);
  const dueAmount = totalAmount - paidAmount;

  return (
    <div className="p-4">
      {/* Worker Details Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200/50 p-6 mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center text-white text-2xl font-bold">
              {workerSlug.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                কর্মীর বিস্তারিত
              </h2>
              <p className="text-gray-500">Worker ID: #{workerSlug}</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <div className="px-4 py-2 rounded-full bg-blue-50 border border-blue-100">
              <p className="text-blue-600 font-medium">
                মোট কাজ: {data.length}
              </p>
            </div>
            <div className="px-4 py-2 rounded-full bg-green-50 border border-green-100">
              <p className="text-green-600 font-medium">
                সম্পন্ন:{" "}
                {data.filter((task) => task.status === "complete").length}
              </p>
            </div>
            <div className="px-4 py-2 rounded-full bg-amber-50 border border-amber-100">
              <p className="text-amber-600 font-medium">
                চলমান: {data.filter((task) => task.status === "partial").length}
              </p>
            </div>
          </div>
        </div>

        {/* Financial Stats */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="flex items-center gap-3 bg-purple-50 px-4 py-3 rounded-lg border border-purple-100">
            <div className="p-2 bg-purple-100 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-purple-600"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div>
              <p className="text-sm text-purple-600 font-medium">মোট টাকা</p>
              <p className="text-lg font-bold text-purple-700">
                ৳{totalAmount.toLocaleString()}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-emerald-50 px-4 py-3 rounded-lg border border-emerald-100">
            <div className="p-2 bg-emerald-100 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-emerald-600"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div>
              <p className="text-sm text-emerald-600 font-medium">পরিশোধিত</p>
              <p className="text-lg font-bold text-emerald-700">
                ৳{paidAmount.toLocaleString()}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-rose-50 px-4 py-3 rounded-lg border border-rose-100">
            <div className="p-2 bg-rose-100 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-rose-600"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div>
              <p className="text-sm text-rose-600 font-medium">বকেয়া</p>
              <p className="text-lg font-bold text-rose-700">
                ৳{dueAmount.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Tasks Table */}
      <WorkerTasksTable tasks={data} />
    </div>
  );
}
