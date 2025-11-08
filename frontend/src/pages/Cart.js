import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import {
  FiTrash2,
  FiMinus,
  FiPlus,
  FiShoppingBag,
  FiHeart,
  FiAward,
} from "react-icons/fi";

const Cart = () => {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    getCartTotal,
    getCartCount,
  } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (!isAuthenticated) {
      navigate("/login", { state: { from: { pathname: "/checkout" } } });
    } else {
      navigate("/checkout");
    }
  };

  const calculateShipping = () => {
    // return getCartTotal() > 999 ? 0 : 99;
    return 0;
  };

  const calculateTax = () => {
    return Math.round(getCartTotal() * 0.18); // 18% GST
  };

  const calculateTotal = () => {
    // return getCartTotal() + calculateShipping() + calculateTax();
    return getCartTotal();
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <FiShoppingBag className="mx-auto h-24 w-24 text-gray-400" />
            <h2 className="mt-4 text-3xl font-bold text-gray-900">
              Your cart is empty
            </h2>
            <p className="mt-2 text-lg text-gray-600">
              Discover unique handcrafted treasures made with love
            </p>
            <div className="mt-8">
              <Link
                to="/products"
                className="bg-amber-600 text-white px-8 py-3 rounded-md font-semibold hover:bg-amber-700 transition-colors inline-flex items-center"
              >
                Explore Handmade Collection
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Your Cart</h1>
            <p className="text-sm text-gray-600 mt-1">
              ✨ Handcrafted with love by skilled artisans
            </p>
          </div>
          <span className="text-lg text-gray-600">
            {getCartCount()} {getCartCount() === 1 ? "item" : "items"}
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md">
              {cartItems.map((item, index) => (
                <div
                  key={item.cartId}
                  className={`p-6 ${
                    index !== cartItems.length - 1
                      ? "border-b border-gray-200"
                      : ""
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    {/* Product Image */}
                    <div className="flex-shrink-0 relative">
                      <img
                        src={item.images[0] || "/placeholder-image.jpg"}
                        alt={item.name}
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                      {/* Handmade badge on image */}
                      <div className="absolute -top-2 -right-2 bg-amber-100 text-amber-800 rounded-full p-1">
                        <FiAward className="h-3 w-3" />
                      </div>
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <Link to={`/product/${item._id}`}>
                        <h3 className="text-lg font-medium text-gray-900 hover:text-amber-600 transition-colors">
                          {item.name}
                        </h3>
                      </Link>
                      <div className="mt-1 space-y-1">
                        <p className="text-xs text-gray-500 italic">
                          Each piece is uniquely handcrafted
                        </p>
                        <p className="text-lg font-semibold text-gray-900 mt-2">
                          ₹{item.price}
                        </p>
                      </div>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() =>
                          updateQuantity(item.cartId, item.quantity - 1)
                        }
                        className="p-1 rounded-md border border-gray-300 hover:bg-amber-50 hover:border-amber-300 transition-colors"
                        disabled={item.quantity <= 1}
                      >
                        <FiMinus className="h-4 w-4" />
                      </button>
                      <span className="px-3 py-1 border border-gray-300 rounded-md min-w-[60px] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.cartId, item.quantity + 1)
                        }
                        className="p-1 rounded-md border border-gray-300 hover:bg-amber-50 hover:border-amber-300 transition-colors"
                      >
                        <FiPlus className="h-4 w-4" />
                      </button>
                    </div>

                    {/* Item Total */}
                    <div className="text-right">
                      <p className="text-lg font-semibold text-gray-900">
                        ₹{item.price * item.quantity}
                      </p>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => removeFromCart(item.cartId)}
                      className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-md transition-colors"
                      title="Remove item"
                    >
                      <FiTrash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Continue Shopping */}
            <div className="mt-6">
              <Link
                to="/products"
                className="text-amber-600 hover:text-amber-700 font-medium transition-colors"
              >
                ← Explore More Handcrafted Items
              </Link>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Order Summary
              </h2>

              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">₹{getCartTotal()}</span>
                </div>
                {/* <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">
                    {calculateShipping() === 0
                      ? "Free"
                      : `₹${calculateShipping()}`}
                  </span>
                </div> */}
                {/* <div className="flex justify-between">
                  <span className="text-gray-600">Tax (GST)</span>
                  <span className="font-medium">₹{calculateTax()}</span>
                </div> */}
                <div className="border-t pt-4">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>₹{calculateTotal()}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full bg-amber-600 text-white py-3 px-4 rounded-md font-semibold hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500 mt-6 transition-colors shadow-md hover:shadow-lg"
              >
                Proceed to Checkout
              </button>

              {/* Handmade Product Benefits */}
              <div className="mt-6 space-y-3 text-sm">
                <div className="flex items-start">
                  <svg
                    className="w-5 h-5 mr-2 text-amber-600 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <div>
                    <p className="font-medium text-gray-900">
                      Handcrafted Quality
                    </p>
                    <p className="text-xs text-gray-600">
                      Made with skill and attention to detail
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <svg
                    className="w-5 h-5 mr-2 text-amber-600 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <div>
                    <p className="font-medium text-gray-900">
                      Support Artisans
                    </p>
                    <p className="text-xs text-gray-600">
                      Empowering local craftspeople
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <svg
                    className="w-5 h-5 mr-2 text-amber-600 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <div>
                    <p className="font-medium text-gray-900">Secure Checkout</p>
                    <p className="text-xs text-gray-600">
                      Safe and encrypted payment
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <svg
                    className="w-5 h-5 mr-2 text-amber-600 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <div>
                    <p className="font-medium text-gray-900">
                      Carefully Packaged
                    </p>
                    <p className="text-xs text-gray-600">
                      Each item shipped with love and care
                    </p>
                  </div>
                </div>
              </div>

              {/* Optional: Add artisan impact message */}
              <div className="mt-6 p-4 bg-amber-50 rounded-lg border border-amber-200">
                <div className="flex items-start">
                  <FiHeart className="h-5 w-5 text-amber-600 mr-2 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-amber-900">
                      Making a Difference
                    </p>
                    <p className="text-xs text-amber-700 mt-1">
                      Your purchase supports skilled artisans and their families
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
