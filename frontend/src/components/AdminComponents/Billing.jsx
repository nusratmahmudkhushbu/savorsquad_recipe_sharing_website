import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { apiStart } from '../../../api'; // Adjust the import path for your API base URL
import { HiTrash, HiPencil } from 'react-icons/hi';
import { toast } from 'react-hot-toast'; // For notifications

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [updating, setUpdating] = useState(false);
  const [updatedOrder, setUpdatedOrder] = useState({});
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${apiStart}/api/minimart/orders`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('loginToken')}` }
      });
      setOrders(response.data.orders);
      setFilteredOrders(response.data.orders); // Set initial filtered orders
    } catch (error) {
      console.error('Error fetching orders:', error);
      toast.error('Failed to fetch orders');
    }
  };

  const handleDeleteOrder = async (id) => {
    if (window.confirm('Are you sure you want to delete this order?')) {
      try {
        const response = await axios.delete(`${apiStart}/api/minimart/orders/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('loginToken')}` }
        });
        if (response.data.success) {
          toast.success('Order deleted successfully');
          fetchOrders();
        } else {
          toast.error('Failed to delete order');
        }
      } catch (error) {
        console.error('Error deleting order:', error);
        toast.error('Failed to delete order');
      }
    }
  };

  const handleUpdateOrder = async () => {
    if (selectedOrder) {
      try {
        const response = await axios.put(`${apiStart}/api/minimart/orders/${selectedOrder._id}`, {
          delivery: { 
            status: updatedOrder.status || selectedOrder.delivery.status,
            remarks: updatedOrder.remarks || selectedOrder.delivery.remarks
          }
        }, {
          headers: { Authorization: `Bearer ${localStorage.getItem('loginToken')}` }
        });
        if (response.data.success) {
          toast.success('Order updated successfully');
          fetchOrders();
          setUpdating(false);
          setSelectedOrder(null); 
        } else {
          toast.error('Failed to update order');
        }
      } catch (error) {
        console.error('Error updating order:', error);
        toast.error('Failed to update order');
      }
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = orders.filter(order => 
      order._id.toLowerCase().includes(query.toLowerCase()) ||
      order.user.username.toLowerCase().includes(query.toLowerCase()) ||
      order.delivery.status.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredOrders(filtered);
  };

  // Close modal when clicking outside of it
  const closeModalOnOutsideClick = (e) => {
    if (e.target.id === 'modal-overlay') {
      setUpdating(false);
      setSelectedOrder(null);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Order Management</h1>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search by Order ID, User, or Status"
        value={searchQuery}
        onChange={(e) => handleSearch(e.target.value)}
        className="border border-gray-300 rounded p-2 mb-4 w-full"
      />

      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Order ID</th>
            <th className="py-2 px-4 border-b">User</th>
            <th className="py-2 px-4 border-b">Total Amount</th>
            <th className="py-2 px-4 border-b">Status</th>
            <th className="py-2 px-4 border-b">Address</th>
            <th className="py-2 px-4 border-b">Remarks</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.map((order) => (
            <tr key={order._id}>
              <td className="py-2 px-4 border-b">{order._id}</td>
              <td className="py-2 px-4 border-b">{order.user.username}</td>
              <td className="py-2 px-4 border-b">Tk.{order.totalAmount}</td>
              <td className="py-2 px-4 border-b">{order.delivery.status}</td>
              {/* Address */}
              <td className="py-2 px-4 border-b">
                {order.address.line1}, {order.address.line2 && `${order.address.line2}, `}
                {order.address.city}
              </td>
              {/* Remarks */}
              <td className="py-2 px-4 border-b">
                {order.delivery.remarks || 'No remarks'}
              </td>
              <td className="py-2 px-4 border-b flex gap-2">
                <button
                  onClick={() => {
                    setSelectedOrder(order);
                    setUpdating(true);
                  }}
                  className="text-blue-500 hover:text-blue-700"
                >
                  <HiPencil size={20} />
                </button>
                <button
                  onClick={() => handleDeleteOrder(order._id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <HiTrash size={20} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for updating order */}
      {updating && selectedOrder && (
        <div 
          id="modal-overlay" 
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center" 
          onClick={closeModalOnOutsideClick}
        >
          <div className="bg-white rounded p-6 shadow-lg w-1/3 relative">
            <h2 className="text-xl font-bold mb-2">Update Order</h2>

            {/* Status Update */}
            <div>
              <label className="block mb-2">Status:</label>
              <select
                value={updatedOrder.status || selectedOrder.delivery.status}
                onChange={(e) => setUpdatedOrder({ ...updatedOrder, status: e.target.value })}
                className="border border-gray-300 rounded p-2 w-full"
              >
                <option value="Pending">Pending</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>

            {/* Remarks Update */}
            <div className="mt-4">
              <label className="block mb-2">Remarks:</label>
              <input
                type="text"
                value={updatedOrder.remarks || selectedOrder.delivery.remarks}
                onChange={(e) => setUpdatedOrder({ ...updatedOrder, remarks: e.target.value })}
                className="border border-gray-300 rounded p-2 w-full"
                placeholder="Enter remarks"
              />
            </div>

            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={handleUpdateOrder}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Update
              </button>
              <button
                onClick={() => {
                  setUpdating(false);
                  setSelectedOrder(null);
                }}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderManagement;
