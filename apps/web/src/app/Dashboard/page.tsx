"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import AddProductModal from "../../Components/AddProduct";
import UpdateProductModal from "../../Components/UpdateProduct";
import DeleteProductModal from "../../Components/DeleteProduct";

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
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("https://prime-trade-ai-server.vercel.app/api/v1/products/all");
      setProducts(response.data.Products);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    // Redirect to login if no token
    if (!token) {
      router.push("/Login");
      return;
    }

    const adminFlag = localStorage.getItem("isAdmin") === "true";
    setIsAdmin(adminFlag);
    fetchProducts();
  }, [router]);

  return (
    <div className="min-h-screen bg-black p-8">
      <h1 className="text-3xl text-white font-bold mb-6">Products Dashboard</h1>

      {isAdmin && (
        <button
          className="mb-6 bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-lg shadow-lg"
          onClick={() => setShowAddModal(true)}
        >
          Add Product
        </button>
      )}

      {!isAdmin && (
        <button
          className="mb-6 bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-lg shadow-lg"
          onClick={() => router.push("/Login")}
        >
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
                <button
                  onClick={() => {
                    setSelectedProduct(product);
                    setShowUpdateModal(true);
                  }}
                  className="flex-1 bg-yellow-600 hover:bg-yellow-700 text-white font-medium py-2 rounded-lg"
                >
                  Update
                </button>
                <button
                  onClick={() => {
                    setSelectedProduct(product);
                    setShowDeleteModal(true);
                  }}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white font-medium py-2 rounded-lg"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {showAddModal && (
        <AddProductModal
          onClose={() => setShowAddModal(false)}
          onProductAdded={fetchProducts}
        />
      )}

      {showUpdateModal && selectedProduct && (
        <UpdateProductModal
          product={selectedProduct}
          onClose={() => {
            setShowUpdateModal(false);
            setSelectedProduct(null);
          }}
          onProductUpdated={fetchProducts}
        />
      )}

      {showDeleteModal && selectedProduct && (
        <DeleteProductModal
          product={selectedProduct}
          onClose={() => {
            setShowDeleteModal(false);
            setSelectedProduct(null);
          }}
          onProductDeleted={fetchProducts}
        />
      )}
    </div>
  );
}
