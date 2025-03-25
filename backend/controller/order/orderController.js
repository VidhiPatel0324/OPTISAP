// controller/order/orderController.js

const Order = require('../../models/orderModel');  // Assuming you have an Order model

// Get order details by orderId
const getOrderDetails = async (req, res) => {
  try {
    const { orderId } = req.params;
    
    // Fetch order details from the database using the orderId
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Return order details
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching order details' });
  }
};

module.exports = {
  getOrderDetails
};
