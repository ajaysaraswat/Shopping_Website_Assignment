import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ProductListingPage.css";

interface Product {
  id: number;
  title: string;
  image: string;
  price: number;
  category: string;
}

const ProductListingPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://fakestoreapi.com/products");
        setProducts(response.data);
        setFilteredProducts(response.data);
        const categoryResponse = await axios.get(
          "https://fakestoreapi.com/products/categories"
        );
        setCategories(categoryResponse.data);
      } catch (error) {
        console.error("Error fetching products", error);
      }
    };
    fetchProducts();
  }, []);

  const handleCategoryChange = async (category: string) => {
    if (category === "all") {
      setFilteredProducts(products);
    } else {
      const response = await axios.get(
        `https://fakestoreapi.com/products/category/${category}`
      );
      setFilteredProducts(response.data);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    const filtered = products.filter((product) =>
      product.title.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  return (
    <div className="product-listing">
      <h1>Product Listing</h1>
      <div className="filters">
        <select onChange={(e) => handleCategoryChange(e.target.value)}>
          <option value="all">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      <div className="product-grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product.id} className="product-item">
              <img src={product.image} alt={product.title} />
              <h2>{product.title}</h2>
              <p>${product.price}</p>
            </div>
          ))
        ) : (
          <p>No products available</p>
        )}
      </div>
    </div>
  );
};

export default ProductListingPage;
