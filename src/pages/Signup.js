import { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useAuth } from "../components/auth";

const Signup = () => {
  const initState = {
    username: "",
    name: "",
    password: "",
  };

  const [initialValues, setInitalValues] = useState(initState);

  const { login } = useAuth();

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
    fetch("/api/v1/auth/register", {
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
        login(data);

        window.location.assign("/mypage");
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

  return (
    <Container>
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

        <Form.Group className="mb-3" controlId="name">
          <Form.Label>이름</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            {...register("name", { required: "필수입력입니다." })}
          />
          {errors.name && (
            <Form.Text className="text-danger">{errors.name.message}</Form.Text>
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
          회원가입
        </Button>
      </Form>
    </Container>
  );
};

export default Signup;
