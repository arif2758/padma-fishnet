"use client";

import React from "react";
import { Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";

// ✅ তারিখ ফরম্যাটার (YYYY-MM-DD → D Month)
const formatDate = (dateStr: string) => {
  if (!dateStr) return "";
  const [year, month, day] = dateStr.split("-");
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  return `${parseInt(day)} ${months[parseInt(month) - 1]}, ${year}`;
};

interface Task {
  key: string;
  item: string;
  issueDate: string;
  issueQuantity: number;
  issueUnit: "পিস" | "বান্ডেল";
  submitDate: string;
  submitQuantity: number;
  submitUnit: "পিস" | "বান্ডেল";
  comment: string;
  status: "pending" | "complete" | "partial";
  payment: "paid" | "unpaid";
}

const columns: ColumnsType<Task> = [
  {
    title: "Task No",
    dataIndex: "key",
    key: "key",
  },
  {
    title: "আইটেম",
    dataIndex: "item",
    key: "item",
  },
  {
    title: "ইস্যু তারিখ",
    dataIndex: "issueDate",
    key: "issueDate",
    render: (date) => formatDate(date),
  },
  {
    title: "পরিমাণ",
    key: "issueQuantity",
    render: (_, record) => `${record.issueQuantity} ${record.issueUnit}`,
  },
  {
    title: "জমা তারিখ",
    dataIndex: "submitDate",
    key: "submitDate",
    render: (date) => formatDate(date),
  },
  {
    title: "পরিমাণ",
    key: "submitQuantity",
    render: (_, record) => `${record.submitQuantity} ${record.submitUnit}`,
  },
  {
    title: "মন্তব্য",
    dataIndex: "comment",
    key: "comment",
  },
  {
    title: "স্ট্যাটাস",
    dataIndex: "status",
    key: "status",
    render: (status) => {
      let color = "blue";
      if (status === "complete") color = "green";
      else if (status === "pending") color = "volcano";
      else if (status === "partial") color = "gold";
      return <Tag color={color}>{status.toUpperCase()}</Tag>;
    },
  },
  {
    title: "পেমেন্ট",
    dataIndex: "payment",
    key: "payment",
    render: (payment) => (
      <Tag color={payment === "paid" ? "green" : "red"}>
        {payment.toUpperCase()}
      </Tag>
    ),
  },
];

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
  },
];

export default function WorkerDetails({
  params,
}: {
  params: { workerSlug: string };
}) {
  const { workerSlug } = params;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-2">কর্মীর বিস্তারিত</h2>
      <p className="text-gray-700 mb-4">আইডি: {workerSlug}</p>

      <Table
        columns={columns}
        dataSource={data}
        pagination={{ pageSize: 5 }}
        bordered
        rowKey="key"
      />
    </div>
  );
}
