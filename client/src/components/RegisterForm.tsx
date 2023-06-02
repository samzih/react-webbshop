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
      {loginUser && loginUser.firstName ? null : (
        <Button type="default" onClick={showDrawer} icon={<PlusOutlined />}>
          Skapa konto
        </Button>
      )}

      <Drawer
        title="Skapa ditt konto"
        width={720}
        onClose={onClose}
        open={open}
        bodyStyle={{ paddingBottom: 80 }}
        extra={
          <Space>
            <Button onClick={onClose}>Avbryt</Button>
          </Space>
        }
      >
        <Form form={form} onFinish={registerForm}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="firstName"
                label="Namn"
                rules={[{ required: true, message: "Ange ditt namn" }]}
              >
                <Input placeholder="Johan" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="lastName"
                label="Efternamn"
                rules={[{ required: true, message: "Ange ditt efternamn" }]}
              >
                <Input placeholder="Karlsson" />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item
            name="email"
            label="E-postadress"
            rules={[{ required: true, message: "Ange din E-postadress" }]}
          >
            <Input placeholder="Johan36@hotmail.com" />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: "Ange ditt lösenord" }]}
          >
            <Input.Password placeholder="******" />
          </Form.Item>
          <Button type="primary" htmlType="submit">
            Fortsätt
          </Button>
          {isSubmitted && (
            <p className="isSubmitedParagraf">Kontot är skapat!</p>
          )}
        </Form>
      </Drawer>
    </div>
  );
}

export default RegisterForm;
