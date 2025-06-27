import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddProductContainer = styled.div`
  padding: 60px 80px;
  max-width: 1400px;
  width: 95%;
  margin: 80px auto;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 25px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
  font-family: "Poppins", sans-serif;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  min-height: calc(100vh - 200px);
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
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px 60px;
  margin-bottom: 40px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 30px;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;

  &.full-width {
    grid-column: 1 / -1;
  }
`;

const Label = styled.label`
  font-size: 1.1rem;
  color: #1a1a1a;
  font-weight: 600;
  margin-bottom: 5px;
`;

const Input = styled.input`
  padding: 18px 20px;
  border: 2px solid ${props => props.hasError ? '#dc3545' : 'rgba(0, 0, 0, 0.1)'};
  border-radius: 15px;
  font-size: 1.1rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  background: rgba(255, 255, 255, 0.8);
  color: #000;
  font-family: "Poppins", sans-serif;

  &:focus {
    border-color: ${props => props.hasError ? '#dc3545' : '#007bff'};
    outline: none;
    box-shadow: 0 0 0 4px ${props => props.hasError ? 'rgba(220, 53, 69, 0.1)' : 'rgba(0, 123, 255, 0.1)'};
    background: rgba(255, 255, 255, 1);
    transform: translateY(-1px);
  }
`;

const TextArea = styled.textarea`
  padding: 18px 20px;
  border: 2px solid ${props => props.hasError ? '#dc3545' : 'rgba(0, 0, 0, 0.1)'};
  border-radius: 15px;
  font-size: 1.1rem;
  min-height: 150px;
  resize: vertical;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  background: rgba(255, 255, 255, 0.8);
  color: #000;
  font-family: "Poppins", sans-serif;
  line-height: 1.6;

  &:focus {
    border-color: ${props => props.hasError ? '#dc3545' : '#007bff'};
    outline: none;
    box-shadow: 0 0 0 4px ${props => props.hasError ? 'rgba(220, 53, 69, 0.1)' : 'rgba(0, 123, 255, 0.1)'};
    background: rgba(255, 255, 255, 1);
    transform: translateY(-1px);
  }
`;

const Select = styled.select`
  padding: 18px 20px;
  border: 2px solid ${props => props.hasError ? '#dc3545' : 'rgba(0, 0, 0, 0.1)'};
  border-radius: 15px;
  font-size: 1.1rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  background: rgba(255, 255, 255, 0.8);
  cursor: pointer;
  color: #000;
  font-family: "Poppins", sans-serif;

  &:focus {
    border-color: ${props => props.hasError ? '#dc3545' : '#007bff'};
    outline: none;
    box-shadow: 0 0 0 4px ${props => props.hasError ? 'rgba(220, 53, 69, 0.1)' : 'rgba(0, 123, 255, 0.1)'};
    background: rgba(255, 255, 255, 1);
    transform: translateY(-1px);
  }
`;

const ErrorMessage = styled.span`
  color: #dc3545;
  font-size: 0.9rem;
  margin-top: -10px;
  margin-bottom: 5px;
  font-weight: 500;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 30px;
  margin-top: 60px;
  justify-content: center;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 20px;
  }
`;

const Button = styled.button`
  padding: 18px 40px;
  background: linear-gradient(135deg, #007bff 0%, #0056b3 100%);
  color: white;
  border: none;
  border-radius: 15px;
  font-size: 1.2em;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 6px 20px rgba(0, 123, 255, 0.3);
  min-width: 180px;
  opacity: ${props => props.disabled ? 0.6 : 1};

  &:hover {
    transform: ${props => props.disabled ? 'none' : 'translateY(-3px)'};
    box-shadow: ${props => props.disabled ? '0 6px 20px rgba(0, 123, 255, 0.3)' : '0 10px 30px rgba(0, 123, 255, 0.4)'};
  }

  &:active {
    transform: ${props => props.disabled ? 'none' : 'translateY(-1px)'};
    box-shadow: 0 6px 20px rgba(0, 123, 255, 0.3);
  }

  &:disabled {
    cursor: not-allowed;
  }
`;

const BackButton = styled(Button)`
  background: linear-gradient(135deg, #6c757d 0%, #5a6268 100%);
  box-shadow: 0 6px 20px rgba(108, 117, 125, 0.3);

  &:hover {
    background: linear-gradient(135deg, #5a6268 0%, #495057 100%);
    transform: translateY(-3px);
    box-shadow: 0 10px 30px rgba(108, 117, 125, 0.4);
  }
`;

const RatingGroup = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  grid-column: 1 / -1;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const RatingFormGroup = styled(FormGroup)`
  margin: 0;
`;

const AddProduct = () => {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    description: "",
    category: "men's clothing",
    image: "",
    quantity: 1,
    rating: {
      rate: 0,
      count: 0,
    },
  });
  const [user, setUser] = useState(null);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const navigate = useNavigate();

  // Validation functions
  const validateField = (name, value) => {
    let error = "";

    switch (name) {
      case "name":
        if (!value.trim()) {
          error = "Product name is required";
        } else if (value.trim().length < 2) {
          error = "Product name must be at least 2 characters long";
        } else if (value.trim().length > 100) {
          error = "Product name must be less than 100 characters";
        }
        break;

      case "price":
        if (!value) {
          error = "Price is required";
        } else if (isNaN(value) || Number(value) <= 0) {
          error = "Price must be a positive number";
        } else if (Number(value) > 999999) {
          error = "Price cannot exceed $999,999";
        }
        break;

      case "description":
        if (!value.trim()) {
          error = "Description is required";
        } else if (value.trim().length < 10) {
          error = "Description must be at least 10 characters long";
        } else if (value.trim().length > 1000) {
          error = "Description must be less than 1000 characters";
        }
        break;

      case "category":
        const validCategories = ["men's clothing", "jewelery", "electronics", "women's clothing"];
        if (!validCategories.includes(value)) {
          error = "Please select a valid category";
        }
        break;

      case "image":
        if (!value.trim()) {
          error = "Image URL is required";
        } else {
          try {
            new URL(value);
            // Check if URL looks like an image
            const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];
            const hasImageExtension = imageExtensions.some(ext => 
              value.toLowerCase().includes(ext)
            );
            if (!hasImageExtension && !value.includes('placeholder') && !value.includes('image')) {
              error = "Please provide a valid image URL";
            }
          } catch {
            error = "Please provide a valid URL";
          }
        }
        break;

      case "quantity":
        if (!value) {
          error = "Quantity is required";
        } else if (isNaN(value) || Number(value) < 1) {
          error = "Quantity must be at least 1";
        } else if (Number(value) > 10000) {
          error = "Quantity cannot exceed 10,000";
        }
        break;

      case "rate":
        if (value === "" || value === null || value === undefined) {
          error = "Rating is required";
        } else if (isNaN(value) || Number(value) < 0 || Number(value) > 5) {
          error = "Rating must be between 0 and 5";
        }
        break;

      case "count":
        if (!value && value !== 0) {
          error = "Review count is required";
        } else if (isNaN(value) || Number(value) < 0) {
          error = "Review count must be 0 or greater";
        } else if (Number(value) > 1000000) {
          error = "Review count cannot exceed 1,000,000";
        }
        break;

      default:
        break;
    }

    return error;
  };

  const validateAllFields = () => {
    const newErrors = {};
    
    // Validate all fields
    Object.keys(product).forEach(key => {
      if (key === "rating") {
        newErrors.rate = validateField("rate", product.rating.rate);
        newErrors.count = validateField("count", product.rating.count);
      } else {
        newErrors[key] = validateField(key, product[key]);
      }
    });

    // Remove empty errors
    Object.keys(newErrors).forEach(key => {
      if (!newErrors[key]) {
        delete newErrors[key];
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }

    if (name === "rate") {
      let newValue = Number(value);
      if (newValue > 5) newValue = 5;
      if (newValue < 0) newValue = 0;
      setProduct((prevProduct) => ({
        ...prevProduct,
        rating: {
          ...prevProduct.rating,
          [name]: newValue,
        },
      }));
    } else if (name === "count") {
      setProduct((prevProduct) => ({
        ...prevProduct,
        rating: {
          ...prevProduct.rating,
          [name]: Number(value),
        },
      }));
    } else if (name === "category") {
      setProduct((prevProduct) => ({
        ...prevProduct,
        category: value,
      }));
    } else {
      setProduct((prevProduct) => ({
        ...prevProduct,
        [name]: name === "price" || name === "quantity" ? Number(value) : value,
      }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    
    if (error) {
      setErrors(prev => ({
        ...prev,
        [name]: error
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateAllFields()) {
      alert("Please correct the errors in the form before submitting.");
      return;
    }

    setIsSubmitting(true);

    try {
      if (!user) {
        alert("User not logged in. Please log in to add a product.");
        setIsSubmitting(false);
        return;
      }

      await axios.post("http://localhost:5000/api/products", {
        ...product,
        user: user._id,
      });
      
      alert("Product added successfully!");
      navigate("/");
      window.location.reload();
    } catch (error) {
      console.error("Error adding product:", error);
      if (error.response?.data?.message) {
        alert(`Failed to add product: ${error.response.data.message}`);
      } else {
        alert("Failed to add product. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = Object.keys(errors).length === 0 && 
    product.name.trim() && 
    product.price && 
    product.description.trim() && 
    product.image.trim();

  return (
    <AddProductContainer>
      <Title>Add New Product</Title>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="name">Product Name *</Label>
          <Input
            type="text"
            id="name"
            name="name"
            value={product.name}
            onChange={handleChange}
            onBlur={handleBlur}
            hasError={!!errors.name}
            required
          />
          {errors.name && <ErrorMessage>{errors.name}</ErrorMessage>}
        </FormGroup>

        <FormGroup>
          <Label htmlFor="category">Category *</Label>
          <Select
            id="category"
            name="category"
            value={product.category}
            onChange={handleChange}
            onBlur={handleBlur}
            hasError={!!errors.category}
            required
          >
            <option value="men's clothing">Men's clothing</option>
            <option value="jewelery">Jewelery</option>
            <option value="electronics">Electronics</option>
            <option value="women's clothing">Women's clothing</option>
          </Select>
          {errors.category && <ErrorMessage>{errors.category}</ErrorMessage>}
        </FormGroup>

        <FormGroup>
          <Label htmlFor="price">Price ($) *</Label>
          <Input
            type="number"
            id="price"
            name="price"
            value={product.price}
            onChange={handleChange}
            onBlur={handleBlur}
            hasError={!!errors.price}
            step="0.01"
            min="0"
            required
          />
          {errors.price && <ErrorMessage>{errors.price}</ErrorMessage>}
        </FormGroup>

        <FormGroup>
          <Label htmlFor="quantity">Quantity in Stock *</Label>
          <Input
            type="number"
            id="quantity"
            name="quantity"
            value={product.quantity}
            onChange={handleChange}
            onBlur={handleBlur}
            hasError={!!errors.quantity}
            min="1"
            required
          />
          {errors.quantity && <ErrorMessage>{errors.quantity}</ErrorMessage>}
        </FormGroup>

        <FormGroup className="full-width">
          <Label htmlFor="description">Product Description *</Label>
          <TextArea
            id="description"
            name="description"
            value={product.description}
            onChange={handleChange}
            onBlur={handleBlur}
            hasError={!!errors.description}
            placeholder="Enter a detailed description of your product... (minimum 10 characters)"
            required
          />
          {errors.description && <ErrorMessage>{errors.description}</ErrorMessage>}
        </FormGroup>

        <FormGroup className="full-width">
          <Label htmlFor="image">Image URL *</Label>
          <Input
            type="url"
            id="image"
            name="image"
            value={product.image}
            onChange={handleChange}
            onBlur={handleBlur}
            hasError={!!errors.image}
            placeholder="https://example.com/image.jpg"
            required
          />
          {errors.image && <ErrorMessage>{errors.image}</ErrorMessage>}
        </FormGroup>

        <RatingGroup>
          <RatingFormGroup>
            <Label htmlFor="rate">Product Rating (0-5) *</Label>
            <Input
              type="number"
              id="rate"
              name="rate"
              value={product.rating.rate}
              onChange={handleChange}
              onBlur={handleBlur}
              hasError={!!errors.rate}
              step="0.1"
              min="0"
              max="5"
              required
            />
            {errors.rate && <ErrorMessage>{errors.rate}</ErrorMessage>}
          </RatingFormGroup>

          <RatingFormGroup>
            <Label htmlFor="count">Number of Reviews *</Label>
            <Input
              type="number"
              id="count"
              name="count"
              value={product.rating.count}
              onChange={handleChange}
              onBlur={handleBlur}
              hasError={!!errors.count}
              min="0"
              required
            />
            {errors.count && <ErrorMessage>{errors.count}</ErrorMessage>}
          </RatingFormGroup>
        </RatingGroup>
      </Form>

      <ButtonGroup>
        <BackButton type="button" onClick={() => navigate("/")} disabled={isSubmitting}>
          Cancel
        </BackButton>
        <Button 
          type="submit" 
          onClick={handleSubmit}
          disabled={isSubmitting || !isFormValid}
        >
          {isSubmitting ? "Adding Product..." : "Add Product"}
        </Button>
      </ButtonGroup>
    </AddProductContainer>
  );
};

export default AddProduct;