const stripe = require('../../config/stripe');
const userModel = require('../../models/userModel');

const paymentController = async (request, response) => {
    try {
        const { cartItems } = request.body;
        
        const user = await userModel.findOne({ _id: request.userId });
        
        if (!user) {
            return response.status(404).json({
                message: 'User not found',
                error: true,
                success: false,
            });
        }

        const params = {
            submit_type: 'pay',
            mode: 'payment',
            payment_method_types: ['card'],
            billing_address_collection: 'auto',
            shipping_options: [
                {
                    shipping_rate: 'shr_1R5XPTIsX1Vkfv8GMu9KtgCL',
                },
            ],
            customer_email: user.email,
            line_items: cartItems.map((item) => {
                return {
                    price_data: {
                        currency: 'inr',
                        product_data: {
                            name: item.productId.productName,
                            images: item.productId.productImage,
                            metadata: {
                                productId: item.productId._id,
                            },
                        },
                        unit_amount: item.productId.sellingPrice * 100,
                    },
                    adjustable_quantity: {
                        enabled: true,
                        minimum: 1,
                    },
                    quantity: item.quantity,
                };
            }),
            success_url: `${process.env.FRONTEND_URL}/success`,
            cancel_url: `${process.env.FRONTEND_URL}/cancel`,
        };

        const session = await stripe.checkout.sessions.create(params);

        return response.status(303).json(session); // Fix: Use "response" instead of "Response"
    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false,
        });
    }
};

module.exports = paymentController;
