"use client";

import { useState } from "react";
import axios from "axios";

interface Product {
  id: number;
  name: string;
  description?: string;
  price: number;
  image?: string;
}

interface UpdateProductModalProps {
  product: Product;
  onClose: () => void;
  onProductUpdated: () => void;
}

export default function UpdateProductModal({ product, onClose, onProductUpdated }: UpdateProductModalProps) {
  const [formData, setFormData] = useState({
    id: product.id,
    name: product.name,
    description: product.description || "",
    price: product.price,
    image: product.image || "",
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
      await axios.put("https://prime-trade-ai-server.vercel.app/api/v1/products/update", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      onProductUpdated();
      onClose();
    } catch (err) {
      console.error(err);
      alert("Failed to update product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-zinc-900 rounded-xl shadow-2xl p-6 w-full max-w-md">
        <h2 className="text-2xl text-white font-bold mb-4">Update Product</h2>
        <input
          name="name"
          placeholder="Product Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full bg-zinc-800 text-white rounded-lg p-2 mb-3"
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full bg-zinc-800 text-white rounded-lg p-2 mb-3"
        />
        <input
          name="price"
          type="number"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          className="w-full bg-zinc-800 text-white rounded-lg p-2 mb-3"
        />
        <input
          name="image"
          placeholder="Image URL"
          value={formData.image}
          onChange={handleChange}
          className="w-full bg-zinc-800 text-white rounded-lg p-2 mb-3"
        />

        <div className="flex justify-end gap-2 mt-4">
          <button onClick={onClose} className="px-4 py-2 bg-zinc-700 hover:bg-zinc-600 text-white rounded-lg">Cancel</button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
            disabled={loading}
          >
            {loading ? "Updating..." : "Update"}
          </button>
        </div>
      </div>
    </div>
  );
}
