import React, { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import ProductCard from "../components/ProductCard";
import { Link } from "react-router";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);

  // Sorting State
  const [sortOption, setSortOption] = useState("");

  const categories = [...new Set(products.map((p) => p.category))];

  // Sorted Products
  const sortedProducts = [...products].sort((a, b) => {
    if (sortOption === "price-asc") {
      return a.price - b.price;
    }

    if (sortOption === "price-desc") {
      return b.price - a.price;
    }

    if (sortOption.startsWith("category-")) {
      const selectedCategory = sortOption.split("-")[1];
      return a.category === selectedCategory ? -1 : 1;
    }

    return 0;
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axiosInstance.get("/products");
        // console.log(response)
        setProducts(response.data);
      } catch (err) {
        // console.log(err)
        setError("Something went wrong while fetching products.");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // After Pagination
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  if (loading) return <div>Loading... </div>;

  if (error) return <div>{error}</div>;

  if (!products.length)
    return <p className="text-center mt-10">No products found.</p>;

  // Pagination
  const productsPerPage = 10;

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

  // const currentProducts = products.slice(
  const currentProducts = sortedProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct,
  );

  const totalPages = Math.ceil(products.length / productsPerPage);

  return (
    <div className="container mx-auto p-4">
      <div className="navbar bg-base-100 mb-6 rounded-box shadow px-4 flex flex-col sm:flex-row gap-3">
        {/* Left Side */}
        <div className="flex-1">
          <h1 className="text-2xl font-bold">Products</h1>
        </div>

        {/* Right Side */}
        <div className="flex-none flex items-center gap-3">
          <select
            value={sortOption}
            onChange={(e) => {
              setSortOption(e.target.value);
              setCurrentPage(1);
            }}
            className="select select-bordered select-sm"
          >
            <option value="">Default</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>

            {categories.map((cat) => (
              <option key={cat} value={`category-${cat}`}>
                Category: {cat}
              </option>
            ))}
          </select>

          <Link to="/create" className="btn btn-primary btn-sm">
            Create Product
          </Link>
        </div>
      </div>

      {/* Listing Products */}
      <div className="grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {currentProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-8 gap-2 flex-wrap">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            className={`btn btn-md ${
              currentPage === index + 1 ? "btn-primary" : "btn-outline"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Products;
