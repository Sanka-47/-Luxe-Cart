import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LoginContainer = styled.div`
  padding: 60px 80px;
  max-width: 800px;
  width: 90%;
  margin: 100px auto;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 25px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
  font-family: "Poppins", sans-serif;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  min-height: 600px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Title = styled.h2`
  font-size: 3.5em;
  background: linear-gradient(135deg, #1a1a1a 0%, #4a4a4a 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 60px;
  text-align: center;
  font-weight: 700;
  letter-spacing: -1px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Label = styled.label`
  font-size: 1.2em;
  color: #1a1a1a;
  font-weight: 600;
  margin-bottom: 5px;
`;

const Input = styled.input`
  padding: 20px 25px;
  border: 2px solid rgba(0, 0, 0, 0.1);
  border-radius: 15px;
  font-size: 1.1em;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  background: rgba(255, 255, 255, 0.8);
  color: #000;
  font-family: "Poppins", sans-serif;

  &:focus {
    border-color: #007bff;
    outline: none;
    box-shadow: 0 0 0 4px rgba(0, 123, 255, 0.1);
    background: rgba(255, 255, 255, 1);
    transform: translateY(-2px);
  }

  &::placeholder {
    color: #999;
    font-size: 1em;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 40px;
`;

const Button = styled.button`
  padding: 20px 40px;
  background: linear-gradient(135deg, #007bff 0%, #0056b3 100%);
  color: white;
  border: none;
  border-radius: 15px;
  font-size: 1.3em;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 6px 20px rgba(0, 123, 255, 0.3);

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 30px rgba(0, 123, 255, 0.4);
  }

  &:active {
    transform: translateY(-1px);
    box-shadow: 0 6px 20px rgba(0, 123, 255, 0.3);
  }

  &.secondary {
    background: linear-gradient(135deg, #6c757d 0%, #495057 100%);
    box-shadow: 0 6px 20px rgba(108, 117, 125, 0.3);

    &:hover {
      background: linear-gradient(135deg, #5a6268 0%, #343a40 100%);
      box-shadow: 0 10px 30px rgba(108, 117, 125, 0.4);
    }
  }
`;

const ErrorMessage = styled.div`
  color: #dc3545;
  font-size: 1rem;
  padding: 15px 20px;
  background-color: #fff5f5;
  border: 1px solid #fed7d7;
  border-radius: 12px;
  margin: 20px 0;
  text-align: center;
`;

const WelcomeText = styled.p`
  text-align: center;
  font-size: 1.1em;
  color: #666;
  margin-bottom: 40px;
  line-height: 1.6;
`;

const DividerContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 30px 0;
`;

const Divider = styled.div`
  flex: 1;
  height: 1px;
  background: linear-gradient(90deg, transparent, #ddd, transparent);
`;

const DividerText = styled.span`
  padding: 0 20px;
  color: #666;
  font-size: 0.9em;
  font-weight: 500;
`;

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/login",
        formData
      );
      localStorage.setItem("user", JSON.stringify(response.data));
      navigate("/");
      window.location.reload();
    } catch (error) {
      setError(
        error.response?.data?.message || "An error occurred during login"
      );
    }
  };

  return (
    <LoginContainer>
      <Title>Welcome Back</Title>
      <WelcomeText>
        Sign in to your account to continue shopping and manage your products
      </WelcomeText>

      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="email">Email Address</Label>
          <Input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email address"
            required
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            required
          />
        </FormGroup>

        {error && <ErrorMessage>{error}</ErrorMessage>}

        <ButtonGroup>
          <Button type="submit">Sign In</Button>

          <DividerContainer>
            <Divider />
            <DividerText>Don't have an account?</DividerText>
            <Divider />
          </DividerContainer>

          <Button
            type="button"
            className="secondary"
            onClick={() => navigate("/register")}
          >
            Create New Account
          </Button>
        </ButtonGroup>
      </Form>
    </LoginContainer>
  );
};

export default Login;
