import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FiTrash2, FiAlertTriangle, FiDatabase } from "react-icons/fi";

const DatabaseCleanup = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [confirmationCode, setConfirmationCode] = useState("");

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/admin/cleanup/stats`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        setStats(response.data.stats);
      }
    } catch (error) {
      console.error("Error fetching stats:", error);
      toast.error("Failed to fetch database statistics");
    }
  };

  const handleClearOrders = async () => {
    if (!window.confirm("Are you sure you want to delete ALL orders?")) return;

    try {
      setLoading(true);
      const response = await axios.delete(
        `${process.env.REACT_APP_API_URL}/api/admin/cleanup/orders`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        fetchStats();
      }
    } catch (error) {
      toast.error("Failed to clear orders");
    } finally {
      setLoading(false);
    }
  };

  const handleClearProducts = async () => {
    if (!window.confirm("Are you sure you want to delete ALL products?"))
      return;

    try {
      setLoading(true);
      const response = await axios.delete(
        `${process.env.REACT_APP_API_URL}/api/admin/cleanup/products`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        fetchStats();
      }
    } catch (error) {
      toast.error("Failed to clear products");
    } finally {
      setLoading(false);
    }
  };

  const handleClearTestOrders = async () => {
    if (!window.confirm("Clear all test orders?")) return;

    try {
      setLoading(true);
      const response = await axios.delete(
        `${process.env.REACT_APP_API_URL}/api/admin/cleanup/orders/test`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        fetchStats();
      }
    } catch (error) {
      toast.error("Failed to clear test orders");
    } finally {
      setLoading(false);
    }
  };

  const handleNuclearOption = async () => {
    if (confirmationCode !== "DELETE_ALL_DATA_PERMANENTLY") {
      toast.error("Invalid confirmation code!");
      return;
    }

    if (
      !window.confirm(
        "⚠️ FINAL WARNING: This will delete EVERYTHING except admin accounts. Are you absolutely sure?"
      )
    ) {
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/admin/cleanup/clear-all`,
        {
          confirmationCode: "DELETE_ALL_DATA_PERMANENTLY",
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        toast.success("All data cleared successfully!");
        setConfirmationCode("");
        fetchStats();
      }
    } catch (error) {
      toast.error("Failed to clear all data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Database Cleanup
          </h1>
          <p className="text-sm text-red-600">
            ⚠️ Danger Zone - Use with extreme caution
          </p>
        </div>

        {/* Statistics */}
        {stats && (
          <div className="bg-white rounded-xl shadow-md p-6 mb-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center">
              <FiDatabase className="mr-2" />
              Database Statistics
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <p className="text-3xl font-bold text-blue-600">
                  {stats.orders}
                </p>
                <p className="text-sm text-gray-600">Total Orders</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-green-600">
                  {stats.products}
                </p>
                <p className="text-sm text-gray-600">Total Products</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-purple-600">
                  {stats.users}
                </p>
                <p className="text-sm text-gray-600">Total Users</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-yellow-600">
                  {stats.admins}
                </p>
                <p className="text-sm text-gray-600">Admins</p>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-4">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="font-semibold mb-3">Quick Actions</h3>
            <div className="space-y-3">
              <button
                onClick={handleClearTestOrders}
                disabled={loading}
                className="w-full bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 disabled:opacity-50"
              >
                Clear Test Orders
              </button>

              <button
                onClick={handleClearOrders}
                disabled={loading}
                className="w-full bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 disabled:opacity-50"
              >
                Clear All Orders
              </button>

              <button
                onClick={handleClearProducts}
                disabled={loading}
                className="w-full bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 disabled:opacity-50"
              >
                Clear All Products
              </button>
            </div>
          </div>

          {/* Nuclear Option */}
          <div className="bg-red-50 border-2 border-red-500 rounded-xl p-6">
            <h3 className="font-semibold mb-3 text-red-900 flex items-center">
              <FiAlertTriangle className="mr-2" />
              Nuclear Option
            </h3>
            <p className="text-sm text-red-700 mb-4">
              Type{" "}
              <code className="bg-red-200 px-2 py-1 rounded">
                DELETE_ALL_DATA_PERMANENTLY
              </code>{" "}
              to enable
            </p>

            <input
              type="text"
              value={confirmationCode}
              onChange={(e) => setConfirmationCode(e.target.value)}
              placeholder="Type confirmation code"
              className="w-full px-3 py-2 border border-red-300 rounded-lg mb-3"
            />

            <button
              onClick={handleNuclearOption}
              disabled={
                loading || confirmationCode !== "DELETE_ALL_DATA_PERMANENTLY"
              }
              className="w-full bg-red-800 text-white px-4 py-2 rounded-lg hover:bg-red-900 disabled:opacity-50 flex items-center justify-center"
            >
              <FiTrash2 className="mr-2" />
              Clear ALL Data (Except Admins)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DatabaseCleanup;
