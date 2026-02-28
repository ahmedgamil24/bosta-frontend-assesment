import { Link } from "react-router";

const ProductCard = ({ product }) => {
  return (
    <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition border border-gray-200">
      <figure className="h-52 bg-white p-4">
        <img
          src={product.image}
          alt={product.title}
          className="h-full object-contain"
        />
      </figure>

      <div className="card-body flex flex-col">
        <h2 className="card-title line-clamp-1">{product.title}</h2>

        <p className="text-sm text-gray-500 line-clamp-2">
          {product.category}
        </p>

        <div className="mt-auto flex justify-between items-center">
          <span className="text-lg font-bold text-primary">
            ${product.price}
          </span>

          <Link
            to={`/products/${product.id}`}
            className="btn btn-sm btn-outline btn-primary"
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  );
};
export default ProductCard;