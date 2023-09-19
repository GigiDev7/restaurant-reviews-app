import { LockOutlined, UserOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import axios, { AxiosError } from "axios";
import { useMutation } from "react-query";
import { BASE_URL } from "../config";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useErrorBoundary } from "react-error-boundary";

const AuthForm: React.FC<{ type: "signin" | "signup" }> = ({ type }) => {
  const navigate = useNavigate();
  const authCtx = useAuth();
  const { showBoundary } = useErrorBoundary();

  const login = useMutation(
    ({ email, password }: { email: string; password: string }) => {
      return axios.post(`${BASE_URL}/user/signin`, { email, password });
    },
    {
      onSuccess(data) {
        const { email, firstname, lastname, token, _id } = data.data;
        localStorage.setItem(
          "user",
          JSON.stringify({ email, firstname, lastname, _id })
        );
        localStorage.setItem("token", token);
        authCtx.updateUser({ email, firstname, lastname, token, _id });
        navigate("/");
      },
      onError(error: AxiosError) {
        showBoundary(error);
      },
    }
  );

  const register = useMutation(
    (userData: {
      email: string;
      password: string;
      firstname: string;
      lastname: string;
    }) => {
      return axios.post(`${BASE_URL}/user/sign up`, userData);
    },
    {
      onSuccess() {
        navigate("/signin");
      },
      onError(error: AxiosError) {
        showBoundary(error);
      },
    }
  );

  const onFinish = (values: any) => {
    if (type === "signin") {
      login.mutate({ email: values.email, password: values.password });
    } else {
      register.mutate({
        email: values.email,
        password: values.password,
        firstname: values.firstname,
        lastname: values.lastname,
      });
    }
  };

  const text = type === "signin" ? "Sign in" : "Sign up";

  return (
    <div className="w-[35%] lg:w-[30%] bg-white p-8 rounded-md">
      <h2 className="font-semibold text-center mb-4">{text}</h2>
      {login.isError && (
        <p className="text-center mb-2 text-red-500">
          {(login.error as any).response?.data?.message}
        </p>
      )}
      {register.isError && (
        <p className="text-center mb-2 text-red-500">
          {(register.error as any).response?.data?.message}
        </p>
      )}
      <Form
        className="flex flex-col gap-4"
        name="loginForm"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          name="email"
          rules={[
            { required: true, message: "Please input your Email!" },
            { type: "email", message: "Please provide valid email" },
          ]}
        >
          <Input prefix={<MailOutlined />} placeholder="Email" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            { required: true, message: "Please input your Password!" },
            {
              min: 8,
              message: "Password should be at least 8 characters long",
            },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        {type === "signup" && (
          <>
            <Form.Item
              dependencies={["password"]}
              rules={[
                {
                  required: true,
                  message: "Please confirm your password",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(
                        "The new password that you entered do not match!"
                      )
                    );
                  },
                }),
              ]}
              name="confirmPassword"
            >
              <Input.Password
                prefix={<LockOutlined />}
                type="password"
                placeholder="Confirm Password"
              />
            </Form.Item>

            <Form.Item
              rules={[
                { required: true, message: "Please enter your Firstname!" },
              ]}
              name="firstname"
            >
              <Input prefix={<UserOutlined />} placeholder="Firstname" />
            </Form.Item>

            <Form.Item
              rules={[
                { required: true, message: "Please enter your Lastname!" },
              ]}
              name="lastname"
            >
              <Input prefix={<UserOutlined />} placeholder="Lastname" />
            </Form.Item>
          </>
        )}
        <Form.Item className="flex justify-center">
          <Button
            className="flex items-center px-8 py-2 font-semibold"
            htmlType="submit"
          >
            {login.isLoading || register.isLoading ? "Loading..." : text}
          </Button>
        </Form.Item>
      </Form>

      <span className="text-sm">
        {type === "signin" ? (
          <Link to="/signup">
            Don't have an account?{" "}
            <span className="text-blue-500 font-semibold">Register</span>
          </Link>
        ) : (
          <Link to="/signin">
            Already have an account?{" "}
            <span className="text-blue-500 font-semibold">Login</span>
          </Link>
        )}
      </span>
    </div>
  );
};

export default AuthForm;
