"use client";

import React from "react";
import { Tag, Card, Statistic, Row, Col, } from "antd";

const formatDate = (dateStr: string) => {
  if (!dateStr) return "";
  const [year, month, day] = dateStr.split("-");
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
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
  amount: number;
}

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

const statusColor = (status: string) => {
  if (status === "complete") return "green";
  if (status === "pending") return "volcano";
  if (status === "partial") return "gold";
  return "blue";
};

const paymentColor = (payment: string) =>
  payment === "paid" ? "green" : "red";

export default function WorkerProfile() {
  const totalAmount = data.reduce((sum, task) => sum + task.amount, 0);
  const paidAmount = data
    .filter((task) => task.payment === "paid")
    .reduce((sum, task) => sum + task.amount, 0);
  const dueAmount = totalAmount - paidAmount;

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-8">
      <h2 className="text-3xl font-extrabold text-gray-800 mb-6">
        কর্মী প্রোফাইল
      </h2>

      <Row gutter={[16, 16]} justify="space-around">
        <Col xs={24} sm={8}>
          <Card className="shadow-md rounded-lg text-center">
            <Statistic
              title="মোট মূল্য"
              value={totalAmount}
              suffix="৳"
              valueStyle={{ color: "#3b82f6", fontWeight: "bold" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card className="shadow-md rounded-lg text-center">
            <Statistic
              title="প্রাপ্ত অর্থ"
              value={paidAmount}
              suffix="৳"
              valueStyle={{ color: "green", fontWeight: "bold" }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card className="shadow-md rounded-lg text-center">
            <Statistic
              title="বকেয়া অর্থ"
              value={dueAmount}
              suffix="৳"
              valueStyle={{ color: "red", fontWeight: "bold" }}
            />
          </Card>
        </Col>
      </Row>


      {/* ভার্টিক্যাল কার্ড লিস্ট */}
      <div className="space-y-6">
        {data.map((task) => (
          <Card key={task.key} className="shadow-lg rounded-lg p-4">
            <h3 className="text-xl font-semibold mb-4">
              Task {task.key} - {task.item}
            </h3>
            <div className="grid grid-cols-[120px_1fr] gap-y-3 gap-x-6 text-gray-800">
              <div className="font-semibold">প্রদান:</div>

              <div>
                {" "}
                <span>
                  {task.issueQuantity} {task.issueUnit};{" "}
                </span>{" "}
                {formatDate(task.issueDate)}
              </div>

              <div className="font-semibold">জমা</div>
              <div>
                {" "}
                <span>
                  {task.submitQuantity} {task.submitUnit};{" "}
                </span>{" "}
                {task.submitDate ? formatDate(task.submitDate) : "-"}
              </div>

              <div className="font-semibold">স্ট্যাটাস:</div>
              <div>
                <Tag color={statusColor(task.status)}>
                  {task.status.toUpperCase()}
                </Tag>
              </div>

              <div className="font-semibold">মন্তব্য:</div>
              <div>{task.comment || "-"}</div>

              <div className="font-semibold">মূল্য:</div>
              <div>{task.amount.toLocaleString()} ৳</div>
              <div className="font-semibold">পেমেন্ট:</div>
              <div>
                <Tag color={paymentColor(task.payment)}>
                  {task.payment.toUpperCase()}
                </Tag>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
