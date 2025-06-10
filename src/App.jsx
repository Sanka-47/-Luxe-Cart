import { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { motion, AnimatePresence } from "framer-motion";

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #f8f9fa;
`;

const Navbar = styled.nav`
  background: white;
  padding: 1rem 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
`;

const NavContent = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: #2d3436;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  span {
    color: #00b894;
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;

  a {
    text-decoration: none;
    color: #2d3436;
    font-weight: 500;
    transition: color 0.3s ease;

    &:hover {
      color: #00b894;
    }
  }
`;

const CartButton = styled.button`
  background: none;
  border: none;
  padding: 0.5rem;
  cursor: pointer;
  position: relative;
  color: #2d3436;
  transition: color 0.3s ease;

  &:hover {
    color: #00b894;
  }

  .cart-count {
    position: absolute;
    top: -5px;
    right: -5px;
    background: #00b894;
    color: white;
    font-size: 0.75rem;
    padding: 0.25rem 0.5rem;
    border-radius: 1rem;
    font-weight: bold;
  }
`;

const MainContent = styled.main`
  width: 100%;
  flex: 1;
`;

// New Hero Section
const HeroSection = styled.section`
  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url("https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80");
  background-size: cover;
  background-position: center;
  height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  text-align: center;
  margin-bottom: 3rem;
`;

const HeroContent = styled.div`
  max-width: 800px;
  padding: 0 2rem;

  h1 {
    font-size: 3.5rem;
    margin-bottom: 1rem;
    font-weight: 800;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  }

  p {
    font-size: 1.25rem;
    margin-bottom: 2rem;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
  }

  button {
    padding: 1rem 2rem;
    background: #00b894;
    color: white;
    border: none;
    border-radius: 50px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);

    &:hover {
      background: #00a383;
      transform: translateY(-2px);
      box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
    }
  }
`;

const SectionContainer = styled.div`
  max-width: 1400px;
  width: 100%;
  margin: 0 auto;
  padding: 2rem;
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  color: #2d3436;
  margin-bottom: 1rem;
  text-align: center;
  position: relative;
  padding-bottom: 1rem;

  &:after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 4px;
    background: #00b894;
    border-radius: 2px;
  }
`;

const SectionDescription = styled.p`
  color: #636e72;
  font-size: 1.1rem;
  text-align: center;
  max-width: 700px;
  margin: 0 auto 3rem auto;
`;

const SearchBar = styled.div`
  margin-bottom: 2.5rem;
  display: flex;
  justify-content: center;

  input {
    width: 100%;
    max-width: 600px;
    padding: 1rem 1.5rem;
    border: 2px solid #e0e0e0;
    border-radius: 16px;
    font-size: 1rem;
    background: white;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
    transition: all 0.3s ease;

    &:focus {
      outline: none;
      border-color: #00b894;
      box-shadow: 0 6px 12px rgba(0, 184, 148, 0.1);
      transform: translateY(-2px);
    }

    &::placeholder {
      color: #b2bec3;
    }
  }
`;

const CategoryFilter = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-bottom: 3rem;
  flex-wrap: wrap;
  padding: 0 1rem;
`;

const FilterButton = styled.button`
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 12px;
  background: ${(props) => (props.active ? "#00b894" : "white")};
  color: ${(props) => (props.active ? "white" : "#2d3436")};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    background: ${(props) => (props.active ? "#00b894" : "#f5f6fa")};
  }
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
`;

// Enhanced Product Card
const ProductCard = styled(motion.div)`
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  position: relative;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);

    .card-actions {
      opacity: 1;
      transform: translateY(0);
    }

    .image-container img {
      transform: scale(1.05);
    }
  }

  .badge {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: #00b894;
    color: white;
    font-size: 0.75rem;
    font-weight: bold;
    padding: 0.5rem 0.75rem;
    border-radius: 20px;
    z-index: 10;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .image-container {
    position: relative;
    width: 100%;
    padding-top: 100%; /* 1:1 Aspect Ratio */
    overflow: hidden;
    background: #f5f6fa;

    img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: contain;
      padding: 1rem;
      transition: transform 0.3s ease;
    }
  }

  .content {
    padding: 1.5rem;

    h3 {
      margin: 0;
      font-size: 1.1rem;
      color: #2d3436;
      font-weight: 600;
      line-height: 1.4;
      margin-bottom: 0.5rem;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .price-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.75rem;
    }

    p.price {
      color: #00b894;
      font-weight: 700;
      font-size: 1.2rem;
      margin: 0;
    }

    .rating {
      display: flex;
      align-items: center;
      color: #fdcb6e;
      font-size: 0.9rem;

      span {
        margin-left: 0.25rem;
        color: #636e72;
      }
    }

    .description {
      font-size: 0.9rem;
      color: #636e72;
      margin-bottom: 1rem;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
  }

  .card-actions {
    display: flex;
    gap: 0.5rem;
    opacity: 0;
    transform: translateY(10px);
    transition: all 0.3s ease;

    button {
      flex: 1;
      padding: 0.75rem;
      border: none;
      border-radius: 8px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s ease;

      &.add-to-cart {
        background: #00b894;
        color: white;

        &:hover {
          background: #00a383;
        }
      }

      &.wishlist {
        background: #f1f2f6;
        color: #2d3436;

        &:hover {
          background: #e4e5e9;
        }
      }
    }
  }
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.75rem;
  margin-top: 3rem;

  button {
    padding: 0.75rem 1.25rem;
    border: none;
    border-radius: 12px;
    background: white;
    color: #2d3436;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);

    &:hover:not(:disabled) {
      background: #00b894;
      color: white;
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }

    &.active {
      background: #00b894;
      color: white;
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
      &:hover {
        transform: none;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
      }
    }
  }
`;

// New Testimonials Section
const TestimonialsSection = styled.section`
  background: #f1f2f6;
  padding: 5rem 0;
  margin: 4rem 0;
`;

const TestimonialsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
`;

const TestimonialCard = styled.div`
  background: white;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
  position: relative;

  .quote {
    position: absolute;
    top: -15px;
    left: 20px;
    font-size: 4rem;
    color: #00b894;
    opacity: 0.2;
  }

  p {
    font-style: italic;
    margin-bottom: 1.5rem;
    color: #636e72;
    line-height: 1.6;
  }

  .author {
    display: flex;
    align-items: center;

    img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      object-fit: cover;
      margin-right: 1rem;
    }

    .author-info {
      h4 {
        margin: 0;
        color: #2d3436;
        font-weight: 600;
      }

      span {
        font-size: 0.9rem;
        color: #b2bec3;
      }
    }
  }
`;

// New Features Section
const FeaturesSection = styled.section`
  padding: 4rem 0;
  background: white;
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
`;

const FeatureCard = styled.div`
  text-align: center;
  padding: 2rem;

  .icon {
    width: 80px;
    height: 80px;
    background: #f1f9f7;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 1.5rem;
    color: #00b894;
    font-size: 2rem;
  }

  h3 {
    margin-bottom: 1rem;
    color: #2d3436;
  }

  p {
    color: #636e72;
    line-height: 1.6;
  }
`;

// New Newsletter Section
const NewsletterSection = styled.section`
  background: linear-gradient(135deg, #00b894 0%, #00a383 100%);
  padding: 4rem 0;
  color: white;
  text-align: center;
`;

const NewsletterForm = styled.form`
  max-width: 600px;
  margin: 2rem auto 0;
  display: flex;

  input {
    flex: 1;
    padding: 1rem 1.5rem;
    border: none;
    border-radius: 50px 0 0 50px;
    font-size: 1rem;

    &:focus {
      outline: none;
    }
  }

  button {
    padding: 1rem 1.5rem;
    background: #2d3436;
    color: white;
    border: none;
    border-radius: 0 50px 50px 0;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.3s ease;

    &:hover {
      background: #1e2526;
    }
  }
`;

const Footer = styled.footer`
  background: #2d3436;
  color: white;
  padding: 3rem 0;
`;

const FooterContent = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;

  h3 {
    font-size: 1.2rem;
    margin-bottom: 1rem;
    color: #00b894;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;

    li {
      margin-bottom: 0.5rem;

      a {
        color: #dfe6e9;
        text-decoration: none;
        transition: color 0.3s ease;

        &:hover {
          color: #00b894;
        }
      }
    }
  }
`;

const Copyright = styled.div`
  text-align: center;
  padding-top: 2rem;
  margin-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  color: #b2bec3;
`;

function App() {
  // State declarations
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const productsPerPage = 8;

  // Fetch products
  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setFilteredProducts(data);

        // Set featured products (top 4 highest rated)
        const sorted = [...data].sort((a, b) => b.rating.rate - a.rating.rate);
        setFeaturedProducts(sorted.slice(0, 4));

        const uniqueCategories = [
          ...new Set(data.map((product) => product.category)),
        ];
        setCategories(uniqueCategories);
      });
  }, []);

  // Filter products
  useEffect(() => {
    let filtered = products;

    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (product) => product.category === selectedCategory
      );
    }

    if (searchQuery) {
      filtered = filtered.filter(
        (product) =>
          product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
    setCurrentPage(1);
  }, [selectedCategory, searchQuery, products]);

  // Pagination calculations
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  // Event handlers
  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleAddToCart = () => {
    setCartCount((prev) => prev + 1);
  };

  // Testimonials data
  const testimonials = [
    {
      id: 1,
      text: "I've been shopping with LuxeCart for over a year now, and the quality of their products is consistently outstanding. The customer service is top-notch too!",
      name: "Sarah Johnson",
      title: "Regular Customer",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      id: 2,
      text: "The selection at LuxeCart is incredible. I always find exactly what I'm looking for, and often discover new products I didn't know I needed!",
      name: "Michael Chen",
      title: "Fashion Enthusiast",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      id: 3,
      text: "Fast shipping, secure packaging, and premium products. LuxeCart has become my go-to online store for all my shopping needs.",
      name: "Emma Rodriguez",
      title: "Verified Buyer",
      avatar: "https://randomuser.me/api/portraits/women/63.jpg",
    },
  ];

  return (
    <Container>
      <Navbar>
        <NavContent>
          <Logo>
            <span>Luxe</span>Cart
          </Logo>
          <NavLinks>
            <a href="#">Home</a>
            <a href="#">Categories</a>
            <a href="#">New Arrivals</a>
            <a href="#">Sale</a>
            <CartButton>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
              <span className="cart-count">{cartCount}</span>
            </CartButton>
          </NavLinks>
        </NavContent>
      </Navbar>

      <MainContent>
        {/* Hero Section */}
        <HeroSection>
          <HeroContent>
            <h1>Discover Luxury at Your Fingertips</h1>
            <p>
              Premium products curated for the discerning customer. Explore our
              exclusive collection today.
            </p>
            <button>Shop Now</button>
          </HeroContent>
        </HeroSection>

        {/* Featured Products */}
        <SectionContainer>
          <SectionTitle>Featured Products</SectionTitle>
          <SectionDescription>
            Our most popular items, hand-picked for exceptional quality and
            style
          </SectionDescription>

          <ProductGrid>
            <AnimatePresence>
              {featuredProducts.map((product) => (
                <ProductCard
                  key={`featured-${product.id}`}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="badge">Featured</div>
                  <div className="image-container">
                    <img src={product.image} alt={product.title} />
                  </div>
                  <div className="content">
                    <h3>{product.title}</h3>
                    <div className="price-row">
                      <p className="price">${product.price.toFixed(2)}</p>
                      <div className="rating">
                        {"★".repeat(Math.round(product.rating.rate))}
                        {"☆".repeat(5 - Math.round(product.rating.rate))}
                        <span>({product.rating.count})</span>
                      </div>
                    </div>
                    <p className="description">{product.description}</p>
                    <div className="card-actions">
                      <button className="add-to-cart" onClick={handleAddToCart}>
                        Add to Cart
                      </button>
                      <button className="wishlist">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                </ProductCard>
              ))}
            </AnimatePresence>
          </ProductGrid>
        </SectionContainer>

        {/* All Products Section */}
        <SectionContainer>
          <SectionTitle>Our Collection</SectionTitle>
          <SectionDescription>
            Browse our extensive catalog of premium products
          </SectionDescription>

          <SearchBar>
            <input
              type="text"
              placeholder="Search our premium collection..."
              value={searchQuery}
              onChange={handleSearch}
            />
          </SearchBar>

          <CategoryFilter>
            <FilterButton
              active={selectedCategory === "all"}
              onClick={() => setSelectedCategory("all")}
            >
              All
            </FilterButton>
            {categories.map((category) => (
              <FilterButton
                key={category}
                active={selectedCategory === category}
                onClick={() => setSelectedCategory(category)}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </FilterButton>
            ))}
          </CategoryFilter>

          <ProductGrid>
            <AnimatePresence>
              {currentProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="image-container">
                    <img src={product.image} alt={product.title} />
                  </div>
                  <div className="content">
                    <h3>{product.title}</h3>
                    <div className="price-row">
                      <p className="price">${product.price.toFixed(2)}</p>
                      <div className="rating">
                        {"★".repeat(Math.round(product.rating.rate))}
                        {"☆".repeat(5 - Math.round(product.rating.rate))}
                        <span>({product.rating.count})</span>
                      </div>
                    </div>
                    <p className="description">{product.description}</p>
                    <div className="card-actions">
                      <button className="add-to-cart" onClick={handleAddToCart}>
                        Add to Cart
                      </button>
                      <button className="wishlist">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                </ProductCard>
              ))}
            </AnimatePresence>
          </ProductGrid>

          <Pagination>
            <button
              onClick={() => setCurrentPage((prev) => prev - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index + 1}
                onClick={() => setCurrentPage(index + 1)}
                className={currentPage === index + 1 ? "active" : ""}
              >
                {index + 1}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage((prev) => prev + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </Pagination>
        </SectionContainer>

        {/* Features Section */}
        <FeaturesSection>
          <SectionContainer>
            <SectionTitle>Why Choose LuxeCart</SectionTitle>
            <SectionDescription>
              We're committed to providing the best shopping experience
            </SectionDescription>

            <FeaturesGrid>
              <FeatureCard>
                <div className="icon">
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect
                      x="2"
                      y="2"
                      width="20"
                      height="20"
                      rx="5"
                      ry="5"
                    ></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </div>
                <h3>Premium Quality</h3>
                <p>
                  All our products are carefully selected to ensure the highest
                  quality standards.
                </p>
              </FeatureCard>

              <FeatureCard>
                <div className="icon">
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                </div>
                <h3>Fast Delivery</h3>
                <p>
                  We offer expedited shipping options to get your products to
                  you as quickly as possible.
                </p>
              </FeatureCard>

              <FeatureCard>
                <div className="icon">
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                </div>
                <h3>Satisfaction Guaranteed</h3>
                <p>
                  Not happy with your purchase? Our 30-day return policy has you
                  covered.
                </p>
              </FeatureCard>

              <FeatureCard>
                <div className="icon">
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                </div>
                <h3>Dedicated Support</h3>
                <p>
                  Our customer service team is available 24/7 to assist with any
                  questions or concerns.
                </p>
              </FeatureCard>
            </FeaturesGrid>
          </SectionContainer>
        </FeaturesSection>

        {/* Testimonials Section */}
        <TestimonialsSection>
          <SectionContainer>
            <SectionTitle>What Our Customers Say</SectionTitle>
            <SectionDescription>
              Don't just take our word for it - hear from our satisfied
              customers
            </SectionDescription>

            <TestimonialsGrid>
              {testimonials.map((testimonial) => (
                <TestimonialCard key={testimonial.id}>
                  <div className="quote">"</div>
                  <p>"{testimonial.text}"</p>
                  <div className="author">
                    <img src={testimonial.avatar} alt={testimonial.name} />
                    <div className="author-info">
                      <h4>{testimonial.name}</h4>
                      <span>{testimonial.title}</span>
                    </div>
                  </div>
                </TestimonialCard>
              ))}
            </TestimonialsGrid>
          </SectionContainer>
        </TestimonialsSection>

        {/* Newsletter Section */}
        <NewsletterSection>
          <SectionContainer>
            <SectionTitle>Stay Updated</SectionTitle>
            <SectionDescription>
              Subscribe to our newsletter for exclusive offers and updates
            </SectionDescription>

            <NewsletterForm>
              <input type="email" placeholder="Your email address" />
              <button type="submit">Subscribe</button>
            </NewsletterForm>
          </SectionContainer>
        </NewsletterSection>
      </MainContent>

      <Footer>
        <FooterContent>
          <div>
            <h3>About LuxeCart</h3>
            <ul>
              <li>
                <a href="#">Our Story</a>
              </li>
              <li>
                <a href="#">Careers</a>
              </li>
              <li>
                <a href="#">Press & Media</a>
              </li>
              <li>
                <a href="#">Sustainability</a>
              </li>
            </ul>
          </div>

          <div>
            <h3>Customer Service</h3>
            <ul>
              <li>
                <a href="#">Contact Us</a>
              </li>
              <li>
                <a href="#">Shipping Info</a>
              </li>
              <li>
                <a href="#">Returns & Exchanges</a>
              </li>
              <li>
                <a href="#">FAQ</a>
              </li>
            </ul>
          </div>

          <div>
            <h3>Connect With Us</h3>
            <ul>
              <li>
                <a href="#">Instagram</a>
              </li>
              <li>
                <a href="#">Facebook</a>
              </li>
              <li>
                <a href="#">Twitter</a>
              </li>
              <li>
                <a href="#">Pinterest</a>
              </li>
            </ul>
          </div>

          <div>
            <h3>Payment Methods</h3>
            <ul>
              <li>
                <a href="#">Credit Cards</a>
              </li>
              <li>
                <a href="#">PayPal</a>
              </li>
              <li>
                <a href="#">Apple Pay</a>
              </li>
              <li>
                <a href="#">Google Pay</a>
              </li>
            </ul>
          </div>
        </FooterContent>
        <Copyright>
          <p>
            &copy; {new Date().getFullYear()} LuxeCart. All rights reserved.
          </p>
        </Copyright>
      </Footer>
    </Container>
  );
}

export default App;
