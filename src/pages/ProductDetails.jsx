import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import axiosInstance from "../api/axiosInstance";
import SkeletonCard from "../components/SkeletonCard";
import ErrorToast from "../components/ErrorToast";

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
        // console.log(err)
        setError("Failed to load product.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <p className="text-center mt-10"><SkeletonCard /></p>;
  if (error) return <p className="text-center mt-10 text-red-500"><ErrorToast error={error} setError={setError}/></p>;
  if (!product) return null;

  return (
    <>
  <div className="container mx-auto p-6">

    <div className="card lg:card-side bg-base-100 shadow-xl p-6">

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

          {/* <button className="btn btn-primary">
            Add to Cart
          </button> */}
        </div>

      </div>
    </div>
  </div>

      {/* Back Button */}
      <div className=" flex justify-center items-center mt-5">
    <button
      onClick={() => navigate(-1)}
      className="btn btn-outline btn-primary btn-sm mb-6"
    >
      ← Back to Products
    </button>
</div>
    </>
);}

export default ProductDetails;