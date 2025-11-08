import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import {
  FiStar,
  FiShoppingCart,
  FiHeart,
  FiAward,
  FiUsers,
  FiPackage,
} from "react-icons/fi";

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  // Set default selections when product is loaded
  useEffect(() => {
    if (product) {
      // Set default size
      if (product.sizes && product.sizes.length > 0 && !selectedSize) {
        setSelectedSize(product.sizes[0]);
      }

      // Set default color
      if (product.colors && product.colors.length > 0 && !selectedColor) {
        setSelectedColor(product.colors[0]);
      }
    }
  }, [product]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/products/${id}`,
        { timeout: 10000 }
      );

      if (response.data.product) {
        setProduct(response.data.product);
        console.log("✅ Product loaded:", response.data.product.name);
      } else {
        throw new Error("Invalid product data");
      }
    } catch (error) {
      console.error("❌ Error fetching product:", error);
      toast.error("Product not found or failed to load");
    } finally {
      setLoading(false);
    }
  };

  // ✅ FIXED: Correct parameter order
  const handleAddToCart = () => {
    if (quantity <= 0) {
      toast.error("Please select a valid quantity");
      return;
    }

    if (product.stock <= 0) {
      toast.error("Product out of stock");
      return;
    }

    console.log("📦 Adding to cart with parameters:", {
      product: product.name,
      size: selectedSize,
      color: selectedColor,
      quantity,
    });

    // ✅ FIXED: Parameters in correct order
    // Order: product, size, color, quantity
    addToCart(product, selectedSize, selectedColor, quantity);

    // ✅ Optional: Reset quantity after adding
    // setQuantity(1);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <div className="bg-gray-300 h-96 rounded-lg mb-4"></div>
                <div className="flex space-x-2">
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className="bg-gray-300 h-20 w-20 rounded"
                    ></div>
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                <div className="bg-gray-300 h-8 rounded"></div>
                <div className="bg-gray-300 h-6 rounded w-3/4"></div>
                <div className="bg-gray-300 h-4 rounded w-1/2"></div>
                <div className="bg-gray-300 h-32 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Product not found
          </h2>
          <Link to="/products" className="text-amber-600 hover:text-amber-700">
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  const discountPercentage = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      )
    : 0;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex mb-8" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <Link to="/" className="text-gray-700 hover:text-amber-600">
                Home
              </Link>
            </li>
            <li>
              <div className="flex items-center">
                <svg
                  className="w-6 h-6 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <Link
                  to="/products"
                  className="ml-1 text-gray-700 hover:text-amber-600 md:ml-2"
                >
                  Products
                </Link>
              </div>
            </li>
            <li>
              <div className="flex items-center">
                <svg
                  className="w-6 h-6 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="ml-1 text-gray-500 md:ml-2">
                  {product.name}
                </span>
              </div>
            </li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div>
            <div className="mb-4 relative">
              <img
                src={
                  product.images?.[selectedImage] || "/placeholder-image.jpg"
                }
                alt={product.name}
                className="w-full h-96 object-cover rounded-lg shadow-md"
              />
              {/* Handcrafted Badge on Image */}
              <div className="absolute top-4 left-4 bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-xs font-semibold flex items-center shadow-sm">
                <FiAward className="mr-1 h-3 w-3" />
                Handcrafted
              </div>
            </div>
            <div className="flex space-x-2 overflow-x-auto">
              {product.images?.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`flex-shrink-0 w-20 h-20 rounded border-2 overflow-hidden transition-colors ${
                    selectedImage === index
                      ? "border-amber-600"
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <div className="mb-4">
              {product.bestseller && (
                <span className="inline-block bg-amber-100 text-amber-800 text-xs px-3 py-1 rounded-full font-semibold mb-2">
                  ⭐ Customer Favorite
                </span>
              )}
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {product.name}
              </h1>

              <p className="text-sm text-gray-600 mb-4 italic">
                ✨ Each piece is uniquely handcrafted with care
              </p>

              {/* Rating */}
              {/* <div className="flex items-center mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <FiStar
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating || 0)
                          ? "text-yellow-400 fill-current"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </div> */}

              {/* Price */}
              <div className="flex items-center space-x-4 mb-6">
                <span className="text-3xl font-bold text-gray-900">
                  ₹{product.price.toLocaleString()}
                </span>
                {product.originalPrice && (
                  <>
                    <span className="text-xl text-gray-500 line-through">
                      ₹{product.originalPrice.toLocaleString()}
                    </span>
                    {discountPercentage > 0 && (
                      <span className="bg-red-100 text-red-800 text-sm px-3 py-1 rounded-full font-semibold">
                        {discountPercentage}% OFF
                      </span>
                    )}
                  </>
                )}
              </div>

              <p className="text-gray-700 mb-6 leading-relaxed">
                {product.description}
              </p>

              {/* Size Selection */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-gray-900 mb-3">
                    Size:{" "}
                    <span className="text-amber-600 font-semibold">
                      {selectedSize}
                    </span>
                  </h3>
                  <div className="flex space-x-2 flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-4 py-2 border-2 rounded-md transition-all font-medium ${
                          selectedSize === size
                            ? "border-amber-600 bg-amber-50 text-amber-700 shadow-sm"
                            : "border-gray-300 text-gray-700 hover:border-amber-300"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Color Selection */}
              {product.colors && product.colors.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-gray-900 mb-3">
                    Color:{" "}
                    <span className="text-amber-600 font-semibold">
                      {selectedColor}
                    </span>
                  </h3>
                  <div className="flex space-x-2 flex-wrap gap-2">
                    {product.colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`px-4 py-2 border-2 rounded-md transition-all font-medium ${
                          selectedColor === color
                            ? "border-amber-600 bg-amber-50 text-amber-700 shadow-sm"
                            : "border-gray-300 text-gray-700 hover:border-amber-300"
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-900 mb-3">
                  Quantity
                </h3>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors font-semibold"
                    disabled={quantity <= 1}
                  >
                    −
                  </button>
                  <span className="px-6 py-2 border border-gray-300 rounded-md text-center font-semibold min-w-12">
                    {quantity}
                  </span>
                  <button
                    onClick={() =>
                      setQuantity(Math.min(product.stock || 1, quantity + 1))
                    }
                    className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors font-semibold"
                    disabled={quantity >= (product.stock || 1)}
                  >
                    +
                  </button>
                </div>
                {product.stock && product.stock < 5 && (
                  <p className="text-sm text-orange-600 mt-2 font-medium">
                    🔥 Only {product.stock} pieces available - Limited handmade
                    batch
                  </p>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4 mb-8">
                <button
                  onClick={handleAddToCart}
                  disabled={!product.stock || product.stock === 0}
                  className="flex-1 bg-amber-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-amber-600 flex items-center justify-center transition-all shadow-md hover:shadow-lg"
                >
                  <FiShoppingCart className="mr-2 h-5 w-5" />
                  {product.stock ? "Add to Cart" : "Out of Stock"}
                </button>
              </div>

              {/* Handmade Product Features */}
              <div className="border-t pt-6">
                <h3 className="text-sm font-semibold text-gray-900 mb-4">
                  Why Choose Handmade?
                </h3>
                <div className="grid grid-cols-1 gap-4">
                  <div className="flex items-start">
                    <FiAward className="h-5 w-5 text-amber-600 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        Superior Craftsmanship
                      </p>
                      <p className="text-xs text-gray-600">
                        Made with skill, attention to detail, and passion
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <FiUsers className="h-5 w-5 text-amber-600 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        Support Local Artisans
                      </p>
                      <p className="text-xs text-gray-600">
                        Empowering craftspeople and their communities
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <FiPackage className="h-5 w-5 text-amber-600 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        Unique & One-of-a-Kind
                      </p>
                      <p className="text-xs text-gray-600">
                        Each piece may have slight variations, adding to its
                        charm
                      </p>
                    </div>
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

export default ProductDetail;
