import React, { useState } from "react";
import { CgClose } from "react-icons/cg";
import productCategory from "../helpers/productCategory";
import { FaCloudUploadAlt } from "react-icons/fa";
import uploadImage from "../helpers/uploadImage";
import DisplayImage from "./DisplayImage";
import { MdDelete } from "react-icons/md";
import SummaryApi from "../common";
import { toast } from "react-toastify";

const UploadProduct = ({ onClose, fetchData }) => {
  const [data, setData] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImage: [],
    description: "",
    price: "",
    sellingPrice: "",
  });
  const [openFullScreenImage, setOpenFullScreenImage] = useState(false);
  const [fullScreenImage, setFullScreenImage] = useState("");

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUploadProduct = async (e) => {
    const file = e.target.files[0];
    const uploadImageCloudinary = await uploadImage(file);

    setData((prev) => ({
      ...prev,
      productImage: [...prev.productImage, uploadImageCloudinary.url],
    }));
  };

  const handleDeleteProductImage = (index) => {
    const newProductImage = [...data.productImage];
    newProductImage.splice(index, 1);
    setData((prev) => ({ ...prev, productImage: newProductImage }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(SummaryApi.uploadProduct.url, {
      method: SummaryApi.uploadProduct.method,
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const responseData = await response.json();
    if (responseData.success) {
      toast.success(responseData?.message);
      onClose();
      fetchData?.();
    } else {
      toast.error(responseData?.message);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      {/* Modal Container */}
      <div className="bg-white w-full max-w-2xl rounded-lg shadow-lg p-6 max-h-[90%] overflow-y-auto relative">
        {/* Modal Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">Upload Product</h2>
          <button className="text-gray-600 hover:text-red-600 transition-all" onClick={onClose}>
            <CgClose size={30} />
          </button>
        </div>

        {/* Product Form */}
        <form className="grid gap-6" onSubmit={handleSubmit}>
          {/* Product Name */}
          <input
            type="text"
            name="productName"
            placeholder="Product Name"
            value={data.productName}
            onChange={handleOnChange}
            className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />

          {/* Brand Name */}
          <input
            type="text"
            name="brandName"
            placeholder="Brand Name"
            value={data.brandName}
            onChange={handleOnChange}
            className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />

          {/* Category Selector */}
          <select
            name="category"
            value={data.category}
            onChange={handleOnChange}
            className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          >
            <option value="">Select Category</option>
            {productCategory.map((el, index) => (
              <option key={index} value={el.value}>
                {el.label}
              </option>
            ))}
          </select>

          {/* Upload Product Image */}
          <label className="border-dashed border-2 border-gray-300 p-4 flex flex-col items-center justify-center rounded-lg text-center cursor-pointer hover:border-indigo-500 transition">
            <FaCloudUploadAlt className="text-4xl text-gray-400" />
            <span className="text-gray-500 mt-2">Click to upload product image</span>
            <input type="file" className="hidden" onChange={handleUploadProduct} />
          </label>

          {/* Display Uploaded Images */}
          {data.productImage.length > 0 && (
            <div className="flex gap-4 flex-wrap">
              {data.productImage.map((image, index) => (
                <div key={index} className="relative w-24 h-24">
                  <img
                    src={image}
                    alt="Product"
                    className="w-full h-full rounded border object-cover cursor-pointer"
                    onClick={() => {
                      setOpenFullScreenImage(true);
                      setFullScreenImage(image);
                    }}
                  />
                  <button
                    className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full p-1"
                    onClick={() => handleDeleteProductImage(index)}
                  >
                    <MdDelete size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Price and Selling Price */}
          <div className="grid grid-cols-2 gap-4">
            <input
              type="number"
              name="price"
              placeholder="Price"
              value={data.price}
              onChange={handleOnChange}
              className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
            <input
              type="number"
              name="sellingPrice"
              placeholder="Selling Price"
              value={data.sellingPrice}
              onChange={handleOnChange}
              className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          {/* Description */}
          <textarea
            name="description"
            placeholder="Description"
            value={data.description}
            onChange={handleOnChange}
            className="border rounded-lg p-3 h-28 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          ></textarea>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            Upload Product
          </button>
        </form>
      </div>

      {/* Fullscreen Image Display */}
      {openFullScreenImage && (
        <DisplayImage
          onClose={() => setOpenFullScreenImage(false)}
          imgUrl={fullScreenImage}
        />
      )}
    </div>
  );
};

export default UploadProduct;
