import mongoose from 'mongoose';

const TransactionSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  date: { type: Date, required: true },
  description: { type: String, required: true },
  category: {
    type: String,
    enum: ['Food', 'Transport', 'Rent', 'Entertainment', 'Shopping', 'Others'],
    default: 'Others'
  },
}, { timestamps: true });

export const Transaction = mongoose.models.Transaction || mongoose.model('Transaction', TransactionSchema);