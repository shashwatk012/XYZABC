import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import axios from "axios";
import { toast } from "react-toastify";
import { load } from "@cashfreepayments/cashfree-js";

const Checkout = () => {
  const { user } = useAuth();
  const { cartItems, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();

  const [shippingAddress, setShippingAddress] = useState({
    fullName: user?.name || "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    phone: user?.phone || "",
    email: user?.email || "",
  });

  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [loading, setLoading] = useState(false);
  const [cashfree, setCashfree] = useState(null);
  const [sabpaisa, setSabpaisa] = useState(null);

  // Update useEffect
  useEffect(() => {
    if (cartItems.length === 0) {
      toast.warning("Your cart is empty");
      navigate("/cart");
      return;
    }
    initializePaymentGateways();
  }, [cartItems, navigate]);

  // Update initializeCashfree to initializePaymentGateways
  const initializePaymentGateways = async () => {
    try {
      // ✅ Initialize Cashfree
      const cashfreeInstance = await load({
        mode: process.env.REACT_APP_CASHFREE_MODE || "sandbox",
      });
      setCashfree(cashfreeInstance);
      console.log("✅ Cashfree initialized");

      // ✅ Initialize Sabpaisa (just set flag for now)
      setSabpaisa(true);
      console.log("✅ Sabpaisa initialized");
    } catch (error) {
      console.error("❌ Payment gateway initialization failed:", error);
      toast.error("Payment system initialization failed");
    }
  };

  const handleAddressChange = (e) => {
    setShippingAddress({
      ...shippingAddress,
      [e.target.name]: e.target.value,
    });
  };

  const calculateTotal = () => {
    const subtotal = getCartTotal();
    const shipping = 0;
    const tax = 0;
    const total = subtotal + shipping + tax;
    return { subtotal, shipping, tax, total };
  };

  const { subtotal, shipping, tax, total } = calculateTotal();

  const validateShippingAddress = () => {
    const required = [
      "fullName",
      "address",
      "city",
      "state",
      "pincode",
      "phone",
    ];
    return required.every((field) => shippingAddress[field]?.trim());
  };

  // ✅ UPDATED: Cashfree Payment Handler - Redirect to verification page
  const handleCashfreePayment = async () => {
    try {
      if (!validateShippingAddress()) {
        toast.error("Please fill in all shipping address fields");
        return;
      }

      if (!cashfree) {
        toast.error("Payment system not ready. Please refresh and try again.");
        return;
      }

      setLoading(true);
      toast.info("Creating payment order...");

      const orderData = {
        orderItems: cartItems.map((item) => ({
          product: item._id,
          name: item.name,
          quantity: item.quantity,
          size: item.selectedSize,
          color: item.selectedColor,
          price: item.price,
          image: item.images[0],
        })),
        shippingAddress,
        shippingPrice: 0,
        taxPrice: 0,
        paymentMethodName: "CASHFREE",
      };

      // Create order on backend
      const createResponse = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/payment/cashfree/create-order`,
        {
          orderData,
          amount: total,
          customerDetails: {
            name: shippingAddress.fullName,
            email: shippingAddress.email,
            phone: shippingAddress.phone,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          timeout: 15000,
        }
      );

      if (!createResponse.data.success) {
        throw new Error(createResponse.data.message);
      }

      const { paymentSessionId, orderId } = createResponse.data;

      console.log("✅ Order created:", orderId);
      toast.success("Opening payment gateway...");

      // ✅ NEW: Store order ID in sessionStorage for verification page
      sessionStorage.setItem("paymentOrderId", orderId);

      // ✅ UPDATED: Open Cashfree with redirect to verification page
      const redirectUrl = `${window.location.origin}/payment-status?orderId=${orderId}&sessionId=${paymentSessionId}`;

      console.log("🔄 Opening payment with redirect to:", redirectUrl);

      await cashfree.checkout({
        paymentSessionId,
        redirectTarget: "_self", // ✅ CHANGED: Stay on same tab
        returnUrl: redirectUrl, // ✅ NEW: Redirect after payment
      });

      // ✅ If checkout returns without redirect, navigate manually
      setTimeout(() => {
        window.location.href = redirectUrl;
      }, 2000);
    } catch (error) {
      console.error("❌ Cashfree payment error:", error);
      setLoading(false);
      toast.error(
        error.response?.data?.message || "Payment initialization failed"
      );
    }
  };

  const handleSabpaisaPayment = async () => {
    try {
      if (!validateShippingAddress()) {
        toast.error("Please fill in all shipping address fields");
        return;
      }

      setLoading(true);
      toast.info("Creating payment order...");

      const orderData = {
        orderItems: cartItems.map((item) => ({
          product: item._id,
          name: item.name,
          quantity: item.quantity,
          size: item.selectedSize,
          color: item.selectedColor,
          price: item.price,
          image: item.images[0],
        })),
        shippingAddress,
        shippingPrice: 0,
        taxPrice: 0,
      };

      // ✅ Create Sabpaisa order
      const createResponse = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/payment/sabpaisa/create-order`,
        {
          orderData,
          amount: total,
          customerDetails: {
            name: shippingAddress.fullName,
            email: shippingAddress.email,
            phone: shippingAddress.phone,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          timeout: 15000,
        }
      );

      if (!createResponse.data.success) {
        throw new Error(createResponse.data.message);
      }

      const { orderId, paymentUrl, paymentData } = createResponse.data;

      console.log("✅ Sabpaisa order created:", orderId);
      toast.success("Redirecting to Sabpaisa payment...");

      // ✅ Create form and submit to Sabpaisa
      const sabpaisaForm = document.createElement("form");
      sabpaisaForm.method = "POST";
      sabpaisaForm.action = paymentUrl;
      sabpaisaForm.target = "_self";

      // Add payment data fields
      Object.keys(paymentData).forEach((key) => {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = key;
        input.value = paymentData[key];
        sabpaisaForm.appendChild(input);
      });

      document.body.appendChild(sabpaisaForm);
      sabpaisaForm.submit();
      document.body.removeChild(sabpaisaForm);
    } catch (error) {
      console.error("❌ Sabpaisa payment error:", error);
      setLoading(false);
      toast.error(
        error.response?.data?.message || "Payment initialization failed"
      );
    }
  };

  // ✅ COD Order Handler
  const handleCODOrder = async () => {
    try {
      if (!validateShippingAddress()) {
        toast.error("Please fill in all shipping address fields");
        return;
      }

      setLoading(true);

      const orderData = {
        orderItems: cartItems.map((item) => ({
          product: item._id,
          name: item.name,
          quantity: item.quantity,
          size: item.selectedSize,
          color: item.selectedColor,
          price: item.price,
          image: item.images[0],
        })),
        shippingAddress,
        shippingPrice: 0,
        taxPrice: 0,
      };

      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/payment/cod/create-order`,
        { orderData, amount: total },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          timeout: 10000,
        }
      );

      if (response.data.success) {
        clearCart();
        toast.success(
          `✅ Order placed! Order #${response.data.orderId.slice(-8)}.`,
          { autoClose: 2000 }
        );

        setTimeout(() => {
          navigate("/", { replace: true });
        }, 2000);
      }
    } catch (error) {
      console.error("❌ COD order error:", error);
      toast.error(error.response?.data?.message || "Order placement failed");
    } finally {
      setLoading(false);
    }
  };

  // Update handleSubmit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (paymentMethod === "COD") {
      await handleCODOrder();
    } else if (paymentMethod === "CASHFREE") {
      await handleCashfreePayment();
    } else if (paymentMethod === "SABPAISA") {
      await handleSabpaisaPayment();
    }
  };

  // [Rest of the JSX remains the same as before]
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Checkout Form */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold mb-6">Checkout</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Shipping Address */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Shipping Address</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={shippingAddress.fullName}
                      onChange={handleAddressChange}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      placeholder="10 digit number"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={shippingAddress.phone}
                      onChange={handleAddressChange}
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={shippingAddress.email}
                    onChange={handleAddressChange}
                  />
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address *
                  </label>
                  <textarea
                    name="address"
                    required
                    rows="3"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={shippingAddress.address}
                    onChange={handleAddressChange}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      City *
                    </label>
                    <input
                      type="text"
                      name="city"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={shippingAddress.city}
                      onChange={handleAddressChange}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      State *
                    </label>
                    <input
                      type="text"
                      name="state"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={shippingAddress.state}
                      onChange={handleAddressChange}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Pincode *
                    </label>
                    <input
                      type="text"
                      name="pincode"
                      required
                      placeholder="6 digit code"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={shippingAddress.pincode}
                      onChange={handleAddressChange}
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Payment Method</h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <input
                      id="cod"
                      name="paymentMethod"
                      type="radio"
                      value="COD"
                      checked={paymentMethod === "COD"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="h-4 w-4 text-blue-600"
                    />
                    <label
                      htmlFor="cod"
                      className="ml-3 block text-sm font-medium text-gray-700"
                    >
                      💵 Cash on Delivery
                    </label>
                  </div>

                  {/* <div className="flex items-center">
                    <input
                      id="cashfree"
                      name="paymentMethod"
                      type="radio"
                      value="CASHFREE"
                      checked={paymentMethod === "CASHFREE"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="h-4 w-4 text-blue-600"
                    />
                    <label
                      htmlFor="cashfree"
                      className="ml-3 block text-sm font-medium text-gray-700"
                    >
                      💳 Online Payment (UPI, Cards, Net Banking)
                    </label>
                  </div> */}
                </div>
                {/* <div className="flex items-center">
                  <input
                    id="sabpaisa"
                    name="paymentMethod"
                    type="radio"
                    value="SABPAISA"
                    checked={paymentMethod === "SABPAISA"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="h-4 w-4 text-blue-600"
                  />
                  <label
                    htmlFor="sabpaisa"
                    className="ml-3 block text-sm font-medium text-gray-700"
                  >
                    💳 Sabpaisa Payment (UPI, Cards, Wallets)
                  </label>
                </div> */}

                {/* {paymentMethod === "SABPAISA" && (
                  <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-md">
                    <p className="text-sm text-blue-800">
                      🔒 Fast & Secure payment powered by Sabpaisa
                    </p>
                  </div>
                )} */}

                {paymentMethod === "CASHFREE" && (
                  <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-md">
                    <p className="text-sm text-blue-800">
                      🔒 100% secure payment powered by Cashfree
                    </p>
                  </div>
                )}

                {paymentMethod === "COD" && (
                  <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-md">
                    <p className="text-sm text-green-800">
                      Pay when you receive your order
                    </p>
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={
                  loading ||
                  (paymentMethod === "CASHFREE" && !cashfree) ||
                  (paymentMethod === "SABPAISA" && !sabpaisa)
                }
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-md font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
              >
                {loading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Processing...
                  </>
                ) : paymentMethod === "CASHFREE" ? (
                  `Pay ₹${total.toLocaleString()} - Secure Payment`
                ) : paymentMethod === "SABPAISA" ? (
                  `Pay ₹${total} - Sabpaisa`
                ) : (
                  `Place Order - ₹${total.toLocaleString()}`
                )}
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Order Summary</h2>
              <span className="text-xs bg-amber-100 text-amber-800 px-3 py-1 rounded-full font-semibold">
                ✨ Handcrafted
              </span>
            </div>

            <div className="space-y-4 mb-6">
              {cartItems.map((item) => (
                <div
                  key={item.cartId}
                  className="flex items-center space-x-4 pb-4 border-b border-gray-100 last:border-0"
                >
                  <div className="relative">
                    <img
                      src={item.images[0] || "/placeholder-image.jpg"}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    {/* Small handcrafted badge */}
                    <div className="absolute -top-1 -right-1 bg-amber-500 text-white rounded-full p-1">
                      <svg
                        className="w-2 h-2"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{item.name}</h3>
                    <p className="text-xs text-gray-500 italic">
                      Uniquely handcrafted piece
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      Size: {item.selectedSize} | Color: {item.selectedColor}
                    </p>
                    <p className="text-sm text-gray-600">
                      Qty: {item.quantity} × ₹{item.price.toLocaleString()}
                    </p>
                  </div>
                  <div className="text-lg font-semibold text-gray-900">
                    ₹{(item.price * item.quantity).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t pt-6">
              <div className="flex justify-between mb-2 text-gray-700">
                <span>Subtotal</span>
                <span>₹{subtotal.toLocaleString()}</span>
              </div>

              <div className="border-t pt-2 flex justify-between text-lg font-bold">
                <span>Total</span>
                <span className="text-amber-600">
                  ₹{total.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Artisan Impact Message */}
            <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
              <div className="flex items-start">
                <svg
                  className="w-5 h-5 text-amber-600 mr-2 flex-shrink-0 mt-0.5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                    clipRule="evenodd"
                  />
                </svg>
                <div>
                  <p className="text-sm font-semibold text-amber-900">
                    Thank You for Supporting Artisans
                  </p>
                  <p className="text-xs text-amber-800 mt-1">
                    Your purchase directly supports skilled craftspeople and
                    their families
                  </p>
                </div>
              </div>
            </div>

            {paymentMethod === "CASHFREE" && (
              <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-green-600 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                  <div className="text-center">
                    <p className="text-sm font-semibold text-green-800">
                      🔒 100% Secure Payment
                    </p>
                    <p className="text-xs text-green-700 mt-0.5">
                      Your payment is encrypted and secure
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Handmade Product Guarantees */}
            <div className="mt-6 pt-6 border-t space-y-3">
              <div className="flex items-start text-sm">
                <svg
                  className="w-4 h-4 text-amber-600 mr-2 flex-shrink-0 mt-0.5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-gray-700">
                  Each piece carefully handcrafted
                </span>
              </div>
              <div className="flex items-start text-sm">
                <svg
                  className="w-4 h-4 text-amber-600 mr-2 flex-shrink-0 mt-0.5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-gray-700">
                  Packaged with love and care
                </span>
              </div>
              <div className="flex items-start text-sm">
                <svg
                  className="w-4 h-4 text-amber-600 mr-2 flex-shrink-0 mt-0.5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-gray-700">
                  Quality guaranteed by artisans
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
