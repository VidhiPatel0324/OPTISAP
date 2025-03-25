import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import SummaryApi from "../common";
import VerticalCard from "../components/VerticalCard";

const SearchProduct = () => {
  const query = useLocation();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  console.log("query", query.search);

  const fetchProduct = async () => {
    setLoading(true);
    try {
      const response = await fetch(SummaryApi.searchProduct.url + query.search);
      const dataResponse = await response.json();
      setData(dataResponse.data || []); // Handle null or undefined data
    } catch (error) {
      console.error("Error fetching products:", error);
      setData([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProduct();
  }, [query]);

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Loader */}
      {loading && (
        <div className="text-center">
          <p className="text-lg text-gray-500 animate-pulse">Loading...</p>
        </div>
      )}

      {/* Search Results Count */}
      {!loading && (
        <p className="text-lg font-semibold text-gray-700 mb-6">
          Search Results: {data.length}
        </p>
      )}

      {/* No Data State */}
      {!loading && data.length === 0 && (
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <p className="text-lg text-gray-500">No results found...</p>
        </div>
      )}

      {/* Search Results */}
      {data.length > 0 && !loading && (
        <VerticalCard loading={loading} data={data} />
      )}
    </div>
  );
};

export default SearchProduct;
