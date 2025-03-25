import { FaFacebookF, FaTwitter, FaInstagram, FaPhone, FaMapMarkerAlt, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-[#0f0c29] via-[#302b63] to-[#24243e] text-white py-10">
      <div className="container mx-auto px-6">
        {/* Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 text-center md:text-left">
          
          {/* Services Section */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-[#f7caca]">Services</h3>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#" className="hover:text-[#e83e8c] transition-colors duration-300">Store Locator</a></li>
              <li><a href="#" className="hover:text-[#e83e8c] transition-colors duration-300">Buying Guide</a></li>
              <li><a href="#" className="hover:text-[#e83e8c] transition-colors duration-300">Frame Size</a></li>
            </ul>
          </div>

          {/* About Us Section */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-[#f7caca]">About Us</h3>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#" className="hover:text-[#e83e8c] transition-colors duration-300">We Are Hiring</a></li>
              <li><a href="#" className="hover:text-[#e83e8c] transition-colors duration-300">Refer & Earn</a></li>
              <li><a href="#" className="hover:text-[#e83e8c] transition-colors duration-300">Lenskart Coupons</a></li>
            </ul>
          </div>

          {/* Help Section */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-[#f7caca]">Help</h3>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#" className="hover:text-[#e83e8c] transition-colors duration-300">FAQ's</a></li>
            </ul>
          </div>

          {/* Quick Links Section */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-[#f7caca]">Quick Links</h3>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#" className="hover:text-[#e83e8c] transition-colors duration-300">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-[#e83e8c] transition-colors duration-300">Terms & Conditions</a></li>
              <li><a href="#" className="hover:text-[#e83e8c] transition-colors duration-300">Contact Us</a></li>
            </ul>
          </div>

          {/* Newsletter Section */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-[#f7caca]">Stay Connected</h3>
            <p className="text-gray-400 mb-4 text-sm">Subscribe to our newsletter to stay updated on the latest offers.</p>
            <form className="flex">
              <input type="email" placeholder="Enter your email" className="flex-grow p-2 rounded-l-lg text-gray-700" />
              <button type="submit" className="bg-gradient-to-r from-[#e83e8c] to-[#ff6f61] text-white px-4 rounded-r-lg hover:opacity-90 transition-opacity duration-300">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <hr className="my-8 border-gray-600" />

        {/* Social Media and Contact Info */}
        <div className="flex flex-col md:flex-row justify-between items-center text-center">
          <p className="text-sm text-gray-400">© 2025 OptiSap Pvt Ltd. All Rights Reserved.</p>

          {/* Contact Info */}
          <div className="flex items-center space-x-6 text-gray-300 mt-4 md:mt-0">
            <div className="flex items-center space-x-2">
              <FaPhone className="text-lg" />
              <span>+91 98765 43210</span>
            </div>
            <div className="flex items-center space-x-2">
              <FaEnvelope className="text-lg" />
              <span>support@optisap.com</span>
            </div>
            <div className="flex items-center space-x-2">
              <FaMapMarkerAlt className="text-lg" />
              <span>Vadodara, India</span>
            </div>
          </div>

          {/* Social Media Links */}
          <div className="flex space-x-6 mt-4 md:mt-0">
            <FaFacebookF className="text-2xl cursor-pointer hover:text-[#e83e8c] transition-transform transform hover:scale-125" />
            <FaTwitter className="text-2xl cursor-pointer hover:text-[#e83e8c] transition-transform transform hover:scale-125" />
            <FaInstagram className="text-2xl cursor-pointer hover:text-[#e83e8c] transition-transform transform hover:scale-125" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
