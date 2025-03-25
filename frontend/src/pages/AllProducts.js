import React, { useEffect, useState } from "react";
import UploadProduct from "../components/UploadProduct";
import SummaryApi from "../common";
import AdminProductCard from "../components/AdminProductCard";

const AllProducts = () => {
  const [openUploadProduct, setOpenUploadProduct] = useState(false);
  const [allProduct, setAllProduct] = useState([]);

  const fetchAllProduct = async () => {
    const response = await fetch(SummaryApi.allProduct.url);
    const dataResponse = await response.json();

    console.log("product data", dataResponse);

    setAllProduct(dataResponse?.data || []);
  };

  useEffect(() => {
    fetchAllProduct();
  }, []);

  return (
    <div className="bg-gradient-to-b from-white to-gray-100 min-h-screen">
      {/* Header */}
      <div className="bg-[#F8F9FA] py-4 px-6 flex justify-between items-center shadow-md border-b border-gray-300">
        <h2 className="font-bold text-2xl text-gray-800">All Products</h2>
        <button
          className="border-2 border-[#E0A800] text-[#E0A800] hover:bg-[#E0A800] hover:text-white transition-all py-2 px-4 rounded-full"
          onClick={() => setOpenUploadProduct(true)}
        >
          Upload Product
        </button>
      </div>

      {/* Product List */}
      <div className="flex flex-wrap gap-6 p-6 overflow-y-scroll h-[calc(100vh-120px)]">
        {allProduct.length > 0 ? (
          allProduct.map((product, index) => {
            return (
              <AdminProductCard
                data={product}
                key={`${index}-allProduct`}
                fetchdata={fetchAllProduct}
              />
            );
          })
        ) : (
          <p className="w-full text-center text-gray-500">
            No products found. Click "Upload Product" to add new items.
          </p>
        )}
      </div>

      {/* Upload Product Modal */}
      {openUploadProduct && (
        <UploadProduct
          onClose={() => setOpenUploadProduct(false)}
          fetchData={fetchAllProduct}
        />
      )}
    </div>
  );
};

export default AllProducts;
