import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { signin } from "../apis/signin";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

const Signin = () => {
  const initState = {
    username: "",
    password: "",
  };

  /*
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  */
  const [initialValues, setInitalValues] = useState(initState);

  const router = useNavigate();

  const {
    register,
    setError,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    reValidateMode: "onSubmit",
    defaultValues: initialValues,
  });

  const onSubmit = (values) => {
    console.log(values);
    fetch("/api/v1/auth/authenticate", {
      method: "POST",
      body: JSON.stringify(values),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`${response.status} 에러가 발생했습니다.`);
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        const { access_token, refresh_token } = data;

        localStorage.setItem("access", access_token);
        localStorage.setItem("refresh", refresh_token);
        router("/");
      })
      .catch((error) => {
        console.log(error.message);
        const formError = {
          type: "server",
          message: "이메일 또는 비밀번호를 확인하세요",
        };
        setError("username", formError);
        setError("password", formError);
      });
  };

  const onError = (error) => {
    console.log(error);
  };

  const onClick = async () => {
    /* ---
    const result = await signin(username, password);

    console.log(result);

    const { access_token, refresh_token } = result;

    localStorage.setItem("access", access_token);
    localStorage.setItem("refresh", refresh_token);
    router("/");
    --- */
  };

  return (
    <Container className="my-4">
      <Form onSubmit={handleSubmit(onSubmit, onError)}>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>이메일</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            {...register("username", { required: "필수입력입니다." })}
          />
          {errors.username && (
            <Form.Text className="text-danger">
              {errors.username.message}
            </Form.Text>
          )}
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>비밀번호</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            {...register("password", {
              required: "Required!",
            })}
          />
          {errors.password && (
            <Form.Text className="text-danger">
              {errors.password.message}
            </Form.Text>
          )}
        </Form.Group>
        <Button type="submit" variant="primary">
          로그인
        </Button>
      </Form>
    </Container>
  );
};

export default Signin;
