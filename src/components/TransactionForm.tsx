'use client';

import { useState } from 'react';

export default function TransactionForm({ onSuccess }: { onSuccess?: () => void }) {
  const [form, setForm] = useState({
    amount: '',
    description: '',
    date: '',
    category: 'Others',
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch('/api/transactions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      setForm({
        amount: '',
        description: '',
        date: '',
        category: 'Others',
      });
      onSuccess?.();
    } else {
      alert('Something went wrong');
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded-lg bg-white shadow-sm">
      <div>
        <label className="block text-sm font-medium">Amount</label>
        <input
          type="number"
          name="amount"
          value={form.amount}
          onChange={handleChange}
          required
          className="w-full mt-1 p-2 border rounded"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Description</label>
        <input
          type="text"
          name="description"
          value={form.description}
          onChange={handleChange}
          required
          className="w-full mt-1 p-2 border rounded"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Date</label>
        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          required
          className="w-full mt-1 p-2 border rounded"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Category</label>
        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          className="w-full mt-1 p-2 border rounded"
        >
          <option value="Food">Food</option>
          <option value="Transport">Transport</option>
          <option value="Rent">Rent</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Shopping">Shopping</option>
          <option value="Others">Others</option>
        </select>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="bg-black text-white py-2 px-4 rounded hover:bg-gray-800"
      >
        {loading ? 'Adding...' : 'Add Transaction'}
      </button>
    </form>
  );
}
