import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddProductContainer = styled.div`
  padding: 60px 80px;
  max-width: 1400px;
  width: 95%;
  margin: 80px auto;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 25px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
  font-family: 'Poppins', sans-serif;
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
  border: 2px solid rgba(0, 0, 0, 0.1);
  border-radius: 15px;
  font-size: 1.1rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  background: rgba(255, 255, 255, 0.8);
  color: #000;
  font-family: 'Poppins', sans-serif;

  &:focus {
    border-color: #007bff;
    outline: none;
    box-shadow: 0 0 0 4px rgba(0, 123, 255, 0.1);
    background: rgba(255, 255, 255, 1);
    transform: translateY(-1px);
  }
`;

const TextArea = styled.textarea`
  padding: 18px 20px;
  border: 2px solid rgba(0, 0, 0, 0.1);
  border-radius: 15px;
  font-size: 1.1rem;
  min-height: 150px;
  resize: vertical;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  background: rgba(255, 255, 255, 0.8);
  color: #000;
  font-family: 'Poppins', sans-serif;
  line-height: 1.6;

  &:focus {
    border-color: #007bff;
    outline: none;
    box-shadow: 0 0 0 4px rgba(0, 123, 255, 0.1);
    background: rgba(255, 255, 255, 1);
    transform: translateY(-1px);
  }
`;

const Select = styled.select`
  padding: 18px 20px;
  border: 2px solid rgba(0, 0, 0, 0.1);
  border-radius: 15px;
  font-size: 1.1rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  background: rgba(255, 255, 255, 0.8);
  cursor: pointer;
  color: #000;
  font-family: 'Poppins', sans-serif;

  &:focus {
    border-color: #007bff;
    outline: none;
    box-shadow: 0 0 0 4px rgba(0, 123, 255, 0.1);
    background: rgba(255, 255, 255, 1);
    transform: translateY(-1px);
  }
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

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 30px rgba(0, 123, 255, 0.4);
  }

  &:active {
    transform: translateY(-1px);
    box-shadow: 0 6px 20px rgba(0, 123, 255, 0.3);
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
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'rate') {
      let newValue = Number(value);
      if (newValue > 5) newValue = 5;
      if (newValue < 0) newValue = 0;
      setProduct(prevProduct => ({
        ...prevProduct,
        rating: {
          ...prevProduct.rating,
          [name]: newValue
        }
      }));
    } else if (name === 'count') {
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
      if (!user) {
        alert('User not logged in. Please log in to add a product.');
        return;
      }
      await axios.post('http://localhost:5000/api/products', { ...product, user: user._id });
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
          <Label htmlFor="price">Price ($)</Label>
          <Input
            type="number"
            id="price"
            name="price"
            value={product.price}
            onChange={handleChange}
            step="0.01"
            min="0"
            required
          />
        </FormGroup>
        
        <FormGroup>
          <Label htmlFor="quantity">Quantity in Stock</Label>
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
        
        <FormGroup className="full-width">
          <Label htmlFor="description">Product Description</Label>
          <TextArea
            id="description"
            name="description"
            value={product.description}
            onChange={handleChange}
            placeholder="Enter a detailed description of your product..."
            required
          />
        </FormGroup>
        
        <FormGroup className="full-width">
          <Label htmlFor="image">Image URL</Label>
          <Input
            type="url"
            id="image"
            name="image"
            value={product.image}
            onChange={handleChange}
            placeholder="https://example.com/image.jpg"
            required
          />
        </FormGroup>
        
        <RatingGroup>
          <RatingFormGroup>
            <Label htmlFor="rate">Product Rating (0-5)</Label>
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
          </RatingFormGroup>
          
          <RatingFormGroup>
            <Label htmlFor="count">Number of Reviews</Label>
            <Input
              type="number"
              id="count"
              name="count"
              value={product.rating.count}
              onChange={handleChange}
              min="0"
              
              required
            />
          </RatingFormGroup>
        </RatingGroup>
      </Form>
      
      <ButtonGroup>
        <BackButton 
          type="button" 
          onClick={() => navigate('/')}
        >
          Cancel
        </BackButton>
        <Button type="submit" onClick={handleSubmit}>
          Add Product
        </Button>
      </ButtonGroup>
    </AddProductContainer>
  );
};

export default AddProduct;