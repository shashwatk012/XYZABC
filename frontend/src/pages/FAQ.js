import React, { useState } from "react";
import { FiChevronDown, FiChevronUp, FiSearch } from "react-icons/fi";

const FAQ = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [openItems, setOpenItems] = useState({});

  const faqData = [
    {
      id: 1,
      category: "orders",
      question: "How do I place an order?",
      answer:
        "Browse my shop, choose your favorite handmade item, and checkout. All orders are packed and delivered by me, currently within Mumbai only.",
    },
    {
      id: 2,
      category: "orders",
      question: "Do you offer custom orders?",
      answer:
        "Yes! I love bringing your ideas to life. Message me via the contact form or WhatsApp to design something unique just for you. All custom and standard orders are delivered in Mumbai.",
    },
    {
      id: 3,
      category: "shipping",
      question: "Where do you deliver?",
      answer:
        "Right now, I deliver only within Mumbai. If you're outside Mumbai, please contact me — I hope to expand soon as my business grows.",
    },
    {
      id: 4,
      category: "shipping",
      question: "How long will my order take?",
      answer:
        "Most orders are delivered in 2-4 days, depending on your Mumbai location and courier timings. Custom orders may take longer; I'll discuss the timeline with you when you order.",
    },
    {
      id: 5,
      category: "payment",
      question: "What payment methods do you accept?",
      answer:
        "Cash on Delivery only for all orders. Please have cash ready for the courier when your handmade item arrives.",
    },
    {
      id: 6,
      category: "returns",
      question: "Can I return or exchange a product?",
      answer:
        "If there's any problem, please contact me within 2 days. I handle returns or exchanges personally. Custom or personalized items are generally not returnable unless damaged.",
    },
    {
      id: 7,
      category: "custom",
      question: "Can I choose colors or materials for my custom order?",
      answer:
        "Absolutely! Let me know your preferences and I'll find the best materials to make your unique piece.",
    },
    {
      id: 8,
      category: "other",
      question: "How do I contact you?",
      answer:
        "Call or WhatsApp me directly at +91 9140847529, or use the website contact form. You always speak to the maker!",
    },
  ];

  const categories = [
    { id: "all", name: "All Questions", count: faqData.length },
    {
      id: "orders",
      name: "Orders",
      count: faqData.filter((item) => item.category === "orders").length,
    },
    {
      id: "shipping",
      name: "Shipping",
      count: faqData.filter((item) => item.category === "shipping").length,
    },
    {
      id: "payment",
      name: "Payment",
      count: faqData.filter((item) => item.category === "payment").length,
    },
    {
      id: "returns",
      name: "Returns",
      count: faqData.filter((item) => item.category === "returns").length,
    },
    {
      id: "custom",
      name: "Custom Orders",
      count: faqData.filter((item) => item.category === "custom").length,
    },
    {
      id: "other",
      name: "Other",
      count: faqData.filter((item) => item.category === "other").length,
    },
  ];

  const filteredFAQs = faqData.filter((item) => {
    const matchesCategory =
      activeCategory === "all" || item.category === activeCategory;
    const matchesSearch =
      item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleItem = (id) => {
    setOpenItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-gray-600 max-w-xl mx-auto">
            Find answers to common questions about my handmade products, custom
            work, and local delivery in Mumbai
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative mb-8">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search for questions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-transparent"
          />
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === category.id
                  ? "bg-amber-400 text-white"
                  : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
              }`}
            >
              {category.name} ({category.count})
            </button>
          ))}
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {filteredFAQs.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                No questions found matching your search.
              </p>
            </div>
          ) : (
            filteredFAQs.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <button
                  onClick={() => toggleItem(item.id)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <h3 className="text-lg font-medium text-gray-900 pr-4">
                    {item.question}
                  </h3>
                  {openItems[item.id] ? (
                    <FiChevronUp className="h-5 w-5 text-gray-500 flex-shrink-0" />
                  ) : (
                    <FiChevronDown className="h-5 w-5 text-gray-500 flex-shrink-0" />
                  )}
                </button>
                {openItems[item.id] && (
                  <div className="px-6 pb-4">
                    <div className="pt-2 border-t border-gray-100">
                      <p className="text-gray-600 leading-relaxed">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* Still Need Help */}
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 mt-12 text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Need more help? Just ask!
          </h3>
          <p className="text-gray-600 mb-4">
            I'm based in Mumbai and handle all orders personally — from creation
            to delivery. Feel free to call or WhatsApp. You'll always speak
            directly to the maker.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="bg-amber-400 text-white px-6 py-2 rounded-lg hover:bg-amber-500 transition-colors"
            >
              Contact Me
            </a>
            <a
              href="tel:+919876543210"
              className="border border-amber-400 text-amber-700 px-6 py-2 rounded-lg hover:bg-amber-50 transition-colors"
            >
              Call / WhatsApp: +91 9140847529
            </a>
          </div>
          <p className="mt-4 text-sm text-amber-600 italic">
            Thank you for supporting a Mumbai-based artisan business!
          </p>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
