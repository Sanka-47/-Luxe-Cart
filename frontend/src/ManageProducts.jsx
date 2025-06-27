import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const ManageProductsContainer = styled.div`
  padding: 40px;
  max-width: 1200px;
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

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 30px;
  margin-top: 30px;
`;

const ProductCard = styled.div`
  background: white;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  }
`;

const ProductImage = styled.div`
  height: 200px;
  background-color: #f8f9fa;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    padding: 20px;
  }
`;

const ProductInfo = styled.div`
  padding: 20px;
`;

const ProductName = styled.h3`
  font-size: 1.2em;
  margin-bottom: 10px;
  color: #333;
  font-weight: 600;
`;

const ProductPrice = styled.p`
  font-size: 1.1em;
  color: #667eea;
  font-weight: 700;
  margin-bottom: 15px;
`;

const ProductActions = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 15px;
`;

const Button = styled.button`
  padding: 10px 15px;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  flex: 1;
  
  &.edit {
    background: #667eea;
    color: white;
    
    &:hover {
      background: #5a67d8;
    }
  }
  
  &.delete {
    background: #f56565;
    color: white;
    
    &:hover {
      background: #e53e3e;
    }
  }
`;

const AddButton = styled(Link)`
  display: inline-block;
  padding: 12px 25px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  text-decoration: none;
  border-radius: 12px;
  font-weight: 600;
  margin-bottom: 30px;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 50px 20px;
  
  h3 {
    font-size: 1.5em;
    margin-bottom: 15px;
    color: #4a5568;
  }
  
  p {
    color: #718096;
    margin-bottom: 25px;
  }
`;

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  
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
      fetchUserProducts();
    }
  }, [user]);
  
  const fetchUserProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:5000/api/products/user/${user._id}`);
      setProducts(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching user products:', error);
      setLoading(false);
    }
  };
  
  const handleDelete = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await axios.delete(`http://localhost:5000/api/products/${productId}`);
        // Update the products list after deletion
        setProducts(products.filter(product => product._id !== productId));
        alert('Product deleted successfully!');
      } catch (error) {
        console.error('Error deleting product:', error);
        alert('Failed to delete product.');
      }
    }
  };
  
  if (!user) {
    return null; // Or a loading spinner
  }
  
  return (
    <ManageProductsContainer>
      <Title>Manage Your Products</Title>
      <AddButton to="/add-product">+ Add New Product</AddButton>
      
      {loading ? (
        <p>Loading your products...</p>
      ) : products.length === 0 ? (
        <EmptyState>
          <h3>You haven't added any products yet</h3>
          <p>Start adding products to your inventory</p>
          <AddButton to="/add-product">Add Your First Product</AddButton>
        </EmptyState>
      ) : (
        <ProductsGrid>
          {products.map((product) => (
            <ProductCard key={product._id}>
              <ProductImage>
                <img src={product.image} alt={product.name} />
              </ProductImage>
              <ProductInfo>
                <ProductName>{product.name}</ProductName>
                <ProductPrice>${product.price.toFixed(2)}</ProductPrice>
                <p>Category: {product.category}</p>
                <p>Quantity: {product.quantity}</p>
                <ProductActions>
                  <Button 
                    className="edit"
                    onClick={() => navigate(`/edit-product/${product._id}`)}
                  >
                    Edit
                  </Button>
                  <Button 
                    className="delete"
                    onClick={() => handleDelete(product._id)}
                  >
                    Delete
                  </Button>
                </ProductActions>
              </ProductInfo>
            </ProductCard>
          ))}
        </ProductsGrid>
      )}
    </ManageProductsContainer>
  );
};

export default ManageProducts;