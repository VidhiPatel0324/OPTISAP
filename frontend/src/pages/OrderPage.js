import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SummaryApi from '../common';
import { useParams } from 'react-router-dom';


const OrderPage = () => {
  const { orderId } = useParams(); // Get the orderId from the URL
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch order details using useEffect when orderId changes
  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        // Call the backend API to fetch order details
        const response = await axios.get(`${SummaryApi.payment.url}/order/${orderId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Or wherever your JWT token is stored
          },
        });
        setOrder(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch order details');
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  if (loading) {
    return <div>Loading order details...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="order-page-container">
      <h2>Order Details</h2>
      {order ? (
        <div>
          <p><strong>Order ID:</strong> {order._id}</p>
          <p><strong>Total Amount:</strong> ${order.totalAmount}</p>
          <p><strong>Status:</strong> {order.status}</p>
          <p><strong>Items:</strong></p>
          <ul>
            {order.items.map((item, index) => (
              <li key={index}>{item.name} x {item.quantity}</li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No order found</p>
      )}
    </div>
  );
};

export default OrderPage;
