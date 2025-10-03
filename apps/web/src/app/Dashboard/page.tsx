"use client";

import { useEffect, useState } from "react";
import axios from "axios";

interface Product {
  id: number;
  name: string;
  description?: string;
  price: number;
  image?: string;
  createdAt: string;
  updatedAt: string;
}

export default function Dashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const adminFlag = localStorage.getItem("isAdmin") === "true";
    setIsAdmin(adminFlag);

    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://prime-trade-ai-server.vercel.app/api/v1/products/all");
        setProducts(response.data.Products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-black p-8">
      <h1 className="text-3xl text-white font-bold mb-6">Products Dashboard</h1>

      {!isAdmin && (
        <button className="mb-6 bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-lg shadow-lg">
          Sign in as admin
        </button>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-zinc-900 border border-zinc-800 rounded-xl shadow-md p-4 flex flex-col"
          >
            {product.image && (
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
            )}
            <h2 className="text-xl font-semibold text-white">{product.name}</h2>
            <p className="text-zinc-400 text-sm mb-2">{product.description}</p>
            <p className="text-white font-medium mb-4">${product.price}</p>

            {isAdmin && (
              <div className="flex gap-2 mt-auto">
                <button className="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium py-2 rounded-lg">
                  Add
                </button>
                <button className="flex-1 bg-yellow-600 hover:bg-yellow-700 text-white font-medium py-2 rounded-lg">
                  Update
                </button>
                <button className="flex-1 bg-red-600 hover:bg-red-700 text-white font-medium py-2 rounded-lg">
                  Delete
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
