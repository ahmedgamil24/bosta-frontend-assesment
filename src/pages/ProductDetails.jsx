import { useEffect, useState } from "react";
import { useParams,  } from "react-router";
import axiosInstance from "../api/axiosInstance";
import SkeletonCard from "../components/SkeletonCard";
import BackButton from "../components/BackButton";
import EmptyState from "../components/EmptyState";

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axiosInstance.get(`/products/${id}`);
        setProduct(response.data);
      } catch (err) {
      if (err.response?.status === 404) {
        setProduct(null);
      } else {
        setError("Something went wrong.");
      }
    } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <div className="text-center mt-10"><SkeletonCard /></div>;
  if (error) return <EmptyState icon="⚠️" title="Failed to Load Product" description={error} actionText="Retry" onAction={() => window.location.reload()} />
  if (!product) return <EmptyState icon="❌" title="Product Not Found" description="The product you are looking for does not exist."/>

  return (
    <>
  <div className="container mx-auto p-6">
    <div className="card lg:card-side bg-base-100 shadow-xl p-6 border border-gray-200">

      {/* Image */}
      <figure className="flex-1 bg-white rounded-xl p-6">
        <img
          src={product.image}
          alt={product.title}
          className="h-80 object-contain mx-auto"
        />
      </figure>

      {/* Details */}
      <div className="card-body flex-1">
        <h1 className="card-title text-3xl">
          {product.title}
        </h1>
        <div className="badge badge-outline w-fit">
          {product.category}
        </div>
        <p className="text-base-content/70 leading-relaxed mt-4">
          {product.description}
        </p>
        <div className="mt-6 flex items-center justify-between">
          <span className="text-3xl font-bold text-primary">
            ${product.price}
          </span>
          
          {/* To Be Continued... */}
          {/* <button className="btn btn-primary">
            Add to Cart
          </button> */}
        </div>
      </div>
    </div>
  </div>
<BackButton />
    </>
);}

export default ProductDetails;