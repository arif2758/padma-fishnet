"use client";

import React, { useState } from "react";
import { LockOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Flex, notification, Card } from "antd";
import { MdOutlineLocalPhone } from "react-icons/md";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

interface SignInFormValues {
  mobile: string;
  password: string;
  remember?: boolean;
}

const LoginComponent: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [api, contextHolder] = notification.useNotification();
  const router = useRouter();

  const onFinish = async (values: SignInFormValues) => {
    if (loading) return;
    setLoading(true);
    api.destroy();

    try {
      const result = await signIn("credentials", {
        redirect: false,
        mobile: values.mobile,
        password: values.password,
        remember: values.remember,
      });

      if (!result?.ok) {
        api.error({
          message: "লগইন ব্যর্থ",
          description:
            result?.error === "Invalid mobile or password"
              ? "মোবাইল অথবা পাসওয়ার্ড ভুল"
              : "লগইন করা সম্ভব হয়নি, আবার চেষ্টা করুন",
          key: "login",
          placement: "topRight",
          duration: 3,
          showProgress: true,
        });
        return;
      }

      api.success({
        message: "সফল",
        description: "সফলভাবে লগইন হয়েছে!",
        key: "login",
        placement: "topRight",
        duration: 3,
        showProgress: true,
      });

      router.push("/profile");
    } catch (error) {
      console.error("Login error:", error);
      api.error({
        message: "লগইন ব্যর্থ",
        description: "কিছু একটা সমস্যা হয়েছে, আবার চেষ্টা করুন",
        key: "login",
        placement: "topRight",
        duration: 3,
        showProgress: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {contextHolder}
      <Card className="w-full max-w-[480px] shadow-md" variant="borderless">
        <Form
          name="login"
          form={form}
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="mobile"
            rules={[
              {
                required: true,
                message: "অনুগ্রহ করে আপনার মোবাইল নম্বর দিন!",
              },
              {
                pattern: /^[0-9]{11}$/, // মোবাইল নম্বরের জন্য ১১ সংখ্যার প্যাটার্ন
                message: "শুধুমাত্র ১১ সংখ্যার মোবাইল নম্বর দিন!",
              },
            ]}
          >
            <Input
              prefix={<MdOutlineLocalPhone className="text-gray-400" />}
              type="tel" // মোবাইল নম্বরের জন্য type="tel"
              placeholder="01XXXXXXXXX"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              { required: true, message: "অনুগ্রহ করে আপনার পাসওয়ার্ড দিন!" },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className="text-gray-400" />}
              placeholder="পাসওয়ার্ড"
            />
          </Form.Item>

          <Form.Item>
            <Flex justify="space-between" align="center">
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>মনে রাখুন</Checkbox>
              </Form.Item>
              <Link
                href="/forgot-password"
                className="text-blue-600 hover:text-blue-700"
                onClick={(e) => {
                  if (loading) {
                    e.preventDefault();
                  }
                }}
              >
                পাসওয়ার্ড ভুলে গেছেন?
              </Link>
            </Flex>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              loading={loading}
              className="bg-blue-600 hover:bg-blue-700 h-10"
            >
              লগইন করুন
            </Button>
            <div className="mt-4 text-center text-gray-600">
              নতুন ব্যবহারকারী?{" "}
              <Link
                href="/register"
                className="text-blue-600 hover:text-blue-700"
              >
                রেজিস্টার করুন
              </Link>
            </div>
          </Form.Item>
        </Form>
      </Card>
    </>
  );
};

export default LoginComponent;
