"use client";

import React from "react";
import { Task } from "@/types/worker";
import WorkerTasksTable from "./WorkerTasksTable";
import WorkerHeader from "./WorkerHeader";

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
  return (
    <div className="p-4">
      <WorkerHeader workerId={workerSlug} tasks={data} />
      <br />
      <WorkerTasksTable tasks={data} />
    </div>
  );
}
