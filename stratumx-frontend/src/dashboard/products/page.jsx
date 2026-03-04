"use client";

import { useEffect, useState } from "react";
import { fetchProducts } from "../../api/products";

export default function AdminProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      try {
        const data = await fetchProducts(1, "en"); // businessId = 1
        setProducts(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!products.length) return <div>No products</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Manage Products</h1>
      <table className="w-full border">
        <thead className="bg-gray-200">
          <tr>
            <th className="border p-2">ID</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Price</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id} className="bg-white">
              <td className="border p-2">{p.id}</td>
              <td className="border p-2">{p.translations[0]?.name}</td>
              <td className="border p-2">${p.price}</td>
              <td className="border p-2 flex gap-2">
                <button className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600">Edit</button>
                <button className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}