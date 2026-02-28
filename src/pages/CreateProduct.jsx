import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import SkeletonForm from "../components/SkeletonForm";
import BackButton from "../components/BackButton";
import EmptyState from "../components/EmptyState";

const schema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  price: z.coerce.number().positive("Price must be positive"),
  category: z.string().min(1, "Category is required"),
  image: z.string().url("Must be a valid URL"),
});

function CreateProduct() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
  });

  // Disapearing the toast
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 2500);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axiosInstance.get("/products/categories");
        setCategories(response.data);
      } catch (error) {
        console.log(error);
        // setToast({ type: "error", message: "Failed to load categories." });
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const onSubmit = async (data) => {
    try {
      await axiosInstance.post("/products", data);
      setToast({ type: "success", message: "Product created successfully!" });
      window.scrollTo({ top: 0, behavior: "smooth" });
      reset();
    } catch (error) {
      // console.log(error)
      setToast({ type: "error", message: "Failed to create product." });
    }
  };

  if (loading) return (<div><SkeletonForm />{" "}</div>);

  if (!categories.length && !loading) {
  return (
    <EmptyState
      icon="⚠️"
      title="Failed to Load Categories"
      description="Cannot get product categories at the moment."
      actionText="Retry"
      onAction={() => window.location.reload()}
    />
  );
}

  return (
    <>
    <div className="container mx-auto p-6 flex justify-center ">
      <div className="card w-full max-w-xl bg-base-100 shadow-xl border border-gray-200">
        <div className="card-body">
          <h1 className="card-title text-2xl mb-4">Create Product</h1>

          {toast && (
            <div className="toast toast-top toast-end">
              <div
                className={`alert ${
                  toast.type === "success" ? "alert-success" : "alert-error"
                }`}
              >
                <span>{toast.message}</span>
              </div>
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
              {isSubmitting && (
                <span className="loading loading-spinner loading-sm"></span>
              )}
              {isSubmitting ? "Creating..." : "Create Product"}
            </button>
          </form>
        </div>
      </div>
    </div>
      <BackButton />
</>
  );
}

export default CreateProduct;
