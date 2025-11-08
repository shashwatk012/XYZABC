import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import {
  FiShoppingCart,
  FiUser,
  FiMenu,
  FiX,
  FiSettings,
  FiHeart,
} from "react-icons/fi";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const { getCartCount } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
    setIsProfileOpen(false);
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50 border-b border-amber-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center group">
            <div className="flex items-center">
              <FiHeart className="h-6 w-6 text-amber-600 mr-2 group-hover:text-amber-700 transition-colors" />
              <span className="text-2xl font-bold text-amber-600 group-hover:text-amber-700 transition-colors">
                Handmade Karigari
              </span>
            </div>
            <span className="ml-2 text-xs text-gray-500 hidden sm:block italic">
              Built with Love
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <Link
                to="/"
                className="text-gray-700 hover:text-amber-600 px-3 py-2 transition-colors font-medium"
              >
                Home
              </Link>
              <Link
                to="/products"
                className="text-gray-700 hover:text-amber-600 px-3 py-2 transition-colors font-medium"
              >
                Shop
              </Link>
              <Link
                to="/about"
                className="text-gray-700 hover:text-amber-600 px-3 py-2 transition-colors font-medium"
              >
                About
              </Link>
              <Link
                to="/contact"
                className="text-gray-700 hover:text-amber-600 px-3 py-2 transition-colors font-medium"
              >
                Contact
              </Link>

              {/* Admin Links - Only show for admin users */}
              {isAuthenticated && user?.isAdmin && (
                <>
                  <Link
                    to="/admin/products/manage"
                    className="text-orange-600 hover:text-orange-700 px-3 py-2 transition-colors font-semibold flex items-center"
                  >
                    <FiSettings className="mr-1" />
                    Products
                  </Link>
                  <Link
                    to="/admin/ordermanagement"
                    className="text-orange-600 hover:text-orange-700 px-3 py-2 transition-colors font-semibold flex items-center"
                  >
                    <FiSettings className="mr-1" />
                    Orders
                  </Link>
                  <Link
                    to="/admin/delivery-boys"
                    className="text-orange-600 hover:text-orange-700 px-3 py-2 transition-colors font-semibold flex items-center"
                  >
                    <FiSettings className="mr-1" />
                    Delivery
                  </Link>
                  <Link
                    to="/admin/delete-data"
                    className="text-red-600 hover:text-red-700 px-3 py-2 transition-colors font-semibold flex items-center"
                  >
                    <FiSettings className="mr-1" />
                    Manage Data
                  </Link>
                </>
              )}

              {/* Delivery Boy Dashboard */}
              {isAuthenticated && user?.isDeliveryBoy && (
                <Link
                  to="/delivery-boy/dashboard"
                  className="text-amber-600 hover:text-amber-700 px-3 py-2 transition-colors font-semibold flex items-center"
                >
                  <FiSettings className="mr-1" />
                  Dashboard
                </Link>
              )}
            </div>
          </div>

          {/* Right side items */}
          <div className="flex items-center space-x-4">
            {/* Cart Icon */}
            <Link to="/cart" className="relative p-2 group">
              <FiShoppingCart className="h-6 w-6 text-gray-700 group-hover:text-amber-600 transition-colors" />
              {getCartCount() > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold shadow-md">
                  {getCartCount()}
                </span>
              )}
            </Link>

            {/* User Profile */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center space-x-2 text-gray-700 hover:text-amber-600 p-2 transition-colors"
                >
                  <FiUser className="h-5 w-5" />
                  <span className="hidden md:block font-medium">
                    {user?.name}
                  </span>
                </button>

                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-xl py-1 z-50 border border-gray-200">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-amber-50 hover:text-amber-600 transition-colors"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      Profile
                    </Link>
                    <Link
                      to="/orders"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-amber-50 hover:text-amber-600 transition-colors"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      My Orders
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-amber-50 hover:text-amber-600 transition-colors border-t"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-amber-600 px-3 py-2 transition-colors font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-amber-600 text-white px-4 py-2 rounded-md hover:bg-amber-700 transition-colors shadow-md hover:shadow-lg font-medium"
                >
                  Sign Up
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 text-gray-700 hover:text-amber-600 transition-colors"
            >
              {isOpen ? (
                <FiX className="h-6 w-6" />
              ) : (
                <FiMenu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-50">
              <Link
                to="/"
                className="block px-3 py-2 text-gray-700 hover:text-amber-600 hover:bg-amber-50 rounded-md transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/products"
                className="block px-3 py-2 text-gray-700 hover:text-amber-600 hover:bg-amber-50 rounded-md transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Shop
              </Link>
              <Link
                to="/about"
                className="block px-3 py-2 text-gray-700 hover:text-amber-600 hover:bg-amber-50 rounded-md transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Our Story
              </Link>
              <Link
                to="/contact"
                className="block px-3 py-2 text-gray-700 hover:text-amber-600 hover:bg-amber-50 rounded-md transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Contact
              </Link>

              {/* Admin Links - Mobile */}
              {isAuthenticated && user?.isAdmin && (
                <div className="border-t border-amber-200 mt-2 pt-2">
                  <p className="px-3 py-1 text-xs text-gray-500 font-semibold uppercase">
                    Admin
                  </p>
                  <Link
                    to="/admin/products/manage"
                    className="block px-3 py-2 text-orange-600 hover:bg-orange-50 rounded-md transition-colors font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    Manage Products
                  </Link>
                  <Link
                    to="/admin/ordermanagement"
                    className="block px-3 py-2 text-orange-600 hover:bg-orange-50 rounded-md transition-colors font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    Order Management
                  </Link>
                  <Link
                    to="/admin/delivery-boys"
                    className="block px-3 py-2 text-orange-600 hover:bg-orange-50 rounded-md transition-colors font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    Delivery Boys
                  </Link>
                  <Link
                    to="/admin/delete-data"
                    className="block px-3 py-2 text-red-600 hover:bg-red-50 rounded-md transition-colors font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    Delete Data
                  </Link>
                </div>
              )}

              {/* Delivery Boy - Mobile */}
              {isAuthenticated && user?.isDeliveryBoy && (
                <div className="border-t border-amber-200 mt-2 pt-2">
                  <Link
                    to="/delivery-boy/dashboard"
                    className="block px-3 py-2 text-amber-600 hover:bg-amber-50 rounded-md transition-colors font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    Delivery Dashboard
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
