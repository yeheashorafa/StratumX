"use client";

import { useEffect, useState } from "react";
import { fetchOrders, updateOrderStatus } from "../../api/orders";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadOrders = async () => {
    setLoading(true);
    try {
      const data = await fetchOrders();
      setOrders(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const handleStatusChange = async (orderId, status) => {
    try {
      await updateOrderStatus(orderId, status);
      loadOrders();
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!orders.length) return <div>No orders found</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Orders</h1>
      <table className="w-full border">
        <thead className="bg-gray-200">
          <tr>
            <th className="border p-2">ID</th>
            <th className="border p-2">Customer</th>
            <th className="border p-2">Total</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o) => (
            <tr key={o.id} className="bg-white">
              <td className="border p-2">{o.id}</td>
              <td className="border p-2">{o.shippingInfo.name}</td>
              <td className="border p-2">${o.total.toFixed(2)}</td>
              <td className="border p-2">{o.status}</td>
              <td className="border p-2 flex gap-2">
                {o.status !== "COMPLETED" && (
                  <button
                    className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                    onClick={() => handleStatusChange(o.id, "COMPLETED")}
                  >
                    Complete
                  </button>
                )}
                {o.status !== "CANCELLED" && (
                  <button
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                    onClick={() => handleStatusChange(o.id, "CANCELLED")}
                  >
                    Cancel
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}