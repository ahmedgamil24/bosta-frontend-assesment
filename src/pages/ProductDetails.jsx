import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import axiosInstance from "../api/axiosInstance";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axiosInstance.get(`/products/${id}`);
        setProduct(response.data);
      } catch (err) {
        setError("Failed to load product.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;
  if (!product) return null;

  return (
    <div className="container mx-auto p-6">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 bg-gray-200 px-4 py-2 rounded"
      >
        Back to Products
      </button>

      <div className="grid md:grid-cols-2 gap-10 items-center">
        <img
          src={product.image}
          alt={product.title}
          className="h-80 mx-auto object-contain"
        />

        <div>
          <h1 className="text-3xl font-bold mb-4">
            {product.title}
          </h1>

          <p className="text-gray-600 mb-4">
            {product.category}
          </p>

          <p className="mb-6 leading-relaxed">
            {product.description}
          </p>

          <p className="text-2xl font-bold">
            ${product.price}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;