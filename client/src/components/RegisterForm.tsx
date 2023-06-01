import React, { useState, useEffect } from "react";
import { PlusOutlined } from "@ant-design/icons";
import "../component-styling/RegisterForm.css";
import {
  Button,
  Col,
  DatePicker,
  Drawer,
  Form,
  Input,
  Row,
  Select,
  Space,
} from "antd";

const { Option } = Select;
import { useUserContext } from "../context/UserContext";
function RegisterForm() {
  const [open, setOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { loginUser } = useUserContext();
  const [form] = Form.useForm();
  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  // MÅSTE TYPA UPP DET
  async function registerForm(values: any) {
    const { firstName, lastName, email, password } = values;
    try {
      const response = await fetch("http://localhost:3000/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          password,
        }),
      });
      const data = await response.json();
      console.log(data);
      onClose();
      form.resetFields();
      setIsSubmitted(true);
    } catch {
      console.log(Error);
    }
  }

  return (
    <div>
      {!loginUser ? (
        <Button type="primary" onClick={showDrawer} icon={<PlusOutlined />}>
          New account
        </Button>
      ) : null}

      <Drawer
        title="Create a new account"
        width={720}
        onClose={onClose}
        open={open}
        bodyStyle={{ paddingBottom: 80 }}
        extra={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
          </Space>
        }
      >
        <Form form={form} onFinish={registerForm}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="firstName"
                label="namn"
                rules={[
                  { required: true, message: "Please enter your first name" },
                ]}
              >
                <Input placeholder="Johan" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="lastName"
                label="efternamn"
                rules={[
                  { required: true, message: "Please enter your last name" },
                ]}
              >
                <Input placeholder="Karlsson" />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, message: "Please enter your email" }]}
          >
            <Input placeholder="Johan36@hotmail.com" />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: "Please enter your password" }]}
          >
            <Input.Password placeholder="******" />
          </Form.Item>
          <Button htmlType="submit">Submit form</Button>
          {isSubmitted && (
            <p className="isSubmitedParagraf">Account created!</p>
          )}
        </Form>
      </Drawer>
    </div>
  );
}

export default RegisterForm;
