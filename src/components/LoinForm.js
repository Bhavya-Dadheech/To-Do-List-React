import React from "react";
import { useAuth } from "../auth-provider/AuthProvider";
import { Button, Form, Input } from "antd";
import { MailOutlined } from "@ant-design/icons";

export default function LoinForm() {
  const auth = useAuth();
  const onFinish = (values) => {
    try {
      auth.loginAction(values);
    } catch (error) {
      console.error("Error occurred:", error);
      alert("Invalid credentials");
    }
  };
  const onFinishFailed = (errorInfo) => {};

  return (
    <div className="flex items-center justify-center translate-y-1/2">
      <div className="border rounded-2xl flex flex-col gap-5 bg-amber-50 items-center justify-center px-[5rem] py-[3rem] text-center">
        <span className="text-3xl font-medium">Log-In to your Account</span>
        <Form
          name="basic"
          labelCol={{
            span: 8
          }}
          wrapperCol={{
            span: 16
          }}
          style={{
            maxWidth: 600
          }}
          initialValues={{
            remember: true
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please fill your email!"
              }
            ]}
          >
            <Input suffix={<MailOutlined />} />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please fill your password!"
              }
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16
            }}
          >
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
