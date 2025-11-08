import React, { useState } from "react";
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiClock,
  FiMessageCircle,
} from "react-icons/fi";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We're here to help! Reach out to us for any questions or support.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                Get in Touch
              </h2>

              <div className="space-y-6">
                <div className="flex items-start">
                  <FiMapPin className="h-6 w-6 text-primary-400 mt-1 mr-4" />
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">
                      Address
                    </h3>
                    <p className="text-gray-600">
                      Poonam darshan, Dahisar East - 400068, Mumbai, India
                    </p>
                    <p className="text-gray-500 text-sm">
                      Sat-Sun 11:00 AM - 8:00 PM
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <FiPhone className="h-6 w-6 text-primary-400 mt-1 mr-4" />
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">Phone</h3>
                    <p className="text-gray-600">+91 9140847529</p>
                    <p className="text-gray-500 text-sm">
                      Sat-Sun 9:00 AM - 8:00 PM
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <FiMail className="h-6 w-6 text-primary-400 mt-1 mr-4" />
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">Email</h3>
                    <p className="text-gray-600">hello@Karigari.in</p>
                    <p className="text-gray-500 text-sm">
                      We'll respond within 24 hours
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <FiClock className="h-6 w-6 text-primary-400 mt-1 mr-4" />
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">
                      Business Hours
                    </h3>
                    <p className="text-gray-600">
                      Saturday - Sunday: 9:00 AM - 8:00 PM
                    </p>
                    {/* <p className="text-gray-600">Sunday: 10:00 AM - 6:00 PM</p> */}
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

export default Contact;
