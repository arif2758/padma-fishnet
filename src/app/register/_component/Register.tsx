"use client";

import React, { useState } from "react";
import { Button, Form, Input, notification } from "antd";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { LockOutlined } from "@ant-design/icons";
import { MdOutlineLocalPhone } from "react-icons/md";

import { CiLocationOn, CiUser } from "react-icons/ci";

interface RegisterFormValues {
  userName: string;

  mobile: string;
  address: string;

  password: string;
}

const formItemLayout = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24 },
};

const tailFormItemLayout = {
  wrapperCol: {
    span: 24,
    offset: 0,
  },
};

const Register: React.FC = () => {
  const [form] = Form.useForm<RegisterFormValues>();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const [api, contextHolder] = notification.useNotification();

  const onFinish = async (values: RegisterFormValues) => {
    setLoading(true);
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const result = await response.json();

      if (response.ok) {
        api.success({
          message: "অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে!",
          description: result.message || "অ্যাকাউন্ট তৈরি সফল হয়েছে!",
          showProgress: true,
          duration: 2,
        });
        form.resetFields();
        setTimeout(() => router.push("/login"), 1500);
      } else {
        const errorType = response.headers.get("X-Error-Type");
        console.log(errorType);

        if (errorType === "email") {
          api.error({
            message: "ইমেইল কনফ্লিক্ট",
            description: "এই ইমেইল দিয়ে একটি অ্যাকাউন্ট আগে থেকেই রয়েছে!",
            showProgress: true,
            duration: 3,
          });
        } else if (errorType === "mobile") {
          api.error({
            message: "মোবাইল কনফ্লিক্ট",
            description:
              "এই মোবাইল নম্বর দিয়ে একটি অ্যাকাউন্ট আগে থেকেই রয়েছে!",
            showProgress: true,
            duration: 3,
          });
        } else {
          api.error({
            message: "রেজিস্ট্রেশন ব্যর্থ",
            description:
              result.message || "দুঃখিত, কিছু ত্রুটি ঘটেছে। আবার চেষ্টা করুন!",
            showProgress: true,
            duration: 3,
          });
        }
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        api.error({
          message: "সমস্যা হয়েছে",
          description: error.message,
          showProgress: true,
          duration: 3,
        });
      } else {
        api.error({
          message: "সমস্যা হয়েছে",
          description: "অজানা ত্রুটি",
          showProgress: true,
          duration: 3,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {contextHolder}
      <Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
        style={{ maxWidth: 360, margin: "auto" }}
        scrollToFirstError
      >
        <Form.Item
          name="userName"
          rules={[{ required: true, message: "আপনার নাম প্রদান করুন" }]}
        >
          <Input
            prefix={<CiUser />}
            placeholder="আপনার নাম"
            aria-label="Full Name"
          />
        </Form.Item>

        <Form.Item
          name="mobile"
          rules={[
            { required: true, message: "মোবাইল নাম্বার প্রদান করুন" },
            {
              pattern: /^[0-9]{11}$/,
              message: "শুধুমাত্র 11 সংখ্যার মোবাইল নাম্বার দিন!",
            },
          ]}
        >
          <Input
            prefix={<MdOutlineLocalPhone />}
            maxLength={11}
            placeholder="01XXXXXXXXX"
            inputMode="numeric"
          />
        </Form.Item>
        <Form.Item
          name="address"
          rules={[{ required: true, message: "আপনার এলাকার নাম প্রদান করুন" }]}
        >
          <Input
            prefix={<CiLocationOn />}
            maxLength={11}
            placeholder="আপানার এলাকার নাম বা রেফারেন্স"
          />
        </Form.Item>

        <Form.Item
          name="password"
          help="পাসওয়ার্ড কমপক্ষে ৮ ক্যারেক্টার হবে, বড় হাতের অক্ষর ও সংখ্যা থাকতে হবে"
          rules={[
            { required: true, message: "পাসওয়ার্ড প্রদান করুন" },
            { min: 8, message: "পাসওয়ার্ড কমপক্ষে ৮ ক্যারেক্টার হতে হবে" },
            {
              pattern: /[A-Z]/,
              message: "পাসওয়ার্ডে একটি বড় হাতের অক্ষর থাকতে হবে",
            },
            { pattern: /\d/, message: "পাসওয়ার্ডে একটি সংখ্যা থাকতে হবে" },
          ]}
          hasFeedback
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="একটি পাসওয়ার্ড দিন"
            maxLength={20}
          />
        </Form.Item>

        <Form.Item {...tailFormItemLayout}>
          <Button
            className="mt-6"
            type="primary"
            htmlType="submit"
            block
            loading={loading}
          >
            রেজিস্টার সম্পন্ন করুন
          </Button>
          <div className="mt-2 text-gray-600 text-center">
            <span>ইতিমধ্যে একটি অ্যাকাউন্ট রয়েছে?</span>
            <Link href="/login" className="text-blue-600">
              {" "}
              Login
            </Link>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Register;
