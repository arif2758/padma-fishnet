"use client"; // This is a client component

import { useState } from "react";
import { Button, Form, Select, notification, message, InputNumber } from "antd";

const { Option } = Select;

interface TaskFormValues {
  userId: string;
  itemName: string;
  itemQuantity: number;
  itemUnit: string; // Added for unit (pcs or bundles)
}

function UploadTaskCoponent({ userId }: { userId: string }) {
  const [loading, setLoading] = useState(false);
  const [itemUnit, setItemUnit] = useState("বান্ডেল");

  const [form] = Form.useForm();

  const [api, contextHolder] = notification.useNotification();

  const onFinish = async (values: TaskFormValues) => {
    setLoading(true);
    try {
      const taskData = {
        userId,
        itemName: values.itemName,
        itemQuantity: values.itemQuantity,
        itemUnit,
      };
      console.log("Task Data:", taskData);

      const response = await fetch("/api/admin/upload-task", {
        method: "POST",
        body: JSON.stringify(taskData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();
      if (response.ok) {
        message.success("Task uploaded successfully!");

        form.resetFields();

        api.success({
          message: "Task Created",
          description:
            "Your task has been created successfully. Task details have been updated.",
          type: "success",
          showProgress: true,
          duration: 3,
          placement: "top",
        });
      } else {
        message.error(result.error || "Failed to upload task.");

        api.error({
          message: "Task Creation Failed",
          description: result.error || "Failed to upload task.",
          type: "error",
          duration: 3,
          showProgress: true,
          placement: "top",
        });
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Something went wrong.";
      message.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const selectAfterItemUnit = (
    <Select
      defaultValue="বান্ডেল"
      style={{ width: 100 }}
      value={itemUnit}
      onChange={(value) => setItemUnit(value)}
    >
      {" "}
      <Option value="বান্ডেল">বান্ডেল</Option>
      <Option value="pcs">pcs</Option>
    </Select>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      {contextHolder}

      <Form form={form} onFinish={onFinish} layout="vertical">
        <Form.Item
          label="আইটেমের নাম"
          name="itemName"
          rules={[{ required: true, message: "Please input the item name!" }]}
        >
          <Select placeholder="Select an item">
            <Option value="পাইপে রড ভরা">1. পাইপে রড ভরা</Option>
            <Option value="পাইপযুক্ত রড ভাঁজ করা">
              2. পাইপযুক্ত রড ভাঁজ করা
            </Option>
            <Option value="ভাঁজ করা রডের দুই প্রান্ত বাঁধা">
              3. ভাঁজ করা রডের দুই প্রান্ত বাঁধা
            </Option>
            <Option value="গিটার বাঁধা">4. গিটার বাঁধা</Option>
            <Option value="মেইন জালের বডি সেলাই">
              5. মেইন জালের বডি সেলাই
            </Option>
            <Option value="পকেট সেলাই">6. পকেট সেলাই</Option>
            <Option value="ক্রস সেলাই">7. ক্রস সেলাই</Option>
            <Option value="লাস্ট-গেইট সেলাই">8. লাস্ট-গেইট সেলাই</Option>
            <Option value="লেজের বডি সেলাই">9. লেজের বডি সেলাই</Option>
            <Option value="রিংজাল তৈরি">10. রিংজাল তৈরি</Option>
            <Option value="লেজের খাঁচি তৈরি">11. লেজের খাঁচি তৈরি</Option>
            <Option value="লেজ ফিটিং">12. লেজ ফিটিং</Option>
            <Option value="দোয়াইর তৈরি">13. দোয়াইর তৈরি</Option>
            <Option value="দোয়াইরের সাথে লেজের জয়েন দেওয়া">
              14. দোয়াইরের সাথে লেজের জয়েন দেওয়া
            </Option>
            <Option value="কম্প্রেস করে বাঁধা">15. কম্প্রেস করে বাঁধা</Option>
            <Option value="প্যাকেজিং করা">16. প্যাকেজিং করা</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="আইটেমের পরিমাণ"
          name="itemQuantity"
          rules={[
            { required: true, message: "Please input the item quantity!" },
          ]}
        >
          <InputNumber
            placeholder="Enter quantity"
            addonAfter={selectAfterItemUnit}
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default UploadTaskCoponent;
