"use client";
import React, { useState, useEffect } from "react";
import { Table, Tag, Select, Modal, Input, message } from "antd";
import type { ColumnsType } from "antd/es/table";
import { IClientTask, PaymentStatus, TaskStatus } from "@/models/enumType";
import { FaRegEdit } from "react-icons/fa";
import { useSession } from "next-auth/react";

// Color function for Task Status
const statusColor = (status: TaskStatus) => {
  switch (status) {
    case TaskStatus.COMPLETE:
      return "green";
    case TaskStatus.PROCESSING:
      return "blue";
    case TaskStatus.PARTIAL:
      return "gold";
    default:
      return "default";
  }
};

// Date formatter
const formatDate = (date: string | Date) => {
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "long",
  };
  return new Date(date).toLocaleDateString("en-GB", options);
};

interface UserTasksTableProps {
  clientTasks: IClientTask[];
}

const { Option } = Select;

export default function UserTasksTable({ clientTasks }: UserTasksTableProps) {
  const [loading, setLoading] = useState<{ [key: string]: boolean }>({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState<string>("");
  const [commentText, setCommentText] = useState("");
  const [tableLoading, setTableLoading] = useState(true);
  const [tasks, setTasks] = useState<IClientTask[]>([]);

  const { data: session } = useSession();
  useEffect(() => {
    // Simulate loading delay for smooth transition
    const timer = setTimeout(() => {
      setTasks(clientTasks);
      setTableLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [clientTasks]);

  const updateTask = async (taskId: string, data: Partial<IClientTask>) => {
    setLoading({ ...loading, [taskId]: true });
    try {
      const response = await fetch(`/api/tasks/${taskId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to update task");
      }

      // Update the local tasks state after successful API call
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === taskId ? { ...task, ...data } : task
        )
      );

      message.success("Updated successfully");
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to update.";
      message.error(errorMessage);
    } finally {
      setLoading({ ...loading, [taskId]: false });
    }
  };

  const handleOpenModal = (taskId: string, comment: string) => {
    setSelectedTaskId(taskId);
    setCommentText(comment || "");
    setIsModalOpen(true);
  };

  const handleUpdateComment = async () => {
    if (!selectedTaskId) return;
    await updateTask(selectedTaskId, { comment: commentText });
    setIsModalOpen(false);
  };

  const columns: ColumnsType<IClientTask> = [
    {
      title: "SN",
      render: (_, __, index) => index + 1,
      width: 60,
    },
    {
      title: "Date",
      dataIndex: "issuDate",
      render: (date) => formatDate(date),
    },
    {
      title: "Item",
      dataIndex: "itemName",
    },
    {
      title: "Quantity",
      render: (_, record) => `${record.itemQuantity} ${record.itemUnit}`,
    },
    {
      title: "Submit",
      dataIndex: "submitDate",
      render: (date) => (date ? formatDate(date) : "-"),
    },
    {
      title: "Quantity",
      dataIndex: "submitQuantity",
    },
    {
      title: "Comment",
      key: "comment",
      render: (_, record: IClientTask) => {
        return session?.user?.role === "admin" ? (
          <div className="flex items-center gap-2">
            <span>{record.comment || "-"}</span>
            <button
              onClick={() => handleOpenModal(record._id, record.comment || "")}
            >
              <FaRegEdit />
            </button>
          </div>
        ) : (
          <div>{record.comment || "-"}</div>
        );
      },
    },
    {
      title: "Status",
      key: "taskStatus",
      render: (_, record: IClientTask) => {
        return session?.user?.role === "admin" ? (
          <Select
            variant="borderless"
            value={record.taskStatus}
            onChange={(value) =>
              updateTask(record._id, { taskStatus: value as TaskStatus })
            }
            loading={loading[record.taskStatus]}
            style={{
              width: 120,
            }}
          >
            {Object.values(TaskStatus).map((status) => (
              <Option key={status} value={status}>
                <Tag color={statusColor(status)} style={{ marginRight: "0px" }}>
                  {status}
                </Tag>
              </Option>
            ))}
          </Select>
        ) : (
          <div>
            {" "}
            <Tag
              color={statusColor(record.taskStatus)}
              style={{ marginRight: "0px" }}
            >
              {record.taskStatus}
            </Tag>
          </div>
        );
      },
    },
    {
      title: "Payment",
      key: "taskPayment",
      render: (_, record: IClientTask) => {
        return session?.user?.role === "admin" ? (
          <Select
            variant="borderless"
            value={record.taskPayment}
            onChange={(value) => updateTask(record._id, { taskPayment: value })}
            loading={loading[record.taskPayment]}
            style={{ width: 120 }}
          >
            {Object.values(PaymentStatus).map((payment) => (
              <Option key={payment} value={payment}>
                <Tag
                  style={{ marginRight: "0px" }}
                  color={payment === PaymentStatus.PAID ? "green" : "red"}
                >
                  {payment}
                </Tag>
              </Option>
            ))}
          </Select>
        ) : (
          <div>
            {" "}
            <Tag
              color={
                record.taskPayment === PaymentStatus.PAID ? "green" : "red"
              }
              style={{ marginRight: "0px" }}
            >
              {record.taskPayment}
            </Tag>{" "}
          </div>
        );
      },
    },
    {
      title: "Price",
      dataIndex: "taskPrice",
      render: (price) => `৳${price}`,
    },
  ];

  return (
    <>
      <Table
        dataSource={tasks}
        columns={columns}
        rowKey="_id"
        loading={tableLoading}
        pagination={{
          total: tasks.length,
          pageSize: 10,
          showSizeChanger: true,
          showTotal: (total) => `Total ${total} items`,
        }}
        scroll={{ x: true }}
        size="small"
      />

      <Modal
        title="Edit Comment"
        open={isModalOpen}
        onOk={handleUpdateComment}
        onCancel={() => setIsModalOpen(false)}
        confirmLoading={loading[selectedTaskId]}
      >
        <Input.TextArea
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          rows={4}
          placeholder="Enter comment..."
        />
      </Modal>
    </>
  );
}
