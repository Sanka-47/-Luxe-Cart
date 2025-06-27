import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddProductContainer = styled.div`
  padding: 40px;
  max-width: 800px;
  margin: 80px auto 40px auto;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 25px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
  font-family: 'Poppins', sans-serif;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const Title = styled.h2`
  font-size: 2.5em;
  background: linear-gradient(135deg, #1a1a1a 0%, #4a4a4a 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 30px;
  text-align: center;
  font-weight: 700;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin-bottom: 8px;
  font-size: 1.1em;
  color: #1a1a1a;
  font-weight: 600;
`;

const Input = styled.input`
  padding: 12px 15px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 15px;
  font-size: 1em;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  background: rgba(255, 255, 255, 0.8);
  color: #000; /* Added for black text color */

  &:focus {
    border-color: #007bff;
    outline: none;
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
    background: rgba(255, 255, 255, 1);
  }
`;

const TextArea = styled.textarea`
  padding: 12px 15px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 15px;
  font-size: 1em;
  min-height: 100px;
  resize: vertical;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  background: rgba(255, 255, 255, 0.8);
  color: #000; /* Added for black text color */

  &:focus {
    border-color: #007bff;
    outline: none;
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
    background: rgba(255, 255, 255, 1);
  }
`;

const Select = styled.select`
  padding: 12px 15px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 15px;
  font-size: 1em;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  background: rgba(255, 255, 255, 0.8);
  cursor: pointer;
  color: #000; /* Added for black text color */

  &:focus {
    border-color: #007bff;
    outline: none;
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
    background: rgba(255, 255, 255, 1);
  }
`;

const Button = styled.button`
  padding: 15px 25px;
  background: linear-gradient(135deg, #007bff 0%, #0056b3 100%);
  color: white;
  border: none;
  border-radius: 15px;
  font-size: 1.2em;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 15px rgba(0, 123, 255, 0.3);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 123, 255, 0.4);
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 4px 15px rgba(0, 123, 255, 0.3);
  }
`;

const BackButton = styled(Button)`
  background-color: #6c757d;
  margin-top: 10px;

  &:hover {
    background-color: #5a6268;
  }
`;

const AddProduct = () => {
  const [product, setProduct] = useState({
    name: '',
    price: '',
    description: '',
    category: 'men\'s clothing',
    image: '',
    quantity: 1,
    rating: {
      rate: 0,
      count: 0
    }
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'rate' || name === 'count') {
      setProduct(prevProduct => ({
        ...prevProduct,
        rating: {
          ...prevProduct.rating,
          [name]: Number(value)
        }
      }));
    } else if (name === 'category') {
      // Ensure category is sent exactly as selected
      setProduct(prevProduct => ({
        ...prevProduct,
        category: value
      }));
    } else {
      setProduct(prevProduct => ({
        ...prevProduct,
        [name]: name === 'price' || name === 'quantity' ? Number(value) : value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/products', product);
      alert('Product added successfully!');
      navigate('/');
      window.location.reload(); // Reload the page to reflect changes in App.jsx
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Failed to add product.');
    }
  };

  return (
    <AddProductContainer>
      <Title>Add New Product</Title>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="name">Product Name</Label>
          <Input
            type="text"
            id="name"
            name="name"
            value={product.name}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="price">Price</Label>
          <Input
            type="number"
            id="price"
            name="price"
            value={product.price}
            onChange={handleChange}
            step="0.01"
            required
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="quantity">Quantity</Label>
          <Input
            type="number"
            id="quantity"
            name="quantity"
            value={product.quantity}
            onChange={handleChange}
            min="1"
            required
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="description">Description</Label>
          <TextArea
            id="description"
            name="description"
            value={product.description}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="category">Category</Label>
          <Select
            id="category"
            name="category"
            value={product.category}
            onChange={handleChange}
            required
          >
            <option value="men's clothing">Men's clothing</option>
            <option value="jewelery">Jewelery</option>
            <option value="electronics">Electronics</option>
            <option value="women's clothing">Women's clothing</option>
          </Select>
        </FormGroup>
        <FormGroup>
          <Label htmlFor="image">Image URL</Label>
          <Input
            type="url"
            id="image"
            name="image"
            value={product.image}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="rate">Rating</Label>
          <Input
            type="number"
            id="rate"
            name="rate"
            value={product.rating.rate}
            onChange={handleChange}
            step="0.1"
            min="0"
            max="5"
            required
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="count">Rating Count</Label>
          <Input
            type="number"
            id="count"
            name="count"
            value={product.rating.count}
            onChange={handleChange}
            min="0"
            required
          />
        </FormGroup>
        <Button type="submit">Add Product</Button>
      </Form>
    </AddProductContainer>
  );
};

export default AddProduct;