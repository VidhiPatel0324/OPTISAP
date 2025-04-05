import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaShoppingCart, FaMicrophone, FaCog } from "react-icons/fa";
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
  const [showVoiceSettings, setShowVoiceSettings] = useState(false);

  const [language, setLanguage] = useState("en-US");
  const [speed, setSpeed] = useState(1);

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

  const handleVoiceSearch = () => {
    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = language;
    recognition.start();

    recognition.onresult = (event) => {
      const voiceResult = event.results[0][0].transcript;
      const spokenText = voiceResult.toLowerCase();
      setSearch(voiceResult);

      const synth = window.speechSynthesis;
      const utter = new SpeechSynthesisUtterance(`You said: ${voiceResult}`);
      utter.rate = speed;
      synth.speak(utter);

      if (spokenText.includes("try on")) {
        navigate("/tryonpage");
      } else {
        navigate(`/search?q=${voiceResult}`);
      }
    };

    recognition.onerror = () => {
      toast.error("Voice recognition failed. Try again.");
    };
  };

  return (
    <header className="h-20 shadow-md bg-white fixed w-full top-0 left-0 z-50">
      <div className="container mx-auto flex items-center justify-between px-6 h-full bg-beige">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <Logo w={120} h={60} />
        </Link>

        {/* Search + Voice */}
        <div className="flex flex-grow justify-center">
          <div className="hidden lg:flex items-center w-full max-w-xl border border-gray-300 rounded-full focus-within:shadow-lg bg-white">
            <input
              type="text"
              placeholder="Search for products, brands..."
              className="w-full outline-none px-4 py-2 rounded-l-full bg-white text-gray-700 placeholder-gray-500"
              value={search}
              onChange={handleSearch}
            />
            <button
              onClick={handleVoiceSearch}
              className="flex items-center justify-center text-lg w-12 h-12 text-gray-600 hover:text-red-600 transition"
              title="Voice Search"
            >
              <FaMicrophone />
            </button>

            {/* Voice Settings Dropdown */}
            <div className="relative">
              <button
                className="flex items-center justify-center text-lg w-12 h-12 text-gray-600 hover:text-red-600 transition"
                title="Voice Settings"
                onClick={() => setShowVoiceSettings((prev) => !prev)}
              >
                <FaCog />
              </button>
              {showVoiceSettings && (
                <div className="absolute right-0 top-14 bg-white shadow-lg border border-gray-200 rounded-md w-56 z-50 p-4 text-sm text-gray-800">
                  <h3 className="font-semibold text-lg mb-2">Voice Settings</h3>
                  <div className="mb-2">
                    <label className="block text-gray-600">Language</label>
                    <select
                      className="w-full border border-gray-300 rounded-md p-1"
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)}
                    >
                      <option value="en-US">English (US)</option>
                      <option value="en-GB">English (UK)</option>
                      <option value="hi-IN">Hindi</option>
                      <option value="fr-FR">French</option>
                    </select>
                  </div>
                  <div className="mb-2">
                    <label className="block text-gray-600">Speed</label>
                    <input
                      type="range"
                      min="0.5"
                      max="2"
                      step="0.1"
                      value={speed}
                      onChange={(e) => setSpeed(parseFloat(e.target.value))}
                      className="w-full"
                    />
                    <div className="text-sm mt-1 text-gray-500">Rate: {speed}</div>
                  </div>
                  <button
                    className="mt-2 w-full bg-red-600 text-white py-1 rounded-md hover:bg-red-700"
                    onClick={() => {
                      setShowVoiceSettings(false);
                      toast.success("Voice settings updated");
                    }}
                  >
                    Save Settings
                  </button>
                </div>
              )}
            </div>

            <button className="flex items-center justify-center text-lg w-12 h-12 bg-red-600 text-white rounded-r-full hover:bg-red-700 transition">
              <CiSearch />
            </button>
          </div>
        </div>

        {/* User and Cart */}
        <div className="flex items-center gap-6">
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
              <div className="absolute top-12 right-0 bg-white border border-gray-200 shadow-lg rounded-md w-48 text-gray-700 z-50">
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
                  to="/tryonpage"
                  className="block px-4 py-2 hover:bg-gray-100 transition"
                  onClick={() => setMenuDisplay(false)}
                >
                  Try-On AI
                </Link>
              </div>
            )}
          </div>

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
