"use client";

import React from "react";
import WorkerTasksTable from "./WorkerTasksTable";
import WorkerHeader from "./WorkerHeader";
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
  return (
    <div className="p-6 mx-auto space-y-8">
      <WorkerHeader workerId="WP123" name="আব্দুল করিম" tasks={data} />
      <WorkerTasksTable tasks={data} />
    </div>
  );
}
