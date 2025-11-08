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
  FiChevronDown,
} from "react-icons/fi";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
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
          <Link to="/" className="flex items-center group flex-shrink-0">
            <div className="flex items-center">
              <span className="text-2xl font-bold text-amber-600 group-hover:text-amber-700 transition-colors whitespace-nowrap">
                ProductHandmade
              </span>
            </div>
            <span className="ml-2 text-xs text-gray-500 hidden xl:block italic whitespace-nowrap">
              Built with Love
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="flex items-baseline space-x-6">
              <Link
                to="/"
                className="text-gray-700 hover:text-amber-600 px-3 py-2 transition-colors font-medium whitespace-nowrap"
              >
                Home
              </Link>
              <Link
                to="/products"
                className="text-gray-700 hover:text-amber-600 px-3 py-2 transition-colors font-medium whitespace-nowrap"
              >
                Shop
              </Link>
              <Link
                to="/about"
                className="text-gray-700 hover:text-amber-600 px-3 py-2 transition-colors font-medium whitespace-nowrap"
              >
                About
              </Link>
              <Link
                to="/contact"
                className="text-gray-700 hover:text-amber-600 px-3 py-2 transition-colors font-medium whitespace-nowrap"
              >
                Contact
              </Link>

              {/* Admin Dropdown - Only show for admin users */}
              {isAuthenticated && user?.isAdmin && (
                <div className="relative">
                  <button
                    onClick={() => setIsAdminOpen(!isAdminOpen)}
                    className="flex items-center space-x-1 text-orange-600 hover:text-orange-700 px-3 py-2 transition-colors font-semibold whitespace-nowrap"
                  >
                    <FiSettings className="h-4 w-4" />
                    <span>Admin</span>
                    <FiChevronDown className="h-4 w-4" />
                  </button>

                  {isAdminOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-xl py-1 z-50 border border-gray-200">
                      <Link
                        to="/admin/products/manage"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors"
                        onClick={() => setIsAdminOpen(false)}
                      >
                        Manage Products
                      </Link>
                      <Link
                        to="/admin/ordermanagement"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors"
                        onClick={() => setIsAdminOpen(false)}
                      >
                        Order Management
                      </Link>
                      <Link
                        to="/admin/delivery-boys"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors"
                        onClick={() => setIsAdminOpen(false)}
                      >
                        Delivery Boys
                      </Link>
                      <Link
                        to="/admin/delete-data"
                        className="block px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors border-t"
                        onClick={() => setIsAdminOpen(false)}
                      >
                        Delete Data
                      </Link>
                    </div>
                  )}
                </div>
              )}

              {/* Delivery Boy Dashboard */}
              {isAuthenticated && user?.isDeliveryBoy && (
                <Link
                  to="/delivery-boy/dashboard"
                  className="text-amber-600 hover:text-amber-700 px-3 py-2 transition-colors font-semibold flex items-center whitespace-nowrap"
                >
                  <FiSettings className="mr-1" />
                  Dashboard
                </Link>
              )}
            </div>
          </div>

          {/* Right side items */}
          <div className="flex items-center space-x-3">
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
                  <span className="hidden xl:block font-medium max-w-[150px] truncate">
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
              <div className="hidden md:flex items-center space-x-2">
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-amber-600 px-3 py-2 transition-colors font-medium whitespace-nowrap"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-amber-600 text-white px-4 py-2 rounded-md hover:bg-amber-700 transition-colors shadow-md hover:shadow-lg font-medium whitespace-nowrap"
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
                About
              </Link>
              <Link
                to="/contact"
                className="block px-3 py-2 text-gray-700 hover:text-amber-600 hover:bg-amber-50 rounded-md transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Contact
              </Link>

              {/* Login/Register for Mobile (when not authenticated) */}
              {!isAuthenticated && (
                <div className="border-t border-gray-200 mt-2 pt-2 space-y-1">
                  <Link
                    to="/login"
                    className="block px-3 py-2 text-gray-700 hover:text-amber-600 hover:bg-amber-50 rounded-md transition-colors font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="block px-3 py-2 bg-amber-600 text-white hover:bg-amber-700 rounded-md transition-colors font-medium text-center"
                    onClick={() => setIsOpen(false)}
                  >
                    Sign Up
                  </Link>
                </div>
              )}

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
