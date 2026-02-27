import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import SkeletonCard from "../components/SkeletonCard";
import SkeletonForm from "../components/SkeletonForm";

const schema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  price: z.coerce.number().positive("Price must be positive"),
  category: z.string().min(1, "Category is required"),
  image: z.string().url("Must be a valid URL"),
});

function CreateProduct() {
  const [categories, setCategories] = useState([]);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(true)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
  });

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      const response = await axiosInstance.get("/products/categories");
      setCategories(response.data);
      setLoading(false)
    };
    fetchCategories();
  }, []);

  const onSubmit = async (data) => {
    setSuccess(false);

    try {
      await axiosInstance.post("/products", data);
      setSuccess(true);
      reset();
    } catch (error) {
      // console.log(error)
      alert("Failed to create product.");
    }
  };

  if (loading) return <div><SkeletonForm /> </div>

  return (
    <div className="container mx-auto p-6 flex justify-center">
      <div className="card w-full max-w-xl bg-base-100 shadow-xl">
        <div className="card-body">
          <h1 className="card-title text-2xl mb-4">Create Product</h1>

          {success && (
            <div className="alert alert-success mb-4">
              <span>Product created successfully!</span>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Title */}
            <div className="form-control w-full">
              <label className="label pb-1">
                <span className="label-text font-medium">Title</span>
              </label>
              <input
                {...register("title")}
                className={`input input-bordered mb-1.5 w-full ${
                  errors.title ? "input-error" : ""
                }`}
                placeholder="Enter product title"
              />
              {errors.title && (
                <span className="text-error text-sm mt-1">
                  {errors.title.message}
                </span>
              )}
            </div>

            {/* Description */}
            <div className="form-control w-full">
              <label className="label pb-1">
                <span className="label-text font-medium">Description</span>
              </label>
              <textarea
                {...register("description")}
                className={`textarea textarea-bordered mb-1.5 w-full ${
                  errors.description ? "textarea-error" : ""
                }`}
                placeholder="Enter product description"
              />
              {errors.description && (
                <span className="text-error text-sm mt-1">
                  {errors.description.message}
                </span>
              )}
            </div>

            {/* Price */}
            <div className="form-control w-full">
              <label className="label pb-1">
                <span className="label-text font-medium">Price</span>
              </label>
              <input
                type="number"
                {...register("price")}
                className={`input input-bordered mb-1.5 w-full ${
                  errors.price ? "input-error" : ""
                }`}
                placeholder="Enter price"
              />
              {errors.price && (
                <span className="text-error text-sm mt-1">
                  {errors.price.message}
                </span>
              )}
            </div>

            {/* Category */}
            <div className="form-control w-full">
              <label className="label pb-1">
                <span className="label-text font-medium">Category</span>
              </label>
              <select
                {...register("category")}
                className={`select select-bordered mb-1.5 w-full ${
                  errors.category ? "select-error" : ""
                }`}
              >
                <option value="">Select category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              {errors.category && (
                <span className="text-error text-sm mt-1">
                  {errors.category.message}
                </span>
              )}
            </div>

            {/* Image */}
            <div className="form-control w-full">
              <label className="label pb-1">
                <span className="label-text font-medium">Image URL</span>
              </label>
              <input
                {...register("image")}
                className={`input input-bordered mb-1.5 w-full ${
                  errors.image ? "input-error" : ""
                }`}
                placeholder="https://example.com/image.jpg"
              />
              {errors.image && (
                <span className="text-error text-sm mt-1">
                  {errors.image.message}
                </span>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn btn-primary w-full mt-4"
            >
              {isSubmitting ? "Creating..." : "Create Product"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateProduct;
