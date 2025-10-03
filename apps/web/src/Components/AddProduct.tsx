"use client";

import { useState } from "react";
import axios from "axios";

interface AddProductModalProps {
  onClose: () => void;
  onProductAdded: () => void; // callback to refresh products
}

export default function AddProductModal({ onClose, onProductAdded }: AddProductModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: 0,
    image: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "price" ? Number(value) : value,
    });
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found. Please login again.");

      await axios.post(
        "https://prime-trade-ai-server.vercel.app/api/v1/products/add",
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert("Product added successfully!");
      onProductAdded();
      onClose();
    } catch (error: any) {
      console.error("Add product error:", error);
      alert(error.response?.data?.Message || error.message || "Failed to add product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-zinc-900 rounded-xl w-full max-w-md p-6 relative">
        <h2 className="text-2xl font-bold text-white mb-4 text-center">Add Product</h2>

        <div className="space-y-4">
          <div>
            <label className="text-zinc-200 text-sm font-medium block mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Product name"
              className="w-full bg-zinc-800 border border-zinc-700 text-white rounded-lg h-11 px-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
            />
          </div>

          <div>
            <label className="text-zinc-200 text-sm font-medium block mb-1">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Product description"
              className="w-full bg-zinc-800 border border-zinc-700 text-white rounded-lg px-3 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all resize-none"
            />
          </div>

          <div>
            <label className="text-zinc-200 text-sm font-medium block mb-1">Price</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Price"
              className="w-full bg-zinc-800 border border-zinc-700 text-white rounded-lg h-11 px-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
            />
          </div>

          <div>
            <label className="text-zinc-200 text-sm font-medium block mb-1">Image URL</label>
            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
              className="w-full bg-zinc-800 border border-zinc-700 text-white rounded-lg h-11 px-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
            />
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <button
              onClick={onClose}
              className="bg-zinc-700 hover:bg-zinc-600 text-white font-medium px-4 py-2 rounded-lg transition-all"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg transition-all disabled:opacity-50"
            >
              {loading ? "Adding..." : "Add Product"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
