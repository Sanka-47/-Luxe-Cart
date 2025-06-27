import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const RegisterContainer = styled.div`
  padding: 60px 80px;
  max-width: 600px;
  width: 90%;
  margin: 60px auto;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 25px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
  font-family: "Poppins", sans-serif;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  min-height: 500px;
`;

const Title = styled.h2`
  font-size: 3em;
  background: linear-gradient(135deg, #1a1a1a 0%, #4a4a4a 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 50px;
  text-align: center;
  font-weight: 700;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 35px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin-bottom: 12px;
  font-size: 1.3em;
  color: #1a1a1a;
  font-weight: 600;
`;

const Input = styled.input`
  padding: 18px 20px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 15px;
  font-size: 1.1em;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  background: rgba(255, 255, 255, 0.8);
  color: #000;
  min-height: 50px;

  &:focus {
    border-color: #007bff;
    outline: none;
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
    background: rgba(255, 255, 255, 1);
  }
`;

const Button = styled.button`
  padding: 20px 35px;
  background: linear-gradient(135deg, #007bff 0%, #0056b3 100%);
  color: white;
  border: none;
  border-radius: 15px;
  font-size: 1.3em;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 15px rgba(0, 123, 255, 0.3);
  margin-top: 20px;
  min-height: 60px;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 123, 255, 0.4);
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 4px 15px rgba(0, 123, 255, 0.3);
  }
`;

const ErrorMessage = styled.div`
  color: #dc3545;
  font-size: 1em;
  margin-top: 8px;
  padding: 10px;
  background: rgba(220, 53, 69, 0.1);
  border-radius: 8px;
  border-left: 4px solid #dc3545;
`;

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
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
        "http://localhost:5000/api/users/register",
        formData
      );
      localStorage.setItem("user", JSON.stringify(response.data));
      navigate("/");
      window.location.reload();
    } catch (error) {
      setError(
        error.response?.data?.message || "An error occurred during registration"
      );
    }
  };

  return (
    <RegisterContainer>
      <Title>Register</Title>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="username">Username</Label>
          <Input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            placeholder="Enter your username"
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Enter your email"
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
            required
            placeholder="Enter your password"
          />
        </FormGroup>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <Button type="submit">Register</Button>
      </Form>
    </RegisterContainer>
  );
};

export default Register;
