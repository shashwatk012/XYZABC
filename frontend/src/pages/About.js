import React from "react";
import { Link } from "react-router-dom";
import {
  FiHeart,
  FiAward,
  FiStar,
  FiTarget,
  FiUser,
  FiMail,
  FiPhone,
  FiPackage,
} from "react-icons/fi";

const About = () => {
  const values = [
    {
      icon: <FiHeart className="h-8 w-8" />,
      title: "Crafted with Love",
      description:
        "Every piece I create is made with attention to detail, care, and genuine passion for the craft.",
    },
    {
      icon: <FiAward className="h-8 w-8" />,
      title: "Quality First",
      description:
        "I use only the best materials and take the time needed to ensure each product meets my high standards.",
    },
    {
      icon: <FiPackage className="h-8 w-8" />,
      title: "Unique Creations",
      description:
        "No two pieces are exactly alike - each item has its own character and story.",
    },
    {
      icon: <FiStar className="h-8 w-8" />,
      title: "Customer Happiness",
      description:
        "Your satisfaction is my priority. I'm here to create something special just for you.",
    },
  ];

  const skills = [
    "Hand embroidery and textile work",
    "Custom jewelry making",
    "Home decor and accessories",
    "Personalized gift items",
    "Traditional craft techniques",
    "Custom orders and special requests",
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-amber-50 to-orange-100 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            About Karigari
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Welcome to my handmade journey! I'm passionate about creating
            unique, handcrafted items that bring joy and beauty to your everyday
            life.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* My Story */}
        <div className="mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                My Story
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Hi! I'm the creator behind Karigari. What started as a hobby
                  and passion for making things by hand has now become my dream
                  business.
                </p>
                <p>
                  Growing up, I was always fascinated by handmade crafts and the
                  beauty of creating something from scratch. I learned various
                  techniques over the years, experimenting with different
                  materials and styles until I found my unique voice as a
                  craftsperson.
                </p>
                <p>
                  After friends and family kept encouraging me to share my work
                  with the world, I decided to take the leap. Karigari is my way
                  of bringing handmade, thoughtful creations to people who
                  appreciate the difference quality craftsmanship makes.
                </p>
                <p className="text-amber-700 font-medium italic">
                  Every item you see here is made by me, in my workshop, with
                  love and dedication. When you buy from Karigari, you're
                  getting a genuinely handmade piece, not mass-produced factory
                  goods.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <div className="text-center mb-6">
                  <div className="w-24 h-24 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FiUser className="h-12 w-12 text-amber-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">
                    Solo Artisan
                  </h3>
                  <p className="text-gray-600">
                    Every piece personally crafted
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b">
                    <span className="text-gray-600">Business Status</span>
                    <span className="font-semibold text-amber-600">
                      Just Starting!
                    </span>
                  </div>
                  <div className="flex items-center justify-between pb-3 border-b">
                    <span className="text-gray-600">Years of Experience</span>
                    <span className="font-semibold text-gray-900">
                      5+ years crafting
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Custom Orders</span>
                    <span className="font-semibold text-gray-900">
                      Available!
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-8 border-t-4 border-amber-500">
              <div className="flex items-center mb-6">
                <FiTarget className="h-8 w-8 text-amber-600 mr-3" />
                <h3 className="text-2xl font-semibold text-gray-900">
                  My Mission
                </h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                To create beautiful, high-quality handmade products that bring
                joy and add a personal touch to your life. I believe in the
                value of handcrafted items and want to share that with people
                who appreciate authentic, handmade quality over mass production.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8 border-t-4 border-amber-500">
              <div className="flex items-center mb-6">
                <FiStar className="h-8 w-8 text-amber-600 mr-3" />
                <h3 className="text-2xl font-semibold text-gray-900">
                  My Vision
                </h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                To grow Karigari into a trusted brand known for unique,
                handcrafted items. I dream of expanding my skills, creating more
                diverse products, and building a community of people who value
                handmade artistry as much as I do.
              </p>
            </div>
          </div>
        </div>

        {/* What I Value */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              What I Value
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              These principles guide every piece I create and every interaction
              with customers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow border-t-4 border-amber-400"
              >
                <div className="text-amber-600 mb-4 flex justify-center">
                  {value.icon}
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-3">
                  {value.title}
                </h4>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* What I Create */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              What I Create
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              I specialize in various handmade crafts, each made with care and
              attention to detail.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {skills.map((skill, index) => (
                <div key={index} className="flex items-center">
                  <div className="flex-shrink-0 w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center mr-4">
                    <svg
                      className="w-4 h-4 text-amber-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span className="text-gray-700">{skill}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-6 border-t">
              <p className="text-center text-gray-600 italic">
                Don't see what you're looking for? I accept custom orders!
                Contact me to discuss your ideas.
              </p>
            </div>
          </div>
        </div>

        {/* Why Choose Karigari */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose Karigari?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              When you shop with me, you're getting genuine handmade quality and
              personal care.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="text-amber-600 mb-4">
                <svg
                  className="h-10 w-10"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                  />
                </svg>
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-3">
                100% Handmade by Me
              </h4>
              <p className="text-gray-600 text-sm">
                Every single item is personally crafted by me in my workshop. No
                machines, no mass production - just genuine handwork.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <FiHeart className="h-10 w-10 text-amber-600 mb-4" />
              <h4 className="text-lg font-semibold text-gray-900 mb-3">
                Unique & Personal
              </h4>
              <p className="text-gray-600 text-sm">
                Each piece has its own character. Slight variations make your
                item truly one-of-a-kind, not a cookie-cutter copy.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <FiAward className="h-10 w-10 text-amber-600 mb-4" />
              <h4 className="text-lg font-semibold text-gray-900 mb-3">
                Quality Materials
              </h4>
              <p className="text-gray-600 text-sm">
                I source the best materials I can find because I want your
                purchase to last and bring you joy for years.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="text-amber-600 mb-4">
                <svg
                  className="h-10 w-10"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-3">
                Direct Communication
              </h4>
              <p className="text-gray-600 text-sm">
                When you contact me, you're talking directly to the maker. No
                middlemen, just personal service and attention.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <FiPackage className="h-10 w-10 text-amber-600 mb-4" />
              <h4 className="text-lg font-semibold text-gray-900 mb-3">
                Carefully Packaged
              </h4>
              <p className="text-gray-600 text-sm">
                I package every order myself with care, ensuring your item
                arrives safely and beautifully presented.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="text-amber-600 mb-4">
                <svg
                  className="h-10 w-10"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-3">
                Custom Orders Welcome
              </h4>
              <p className="text-gray-600 text-sm">
                Have a specific idea in mind? I love working on custom projects
                and bringing your vision to life.
              </p>
            </div>
          </div>
        </div>

        {/* My Commitment */}
        <div className="mb-20">
          <div className="bg-amber-50 border-2 border-amber-200 rounded-xl p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                My Commitment to You
              </h2>
              <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed">
                As a new business, I'm building my reputation one happy customer
                at a time. Here's what I promise you.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg p-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg
                      className="h-6 w-6 text-amber-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h4 className="font-semibold text-gray-900 mb-1">
                      Honest Communication
                    </h4>
                    <p className="text-sm text-gray-600">
                      I'll always be upfront about materials, timelines, and
                      what I can realistically create for you.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg
                      className="h-6 w-6 text-amber-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h4 className="font-semibold text-gray-900 mb-1">
                      Quality Guarantee
                    </h4>
                    <p className="text-sm text-gray-600">
                      If something arrives damaged or isn't what you expected,
                      I'll make it right.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg
                      className="h-6 w-6 text-amber-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h4 className="font-semibold text-gray-900 mb-1">
                      Personal Touch
                    </h4>
                    <p className="text-sm text-gray-600">
                      Every order includes a handwritten thank you note because
                      I genuinely appreciate your support.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg
                      className="h-6 w-6 text-amber-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h4 className="font-semibold text-gray-900 mb-1">
                      Growing Together
                    </h4>
                    <p className="text-sm text-gray-600">
                      Your feedback helps me improve and grow. I'm always
                      learning and striving to get better.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Future Vision */}
        <div className="mb-20">
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200 rounded-xl p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Looking Ahead: My Vision for Growth
              </h2>
              <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed">
                While I'm starting this journey solo, I dream of building
                something bigger with your support and love.
              </p>
            </div>

            <div className="max-w-4xl mx-auto space-y-6">
              <div className="bg-white rounded-lg p-6 shadow-md">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                      <span className="text-xl">🌱</span>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">
                      Starting Small, Dreaming Big
                    </h4>
                    <p className="text-gray-600 leading-relaxed">
                      Right now, it's just me in my workshop, pouring my heart
                      into every piece I create. But I believe that with your
                      support and encouragement, Karigari can grow into
                      something truly special. Every order, every review, and
                      every share helps me take one step closer to that vision.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-md">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                      <span className="text-xl">🤝</span>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">
                      Building a Community of Artisans
                    </h4>
                    <p className="text-gray-600 leading-relaxed">
                      As the business grows, my goal is to create a platform
                      that brings together other talented craftspeople. I want
                      to connect skilled artisans who share my passion for
                      handmade quality with customers who appreciate authentic
                      craftsmanship. Together, we can preserve traditional
                      crafts and support more artisan families.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-md">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                      <span className="text-xl">⭐</span>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">
                      Expanding While Staying True to Our Values
                    </h4>
                    <p className="text-gray-600 leading-relaxed">
                      Even as we grow, the core values won't change - every
                      product will still be genuinely handmade, every artisan
                      will be fairly compensated, and every customer will
                      receive personal attention and care. I envision a
                      marketplace where you can discover diverse handcrafted
                      items, all backed by the same commitment to quality and
                      authenticity.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-md">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                      <span className="text-xl">💝</span>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">
                      You're Part of This Journey
                    </h4>
                    <p className="text-gray-600 leading-relaxed">
                      Your support today helps lay the foundation for tomorrow.
                      When you buy from Karigari, you're not just getting a
                      handmade product - you're helping build a future where
                      skilled artisans have sustainable livelihoods and their
                      crafts continue to thrive. Every purchase is a vote of
                      confidence in this vision, and I'm deeply grateful for it.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 text-center">
              <p className="text-gray-700 font-medium italic text-lg">
                "Today, I craft alone. Tomorrow, with your love and support,
                we'll build a thriving community of artisans together."
              </p>
              <p className="text-gray-600 mt-2">— Karigari Founder</p>
            </div>
          </div>
        </div>

        {/* Contact & Connect */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Let's Connect!
            </h2>
            <p className="text-gray-600">
              Have questions or want to discuss a custom order? I'd love to hear
              from you!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <FiMail className="h-8 w-8 text-amber-600 mx-auto mb-4" />
              <h4 className="font-semibold text-gray-900 mb-2">Email Me</h4>
              <p className="text-gray-600">hello@Karigari.in</p>
            </div>

            <div>
              <FiPhone className="h-8 w-8 text-amber-600 mx-auto mb-4" />
              <h4 className="font-semibold text-gray-900 mb-2">
                Call/WhatsApp
              </h4>
              <p className="text-gray-600">+91 98765 43210</p>
            </div>

            <div>
              <div className="text-amber-600 mx-auto mb-4">
                <svg
                  className="h-8 w-8 mx-auto"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                </svg>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">
                Follow My Journey
              </h4>
              <p className="text-gray-600">@Karigari on Instagram</p>
            </div>
          </div>

          <div className="text-center mt-8">
            <Link
              to="/contact"
              className="bg-amber-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-amber-700 transition-colors inline-flex items-center shadow-md hover:shadow-lg"
            >
              Get in Touch
            </Link>
          </div>

          <div className="mt-8 pt-8 border-t text-center">
            <p className="text-gray-600 italic">
              Thank you for supporting a small, handmade business. Your purchase
              means the world to me and helps me continue doing what I love! ❤️
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
