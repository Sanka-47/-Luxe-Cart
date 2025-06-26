import React, { useState, useEffect, useRef } from "react";
import styled from "@emotion/styled";
import { motion, AnimatePresence } from "framer-motion";

const TextReveal = ({ children, delay = 0 }) => (
  <div style={{ overflow: "hidden" }}>
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: delay / 1000, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  </div>
);


const AnimatedProductCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.9);
  border-radius: 25px;
  overflow: hidden;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
  position: relative;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);

  // The hover effect is now handled by framer-motion's whileHover prop
  .card-actions {
    display: flex;
    gap: 0.75rem;
    opacity: 0;
    transform: translateY(15px);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1), cursor 0.08s ease-out;
     will-change: cursor, transform;
     transform: translateZ(0);
    padding: 0 1.5rem 1.5rem;
  }

  .image-container img {
    transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  }

  &:hover {
    .card-actions {
      opacity: 1;
      transform: translateY(0);
    }
    .image-container img {
      transform: scale(1.1);
    }
  }

  .badge {
    position: absolute;
    top: 1.5rem;
    right: 1.5rem;
    background: linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%);
    color: white;
    font-size: 0.8rem;
    font-weight: bold;
    padding: 0.6rem 1rem;
    border-radius: 25px;
    z-index: 10;
    box-shadow: 0 4px 15px rgba(255, 107, 107, 0.3);
  }

  .image-container {
    position: relative;
    width: 100%;
    padding-top: 100%;
    overflow: hidden;
    background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);

    img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: contain;
      padding: 2rem;
    }
  }

  .content {
    padding: 1.5rem;

    h3 {
      margin: 0;
      font-size: 1.15rem;
      color: #1a1a1a;
      font-weight: 700;
      line-height: 1.4;
      margin-bottom: 0.75rem;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      letter-spacing: -0.01em;
    }

    .price-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
    }

    p.price {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      font-weight: 800;
      font-size: 1.3rem;
      margin: 0;
    }

    .rating {
      display: flex;
      align-items: center;
      color: #fbbf24;
      font-size: 1rem;

      span {
        margin-left: 0.5rem;
        color: #6b7280;
        font-weight: 500;
        font-size: 0.9rem;
      }
    }

    .description {
      font-size: 0.95rem;
      color: #6b7280;
      margin-bottom: 1.5rem;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      line-height: 1.6;
    }
  }

  .card-actions button {
    flex: 1;
    padding: 0.9rem;
    border: none;
    border-radius: 15px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1), cursor 0.08s ease-out;
     will-change: cursor, transform;
     transform: translateZ(0);
    font-size: 0.9rem;

    &.add-to-cart {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);

      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
      }
    }

    &.wishlist {
      background: rgba(255, 255, 255, 0.8);
      color: #4a5568;
      border: 1px solid rgba(0, 0, 0, 0.05);

      &:hover {
        background: rgba(255, 255, 255, 1);
        transform: translateY(-2px);
      }
    }
  }
`;



const FluidBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
  overflow: hidden;
`;

const FluidBlob = styled(motion.div)`
  position: absolute;
  border-radius: 50%;
  background: radial-gradient(
    circle,
    rgba(102, 126, 234, 0.15) 0%,
    rgba(118, 75, 162, 0.1) 50%,
    transparent 70%
  );
  filter: blur(40px);
  mix-blend-mode: multiply;
`;

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  font-family: "Inter", -apple-system, BlinkMacSystemFont, sans-serif;
  position: relative;
  overflow-x: hidden;
`;

const Navbar = styled.nav`
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(15px);
  padding: 1rem 0;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.05);
  position: sticky;
  top: 0;
  z-index: 1000;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
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
  font-size: 1.8rem;
  font-weight: 800;
  color: #1a1a1a;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  letter-spacing: -0.02em;

  span {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2.5rem;
  align-items: center;

  a {
    text-decoration: none;
    color: #4a5568;
    font-weight: 500;
    font-size: 0.95rem;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    padding: 0.5rem 0;

    &:before {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      width: 0;
      height: 2px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    &:hover {
      color: #667eea;

      &:before {
        width: 100%;
      }
    }
  }
`;

const CartButton = styled.button`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  padding: 0.7rem 1.2rem;
  border-radius: 50px;
  cursor: pointer;
  position: relative;
  color: white;
  font-weight: 600;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
  }

  .cart-count {
    position: absolute;
    top: -8px;
    right: -8px;
    background: #ff6b6b;
    color: white;
    font-size: 0.75rem;
    padding: 0.2rem 0.5rem;
    border-radius: 50px;
    font-weight: bold;
    box-shadow: 0 2px 8px rgba(255, 107, 107, 0.3);
  }
`;

const MainContent = styled.main`
  width: 100%;
  flex: 1;
`;

const HeroSection = styled.section`
  background: linear-gradient(
      135deg,
      rgba(102, 126, 234, 0.9) 0%,
      rgba(118, 75, 162, 0.9) 100%
    ),
    url("https://images.unsplash.com/photo-1523381294911-8d3cead13475?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80");
  background-size: cover;
  background-position: center;
  height: 60vh;
  min-height: 450px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  text-align: center;
  margin-bottom: 4rem;
  position: relative;
  overflow: hidden;

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(
      circle at 30% 70%,
      rgba(255, 255, 255, 0.05) 0%,
      transparent 40%
    );
  }
`;

const HeroContent = styled.div`
  max-width: 900px;
  padding: 0 2rem;
  position: relative;
  z-index: 2;

  h1 {
    font-size: 4rem;
    margin-bottom: 1.5rem;
    font-weight: 800;
    line-height: 1.1;
    letter-spacing: -0.02em;
    text-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  }

  p {
    font-size: 1.3rem;
    margin-bottom: 2.5rem;
    opacity: 0.95;
    line-height: 1.6;
    font-weight: 300;
  }

  button {
    padding: 1.2rem 3rem;
    background: rgba(255, 255, 255, 0.15);
    color: white;
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-radius: 50px;
    font-size: 1.1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1), cursor 0.08s ease-out;
     will-change: cursor, transform;
     transform: translateZ(0);
     backdrop-filter: blur(10px);
    letter-spacing: 0.5px;
  }
`;

const SectionContainer = styled.div`
  max-width: 1400px;
  width: 100%;
  margin: 0 auto;
  padding: 3rem 2rem;
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  color: #1a1a1a;
  margin-bottom: 1rem;
  text-align: center;
  position: relative;
  padding-bottom: 1.5rem;
  font-weight: 700;
  letter-spacing: -0.02em;

  &:after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 4px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 2px;
  }
`;

const SectionDescription = styled.p`
  color: #6b7280;
  font-size: 1.2rem;
  text-align: center;
  max-width: 800px;
  margin: 0 auto 4rem auto;
  line-height: 1.7;
  font-weight: 300;
`;

const SearchBar = styled.div`
  margin-bottom: 3rem;
  display: flex;
  justify-content: center;

  input {
    width: 100%;
    max-width: 700px;
    padding: 1.2rem 2rem;
    border: none;
    border-radius: 25px;
    font-size: 1.1rem;
    color: #374151;
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(10px);
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    border: 1px solid rgba(255, 255, 255, 0.2);

    &:focus {
      outline: none;
      box-shadow: 0 15px 50px rgba(102, 126, 234, 0.15);
      transform: translateY(-3px);
      border-color: rgba(102, 126, 234, 0.3);
    }

    &::placeholder {
      color: #9ca3af;
      font-weight: 300;
    }
  }
`;

const CategoryFilter = styled.div`
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  margin-bottom: 4rem;
  flex-wrap: wrap;
  padding: 0 1rem;
`;

const FilterButton = styled.button`
  padding: 0.8rem 1.8rem;
  border: none;
  border-radius: 25px;
  background: ${(props) =>
    props.active
      ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
      : "rgba(255, 255, 255, 0.9)"};
  color: ${(props) => (props.active ? "white" : "#4a5568")};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1), cursor 0.15s ease-in-out;
  box-shadow: ${(props) =>
    props.active
      ? "0 8px 25px rgba(102, 126, 234, 0.3)"
      : "0 4px 15px rgba(0, 0, 0, 0.08)"};
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);

  &:hover {
    transform: translateY(-3px);
    box-shadow: ${(props) =>
      props.active
        ? "0 12px 35px rgba(102, 126, 234, 0.4)"
        : "0 8px 25px rgba(0, 0, 0, 0.12)"};
  }
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2.5rem;
  margin-bottom: 4rem;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 4rem;

  button {
    padding: 0.8rem 1.3rem;
    border: none;
    border-radius: 15px;
    background: rgba(255, 255, 255, 0.9);
    color: #4a5568;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);

    &:hover:not(:disabled) {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      transform: translateY(-3px);
      box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
    }

    &.active {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
      &:hover {
        transform: none;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
      }
    }
  }
`;

const TestimonialsSection = styled.section`
  background: transparent;
  padding: 5rem 0;
  margin: 4rem 0;
`;

const TestimonialsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
`;

const TestimonialCard = styled.div`
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  padding: 2.5rem;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
  position: relative;

  .quote {
    position: absolute;
    top: 1rem;
    left: 1.5rem;
    font-size: 5rem;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    opacity: 0.1;
  }

  p {
    font-style: italic;
    margin-bottom: 1.5rem;
    color: #4a5568;
    line-height: 1.7;
    font-size: 1.05rem;
    position: relative;
    z-index: 2;
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
      border: 2px solid rgba(102, 126, 234, 0.5);
    }

    .author-info {
      h4 {
        margin: 0;
        color: #1a1a1a;
        font-weight: 600;
      }
      span {
        font-size: 0.9rem;
        color: #6b7280;
      }
    }
  }
`;

const Footer = styled.footer`
  background: linear-gradient(135deg, #2d3748 0%, #1a1a1a 100%);
  color: white;
  padding: 4rem 0 2rem;
  margin-top: 4rem;
  position: relative;
  overflow: hidden;

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(
      circle at 20% 80%,
      rgba(102, 126, 234, 0.08) 0%,
      transparent 40%
    );
  }
`;

const FooterContent = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 2rem;
  position: relative;
  z-index: 2;

  h3 {
    font-size: 1.2rem;
    margin-bottom: 1.5rem;
    color: #667eea;
    font-weight: 600;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    li {
      margin-bottom: 0.75rem;
      a {
        color: #a0aec0;
        text-decoration: none;
        transition: color 0.3s ease;
        &:hover {
          color: white;
        }
      }
    }
  }
`;

const Copyright = styled.div`
  text-align: center;
  padding-top: 3rem;
  margin-top: 3rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  color: #a0aec0;
  font-size: 0.9rem;
`;


function App() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [fluidBlobs, setFluidBlobs] = useState([
    { id: 1, x: 200, y: 200, size: 300 },
    { id: 2, x: 600, y: 400, size: 250 },
    { id: 3, x: 1000, y: 300, size: 200 },
  ]);
  const productsPerPage = 8;
  const productGridRef = useRef(null);

  // Function to scroll to product grid
  const scrollToProductGrid = () => {
    if (productGridRef.current) {
      productGridRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  // Track mouse movement for fluid animation
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Update fluid blobs based on mouse position
  useEffect(() => {
    const updateBlobs = () => {
      setFluidBlobs((prevBlobs) =>
        prevBlobs.map((blob, index) => {
          const influence = 0.05 + index * 0.02;
          const targetX =
            mousePosition.x + Math.sin(Date.now() * 0.001 + index) * 100;
          const targetY =
            mousePosition.y + Math.cos(Date.now() * 0.001 + index) * 80;

          return {
            ...blob,
            x: blob.x + (targetX - blob.x) * influence,
            y: blob.y + (targetY - blob.y) * influence,
          };
        })
      );
    };

    const interval = setInterval(updateBlobs, 16); // ~60fps
    return () => clearInterval(interval);
  }, [mousePosition]);

  // Fetch products from API on initial render
  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setFilteredProducts(data);

        // Set featured products (e.g., top 4 highest rated)
        const sorted = [...data].sort((a, b) => b.rating.rate - a.rating.rate);
        setFeaturedProducts(sorted.slice(0, 4));

        // Get unique categories for filter buttons
        const uniqueCategories = [
          ...new Set(data.map((product) => product.category)),
        ];
        setCategories(uniqueCategories);
      });
  }, []);

  // Effect to filter products when category, search, or product list changes
  useEffect(() => {
    let filtered = products;

    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (product) => product.category === selectedCategory
      );
    }

    if (searchQuery) {
      const lowercasedQuery = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (product) =>
          product.title.toLowerCase().includes(lowercasedQuery) ||
          product.description.toLowerCase().includes(lowercasedQuery)
      );
    }

    setFilteredProducts(filtered);
    setCurrentPage(1); // Reset to first page on new filter
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

  const handleAddToCart = (product) => {
    // In a real app, you'd add the product to a cart state array
    console.log("Added to cart:", product.title);
    setCartCount((prev) => prev + 1);
  };

  // Static testimonials data
  const testimonials = [
    {
      id: 1,
      text: "Shopping here has been a dream. The quality is consistently outstanding and the customer service is top-notch!",
      name: "Sarah Johnson",
      title: "Regular Customer",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      id: 2,
      text: "The product selection is incredible. I always find what I'm looking for, and often discover new things I love!",
      name: "Michael Chen",
      title: "Fashion Enthusiast",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      id: 3,
      text: "Fast shipping, secure packaging, and premium products. This has become my go-to online store for everything.",
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
            Luxe<span>Cart</span>
          </Logo>
          <NavLinks>
            <a href="#">Home</a>
            <a href="#">Categories</a>
            <a href="#">New Arrivals</a>
            <a href="#">Sale</a>
          </NavLinks>
          <CartButton>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
          </CartButton>
        </NavContent>
      </Navbar>

      <FluidBackground>
        {fluidBlobs.map((blob) => (
          <FluidBlob
            key={blob.id}
            animate={{
              x: blob.x - blob.size / 2,
              y: blob.y - blob.size / 2,
            }}
            transition={{
              type: "spring",
              stiffness: 50,
              damping: 20,
              mass: 1,
            }}
            style={{
              width: blob.size,
              height: blob.size,
            }}
          />
        ))}
      </FluidBackground>

      <MainContent>
        <HeroSection>
          <HeroContent>
           
            <TextReveal>
              <h1>Discover Luxury at Your Fingertips</h1>
            </TextReveal>
            <TextReveal delay={200}>
              <p>
                Premium products curated for the discerning customer. Explore our
                exclusive collection today.
              </p>
            </TextReveal>
            <TextReveal delay={400}>
   
              <motion.button
                whileHover={{
                  scale: 1.05,
                  y: -3,
                  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
                  borderColor: "rgba(255, 255, 255, 0.5)",
                  background: "rgba(255, 255, 255, 0.25)"
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                Shop Now
              </motion.button>
            </TextReveal>
          </HeroContent>
        </HeroSection>

        <SectionContainer>
          <TextReveal>
            <SectionTitle>Featured Products</SectionTitle>
          </TextReveal>
          <TextReveal delay={200}>
            <SectionDescription>
              Our most popular items, hand-picked for exceptional quality and
              style.
            </SectionDescription>
          </TextReveal>
          <ProductGrid>
            <AnimatePresence>
              {featuredProducts.map((product, index) => (
           
                <AnimatedProductCard
                  key={`featured-${product.id}`}
                  layout
                  initial={{ opacity: 0, y: 50, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.9 }}
                  transition={{
                    delay: index * 0.1,
                    duration: 0.6,
                    type: "spring",
                    stiffness: 100,
                    damping: 15,
                  }}
                  whileHover={{
                    y: -8,
                    scale: 1.02,
                    boxShadow: "0 20px 60px rgba(0, 0, 0, 0.12)",
                    transition: { duration: 0.2 },
                  }}
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
                      <button
                        className="add-to-cart"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddToCart(product);
                        }}
                      >
                        Add to Cart
                      </button>
                      <button className="wishlist">♡</button>
                    </div>
                  </div>
                </AnimatedProductCard>
              ))}
            </AnimatePresence>
          </ProductGrid>
        </SectionContainer>

        <SectionContainer>
          <SectionTitle>Our Collection</SectionTitle>
          <SectionDescription>
            Browse our extensive catalog of premium products, with new items
            added weekly.
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

          <ProductGrid ref={productGridRef}>
            <AnimatePresence>
              {currentProducts.map((product, index) => (
              
                <AnimatedProductCard
                  key={product.id}
                  layout
                  initial={{ opacity: 0, y: 50, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.9 }}
                  transition={{
                    delay: index * 0.1,
                    duration: 0.6,
                    type: "spring",
                    stiffness: 100,
                    damping: 15,
                  }}
                   whileHover={{
                    y: -8,
                    scale: 1.02,
                    boxShadow: "0 20px 60px rgba(0, 0, 0, 0.12)",
                    transition: { duration: 0.2 },
                  }}
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
                      <button
                        className="add-to-cart"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddToCart(product);
                        }}
                      >
                        Add to Cart
                      </button>
                      <button className="wishlist">♡</button>
                    </div>
                  </div>
                </AnimatedProductCard>
              ))}
            </AnimatePresence>
          </ProductGrid>

          <Pagination>
            <button
              onClick={() => {
                setCurrentPage((p) => p - 1);
                scrollToProductGrid();
              }}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index + 1}
                onClick={() => {
                  setCurrentPage(index + 1);
                  scrollToProductGrid();
                }}
                className={currentPage === index + 1 ? "active" : ""}
              >
                {index + 1}
              </button>
            ))}
            <button
              onClick={() => {
                setCurrentPage((p) => p + 1);
                scrollToProductGrid();
              }}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </Pagination>
        </SectionContainer>

        <TestimonialsSection>
          <SectionContainer>
            <TextReveal>
              <SectionTitle>What Our Customers Say</SectionTitle>
            </TextReveal>
            <TextReveal delay={200}>
              <SectionDescription>
                Don't just take our word for it - hear from our satisfied
                customers.
              </SectionDescription>
            </TextReveal>
            <TestimonialsGrid>
              {testimonials.map((testimonial, index) => (
             
                <motion.div
                  key={testimonial.id}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: index * 0.2,
                    duration: 0.6,
                    type: "spring",
                    stiffness: 100,
                  }}
                  viewport={{ once: true, margin: "-100px" }}
                >
                  <TestimonialCard>
                    <div className="quote">“</div>
                    <p>{testimonial.text}</p>
                    <div className="author">
                      <img src={testimonial.avatar} alt={testimonial.name} />
                      <div className="author-info">
                        <h4>{testimonial.name}</h4>
                        <span>{testimonial.title}</span>
                      </div>
                    </div>
                  </TestimonialCard>
                </motion.div>
              ))}
            </TestimonialsGrid>
          </SectionContainer>
        </TestimonialsSection>
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
