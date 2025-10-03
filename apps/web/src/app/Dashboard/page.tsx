"use client";

import { useEffect, useState } from "react";
import axios from "axios";

type Product = {
  id: number;
  name: string;
  description: string | null;
  price: number;
  image: string | null;
  createdAt: string;
  updatedAt: string;
};

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(
          "https://prime-trade-ai-server.vercel.app/api/v1/products/all"
        );
        setProducts(res.data.Products || []);
      } catch (err: any) {
        setError("Failed to fetch products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <p className="text-zinc-400">Loading products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-8">All Products</h1>
      <div className="grid gap-6 w-full max-w-5xl md:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-zinc-900 border border-zinc-800 rounded-xl shadow-lg hover:shadow-xl transition-all overflow-hidden"
          >
            {product.image ? (
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover border-b border-zinc-800"
              />
            ) : (
              <div className="w-full h-48 bg-zinc-800 flex items-center justify-center text-zinc-500">
                No Image
              </div>
            )}

            <div className="p-5">
              <h2 className="text-xl font-semibold">{product.name}</h2>
              <p className="text-zinc-400 text-sm mt-2">
                {product.description}
              </p>
              <p className="text-blue-400 font-bold mt-4">${product.price}</p>
              <p className="text-xs text-zinc-500 mt-2">
                Added on {new Date(product.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
