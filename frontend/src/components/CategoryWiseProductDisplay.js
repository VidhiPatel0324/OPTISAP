import React, { useContext, useEffect, useState } from "react";
import fetchCategoryWiseProduct from "../helpers/fetchCategoryWiseProduct";
import displayINRCurrency from "../helpers/displayCurrency";
import { Link } from "react-router-dom";
import addToCart from "../helpers/addToCart";
import Context from "../context";
import scrollTop from "../helpers/scrollTop";

const CategoryWiseProductDisplay = ({ category, heading }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const loadingList = new Array(8).fill(null);

  const { fetchUserAddToCart } = useContext(Context);

  const handleAddToCart = async (e, id) => {
    await addToCart(e, id);
    fetchUserAddToCart();
  };

  const fetchData = async () => {
    setLoading(true);
    const categoryProduct = await fetchCategoryWiseProduct(category);
    setLoading(false);
    setData(categoryProduct?.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="w-full bg-gray-50 py-10">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          {heading}
        </h2>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {loading
            ? loadingList.map((_, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-md p-4 animate-pulse"
                >
                  <div className="h-48 bg-gray-200 rounded"></div>
                  <div className="mt-4 space-y-2">
                    <div className="h-6 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded"></div>
                  </div>
                </div>
              ))
            : data.map((product, index) => (
                <Link
                  to={`/product/${product?._id}`}
                  key={index}
                  className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-2"
                  onClick={scrollTop}
                >
                  {/* Product Image */}
                  <div className="h-48 bg-gray-100 flex items-center justify-center">
                    <img
                      src={product?.productImage[0]}
                      alt={product?.productName}
                      className="object-contain h-full hover:scale-105 transition-transform"
                    />
                  </div>
                  {/* Product Details */}
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-800 truncate">
                      {product?.productName}
                    </h3>
                    <p className="text-sm text-gray-500 capitalize">
                      {product?.category}
                    </p>
                    <div className="flex items-center justify-between mt-4">
                      <p className="text-red-600 font-bold">
                        {displayINRCurrency(product?.sellingPrice)}
                      </p>
                      <p className="text-gray-500 line-through">
                        {displayINRCurrency(product?.price)}
                      </p>
                    </div>
                    <button
                      className="w-full mt-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
                      onClick={(e) => handleAddToCart(e, product?._id)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </Link>
              ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryWiseProductDisplay;
