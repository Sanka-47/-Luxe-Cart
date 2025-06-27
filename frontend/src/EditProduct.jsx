import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditProductContainer = styled.div`
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
  font-weight: 600;
  color: #4a5568;
  font-size: 1.1rem;
  margin-bottom: 5px;
`;

const Input = styled.input`
  padding: 18px 20px;
  border-radius: 12px;
  border: 2px solid #e2e8f0;
  font-size: 1.1rem;
  transition: all 0.3s ease;
  font-family: 'Poppins', sans-serif;
  background-color: white;
  color: black;
  
  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1);
    transform: translateY(-1px);
  }
`;

const TextArea = styled.textarea`
  padding: 18px 20px;
  border-radius: 12px;
  border: 2px solid #e2e8f0;
  font-size: 1.1rem;
  min-height: 150px;
  resize: vertical;
  font-family: 'Poppins', sans-serif;
  line-height: 1.6;
  
  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1);
    transform: translateY(-1px);
  }
`;

const Select = styled.select`
  padding: 18px 20px;
  border-radius: 12px;
  border: 2px solid #e2e8f0;
  font-size: 1.1rem;
  background-color: white;
  color: black;
  font-family: 'Poppins', sans-serif;
  
  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1);
    transform: translateY(-1px);
  }

  &:disabled {
    background-color: #f0f0f0;
    color: #888;
    cursor: not-allowed;
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
  border: none;
  border-radius: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1.1rem;
  min-width: 180px;
  
  &.primary {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    box-shadow: 0 6px 20px rgba(102, 126, 234, 0.3);
    
    &:hover {
      transform: translateY(-3px);
      box-shadow: 0 10px 30px rgba(102, 126, 234, 0.4);
    }
  }
  
  &.secondary {
    background: #e2e8f0;
    color: #4a5568;
    
    &:hover {
      background: #cbd5e0;
      transform: translateY(-2px);
    }
  }
`;

const ErrorMessage = styled.div`
  color: #e53e3e;
  padding: 20px 25px;
  border-radius: 12px;
  background-color: #fff5f5;
  margin-bottom: 30px;
  font-size: 1rem;
  border: 1px solid #fed7d7;
`;

const SuccessMessage = styled.div`
  color: #38a169;
  padding: 20px 25px;
  border-radius: 12px;
  background-color: #f0fff4;
  margin-bottom: 30px;
  font-size: 1rem;
  border: 1px solid #9ae6b4;
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;
  font-size: 1.2rem;
  color: #4a5568;
`;

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [categories, setCategories] = useState([]);
  
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    image: '',
    quantity: '',
    rating: '',
  });
  
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      navigate('/login');
    }
  }, [navigate]);
  
  useEffect(() => {
    if (user) {
      fetchProduct();
      fetchCategories();
    }
  }, [user, id]);
  
  const fetchProduct = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:5000/api/products/${id}`);
      const productData = response.data;
      
      // Check if the product belongs to the logged-in user
      if (productData.user !== user._id) {
        setError('You do not have permission to edit this product');
        return;
      }
      
      setProduct({
        name: productData.name,
        description: productData.description,
        price: productData.price,
        category: productData.category,
        image: productData.image,
        quantity: productData.quantity,
        rating: productData.rating || 0,
      });
      
      setLoading(false);
    } catch (error) {
      console.error('Error fetching product:', error);
      setError('Failed to load product details');
      setLoading(false);
    }
  };
  
  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/products/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    let newValue = value;

    if (name === 'price' || name === 'quantity') {
      newValue = parseFloat(value);
    } else if (name === 'rating') {
      newValue = parseFloat(value);
      if (newValue > 5) newValue = 5;
      if (newValue < 0) newValue = 0;
    }

    setProduct({
      ...product,
      [name]: newValue
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    try {
      await axios.put(`http://localhost:5000/api/products/${id}`, {
        ...product,
        user: user._id
      });
      
      setSuccess('Product updated successfully!');
      
      // Navigate back to manage products after a short delay
      setTimeout(() => {
        navigate('/manage-products');
      }, 2000);
    } catch (error) {
      console.error('Error updating product:', error);
      setError('Failed to update product. Please try again.');
    }
  };
  
  if (!user) {
    return null; // Or a loading spinner
  }
  
  if (loading) {
    return (
      <EditProductContainer>
        <LoadingContainer>
          <p>Loading product details...</p>
        </LoadingContainer>
      </EditProductContainer>
    );
  }
  
  if (error && error.includes('permission')) {
    return (
      <EditProductContainer>
        <ErrorMessage>{error}</ErrorMessage>
        <ButtonGroup>
          <Button className="secondary" onClick={() => navigate('/manage-products')}>
            Back to My Products
          </Button>
        </ButtonGroup>
      </EditProductContainer>
    );
  }
  
  return (
    <EditProductContainer>
      <Title>Edit Product</Title>
      
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {success && <SuccessMessage>{success}</SuccessMessage>}
      
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
            disabled
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </Select>
        </FormGroup>
        
        <FormGroup className="full-width">
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
          <Label htmlFor="price">Price ($)</Label>
          <Input
            type="number"
            id="price"
            name="price"
            min="0"
            step="0.01"
            value={product.price}
            onChange={handleChange}
            required
          />
        </FormGroup>
        
        <FormGroup>
          <Label htmlFor="quantity">Quantity in Stock</Label>
          <Input
            type="number"
            id="quantity"
            name="quantity"
            min="0"
            value={product.quantity}
            onChange={handleChange}
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
            required
          />
        </FormGroup>
        
        <FormGroup>
          <Label htmlFor="rating">Rating (0-5)</Label>
          <Input
            type="number"
            id="rating"
            name="rating"
            min="0"
            max="5"
            step="0.1"
            value={product.rating}
            onChange={handleChange}
          />
        </FormGroup>
      </Form>
      
      <ButtonGroup>
        <Button 
          type="button" 
          className="secondary"
          onClick={() => navigate('/manage-products')}
        >
          Cancel
        </Button>
        <Button type="submit" className="primary" onClick={handleSubmit}>
          Update Product
        </Button>
      </ButtonGroup>
    </EditProductContainer>
  );
};

export default EditProduct;