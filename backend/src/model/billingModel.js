const mongoose = require('mongoose');
const { Schema } = mongoose;

const OrderedItemSchema = new Schema({
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true }
});

const DeliverySchema = new Schema({
    status: { type: String, enum: ['Pending', 'Delivered', 'Cancelled'], default: 'Pending' },
    remarks: { type: String }
});

const PaymentDetailsSchema = new Schema({
    method: { type: String, required: true },
    phoneNumber: { type: String },
    otp: { type: String },
    cardNumber: { type: String },
    cardExpiry: { type: String },
    cardCvv: { type: String },
    transactionId: { type: String }
});

const AddressSchema = new Schema({
    line1: { type: String, required: true },
    line2: { type: String },
    insideDhaka: { type: Boolean, required: true },
    city: { type: String }
});

const OrderSchema = new Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [OrderedItemSchema],
    subtotal: { type: Number, required: true },
    vat: { type: Number, required: true },
    deliveryFee: { type: Number, required: true },
    totalAmount: { type: Number, required: true },
    address: AddressSchema,
    payment: PaymentDetailsSchema,
    delivery: DeliverySchema,
    createdAt: { type: Date, default: Date.now }
});

const Order = mongoose.model('Order', OrderSchema);
module.exports = Order;
