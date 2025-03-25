import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import { setUserDetails } from "../store/userSlice";
import ROLE from "../common/role";
import Context from "../context";
import Logo from "./Logo";

const Header = () => {
  const user = useSelector((state) => state?.user?.user);
  const dispatch = useDispatch();
  const [menuDisplay, setMenuDisplay] = useState(false);
  const context = useContext(Context);
  const navigate = useNavigate();
  const searchInput = useLocation();
  const URLSearch = new URLSearchParams(searchInput?.search);
  const searchQuery = URLSearch.get("q");
  const [search, setSearch] = useState(searchQuery || "");

  const handleLogout = async () => {
    try {
      const fetchData = await fetch(SummaryApi.logout_user.url, {
        method: SummaryApi.logout_user.method,
        credentials: "include",
      });
      const data = await fetchData.json();
      if (data.success) {
        toast.success(data.message);
        dispatch(setUserDetails(null));
        navigate("/");
        window.location.reload();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);
    navigate(value ? `/search?q=${value}` : "/search");
  };

  return (
    <header className="h-20 shadow-md bg-white fixed w-full top-0 left-0 z-50">
      <div className="container mx-auto flex items-center justify-between px-6 h-full bg-beige">
        {/* Logo Section */}
        <Link to="/" className="flex items-center gap-2">
          <Logo w={120} h={60} />
        
        </Link>

        {/* Search Bar */}
        <div className="flex flex-grow justify-center">
          <div className="hidden lg:flex items-center w-full max-w-lg border border-gray-300 rounded-full focus-within:shadow-lg bg-white">
            <input
              type="text"
              placeholder="Search for products, brands..."
              className="w-full outline-none px-4 py-2 rounded-l-full bg-white text-gray-700 placeholder-gray-500"
              value={search}
              onChange={handleSearch}
            />
            <button className="flex items-center justify-center text-lg w-12 h-12 bg-red-600 text-white rounded-r-full hover:bg-red-700 transition">
              <CiSearch />
            </button>
          </div>
        </div>

        {/* User and Cart Section */}
        <div className="flex items-center gap-6">
          {/* Profile Menu */}
          <div className="relative flex justify-center">
            <button
              className="text-3xl text-gray-600 hover:text-red-600 transition duration-300"
              onClick={() => setMenuDisplay((prev) => !prev)}
            >
              {user?.profilePic ? (
                <img
                  src={user.profilePic}
                  className="w-10 h-10 rounded-full border-2 border-red-500"
                  alt="User"
                />
              ) : (
                <FaRegCircleUser />
              )}
            </button>
            {menuDisplay && (
              <div className="absolute top-12 bg-white border border-gray-200 shadow-lg rounded-md w-48 text-gray-700">
                {user?.role === ROLE.ADMIN && (
                  <Link
                    to="/admin-panel/all-products"
                    className="block px-4 py-2 hover:bg-gray-100 transition"
                    onClick={() => setMenuDisplay(false)}
                  >
                    Admin Panel
                  </Link>
                )}
                <Link
                  to="/profile"
                  className="block px-4 py-2 hover:bg-gray-100 transition"
                  onClick={() => setMenuDisplay(false)}
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 transition"
                >
                  Logout
                </button>
              </div>
            )}
          </div>

          {/* Cart Icon */}
          {user?._id && (
            <Link
              to="/cart"
              className="relative text-2xl text-gray-600 hover:text-red-600 transition duration-300"
            >
              <FaShoppingCart />
              {context?.cartProductCount > 0 && (
                <div className="absolute -top-2 -right-2 bg-red-600 text-white w-5 h-5 rounded-full flex items-center justify-center text-sm">
                  {context.cartProductCount}
                </div>
              )}
            </Link>
          )}

          {/* Login/Logout Button */}
          {user?._id ? (
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="px-4 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;