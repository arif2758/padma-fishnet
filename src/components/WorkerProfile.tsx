"use client";

import React from "react";
import { Tag } from "antd";
import WorkerTasksTable from "./WorkerTasksTable";

import { Task } from "@/types/worker";

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

export default function WorkerProfile() {
  const totalAmount = data.reduce((sum, task) => sum + task.amount, 0);
  const paidAmount = data
    .filter((task) => task.payment === "paid")
    .reduce((sum, task) => sum + task.amount, 0);
  const dueAmount = totalAmount - paidAmount;

  return (
    <div className="p-6  mx-auto space-y-8">
      {/* Profile Header Card */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200/50 p-6 mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="h-20 w-20 rounded-xl bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
              WP
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">আব্দুল করিম</h2>
              <p className="text-gray-500 flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                </svg>
                ইটভাটা পাড়া, চাঁদপুর
              </p>
              <p className="text-gray-500 flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                +880 1712-345678
              </p>
            </div>
          </div>

          <div className="flex flex-wrap md:flex-col gap-3 justify-end">
            <Tag color="blue" className="px-3 py-1 text-sm">
              ৫ বছরের অভিজ্ঞতা
            </Tag>
            <Tag color="green" className="px-3 py-1 text-sm">
              নিয়মিত কর্মী
            </Tag>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-gray-100">
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
            <p className="text-sm text-blue-600 mb-1">মোট কাজ</p>
            <p className="text-2xl font-bold text-blue-700">{data.length}</p>
          </div>
          <div className="bg-green-50 rounded-lg p-4 border border-green-100">
            <p className="text-sm text-green-600 mb-1">সম্পন্ন</p>
            <p className="text-2xl font-bold text-green-700">
              {data.filter((task) => task.status === "complete").length}
            </p>
          </div>
          <div className="bg-amber-50 rounded-lg p-4 border border-amber-100">
            <p className="text-sm text-amber-600 mb-1">চলমান</p>
            <p className="text-2xl font-bold text-amber-700">
              {data.filter((task) => task.status === "partial").length}
            </p>
          </div>
          <div className="bg-red-50 rounded-lg p-4 border border-red-100">
            <p className="text-sm text-red-600 mb-1">বাকি</p>
            <p className="text-2xl font-bold text-red-700">
              {data.filter((task) => task.status === "pending").length}
            </p>
          </div>
        </div>
      </div>
      {/* Financial Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200/50 p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-blue-600"
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
              <p className="text-sm text-gray-600">মোট মূল্য</p>
              <p className="text-2xl font-bold text-blue-600">
                ৳{totalAmount.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200/50 p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-100 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-green-600"
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
              <p className="text-sm text-gray-600">প্রাপ্ত অর্থ</p>
              <p className="text-2xl font-bold text-green-600">
                ৳{paidAmount.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200/50 p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-red-100 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-red-600"
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
              <p className="text-sm text-gray-600">বকেয়া অর্থ</p>
              <p className="text-2xl font-bold text-red-600">
                ৳{dueAmount.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>{" "}
      {/* Task List */}
      <WorkerTasksTable tasks={data} />
    </div>
  );
}
