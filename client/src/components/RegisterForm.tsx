import { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import "../component-styling/RegisterForm.css";
import "../component-styling/Header.css";
import {
  Button,
  Col,
  Drawer,
  Form,
  Input,
  Row,
  Space,
  notification,
} from "antd";

import { useUserContext, User } from "../context/UserContext";
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

  async function registerForm(values: User) {
    const { firstName, lastName, email, password } = values;
    try {
      const response = await fetch("/api/users/register", {
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
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        onClose();
        form.resetFields();
        setIsSubmitted(true);
        notification.success({
          message: "Success",
          description: "Account created!",
        });
      } else if (response.status === 409) {
        notification.error({
          message: "Email-adressen används redan",
        });
      } else {
        const errorData = await response.json();
        console.log("Registration failed:", errorData);
        notification.error({
          message: "Fel",
          description: "Registrering misslyckades",
        });
      }
    } catch {
      console.log("Error: ", Error);
      notification.error({
        message: "Error",
        description: "Ett fel inträffade",
      });
    }
  }

  return (
    <div>
      {loginUser && loginUser.firstName ? null : (
        <Button
          className="headerbtn"
          type="text"
          onClick={showDrawer}
          icon={<PlusOutlined />}
        >
          <span className="createaccounttext">Skapa konto</span>
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
          <Button type="text" className="headerbtn" htmlType="submit">
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
