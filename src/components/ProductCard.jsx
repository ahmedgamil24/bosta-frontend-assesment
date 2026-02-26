import React from 'react'
import { Link } from 'react-router'

const ProductCard = ( {product} ) => {
  return (
    <div className="border p-4 rounded-lg shadow hover:shadow-lg transition flex flex-col justify-between h-full">
      <img
        src={product.image}
        alt={product.title}
        className="h-40 mx-auto object-contain"
      />

      <h2 className="font-semibold mt-4 line-clamp-2 ">
        {product.title}
      </h2>

      <p className="text-gray-500">{product.category}</p>
      <p className="font-bold mt-2">${product.price}</p>

      <Link
        to={`/products/${product.id}`}
        className="block mt-4 text-center bg-black text-white py-2 rounded"
      >
        View Details
      </Link>
    </div>
  )
}

export default ProductCard