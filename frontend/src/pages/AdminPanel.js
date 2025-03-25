import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { FaUsers, FaBoxOpen } from "react-icons/fa6";
import { Link, Outlet, useNavigate } from "react-router-dom";
import ROLE from "../common/role";

const AdminPanel = () => {
  const user = useSelector((state) => state?.user?.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role !== ROLE.ADMIN) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#FAFAFA]">
      {/* Sidebar */}
      <aside className="bg-[#FFFFFF] text-gray-900 w-full md:w-1/4 lg:w-1/5 min-h-screen flex flex-col shadow-md border-r border-gray-300">
        {/* User Profile */}
        <div className="h-44 flex flex-col items-center justify-center bg-[#F8F9FA] border-b border-gray-300">
          {/* Profile Picture */}
          <div className="relative">
            {user?.profilePic ? (
              <img
                src={user?.profilePic}
                className="w-20 h-20 rounded-full border-4 border-[#E0A800] shadow-lg transition-transform hover:scale-110 duration-300"
                alt={user?.name}
              />
            ) : (
              <div className="w-20 h-20 flex justify-center items-center rounded-full border-4 border-[#E0A800] bg-gray-200 text-gray-900 text-4xl font-bold shadow-lg">
                {user?.name?.charAt(0)?.toUpperCase() || "?"}
              </div>
            )}
            {/* Status Icon */}
            <div className="absolute bottom-0 right-1 bg-green-500 w-5 h-5 rounded-full border-2 border-white"></div>
          </div>

          {/* User Name & Role */}
          <p className="capitalize text-lg font-semibold mt-3 text-[#E0A800]">{user?.name || "Guest"}</p>
          <p className="text-sm text-gray-500 italic">{user?.role || "No role assigned"}</p>
        </div>

        {/* Navigation Menu */}
        <nav className="mt-4 px-4 flex flex-col gap-2">
          <Link
            to="all-users"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium bg-[#F1F3F5] hover:bg-[#E0A800] hover:text-white transition-all duration-300"
          >
            <FaUsers className="text-gray-700" /> All Users
          </Link>
          <Link
            to="all-products"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium bg-[#F1F3F5] hover:bg-[#E0A800] hover:text-white transition-all duration-300"
          >
            <FaBoxOpen className="text-gray-700" /> All Products
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-grow w-full h-full p-8 bg-[#FFFFFF] shadow-inner">
        <div className="p-6 bg-white rounded-lg shadow-lg border border-gray-300">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminPanel;
