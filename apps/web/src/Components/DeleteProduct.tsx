"use client";

import axios from "axios";

interface Product {
  id: number;
  name: string;
}

interface DeleteProductModalProps {
  product: Product;
  onClose: () => void;
  onProductDeleted: () => void;
}

export default function DeleteProductModal({ product, onClose, onProductDeleted }: DeleteProductModalProps) {
  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete("https://prime-trade-ai-server.vercel.app/api/v1/products/delete", {
        headers: { Authorization: `Bearer ${token}` },
        data: { id: product.id }, // sending id in request body
      });
      onProductDeleted();
      onClose();
    } catch (err) {
      console.error(err);
      alert("Failed to delete product");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-zinc-900 rounded-xl shadow-2xl p-6 w-full max-w-sm">
        <h2 className="text-2xl text-white font-bold mb-4">Delete Product</h2>
        <p className="text-zinc-300 mb-4">
          Are you sure you want to delete <span className="font-semibold text-white">{product.name}</span>?
        </p>
        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 bg-zinc-700 hover:bg-zinc-600 text-white rounded-lg">Cancel</button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
