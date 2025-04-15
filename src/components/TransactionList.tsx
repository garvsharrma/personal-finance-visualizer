'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';

interface Transaction {
  _id: string;
  amount: number;
  date: string;
  description: string;
  category: string;
}

export default function TransactionList() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch transactions from the API
  useEffect(() => {
    const fetchTransactions = async () => {
      const res = await fetch('/api/transactions');
      const data = await res.json();
      setTransactions(data);
      setLoading(false);
    };

    fetchTransactions();
  }, []);

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this transaction?');
    if (!confirmDelete) return;

    const res = await fetch(`/api/transactions/${id}`, {
      method: 'DELETE',
    });

    if (res.ok) {
      setTransactions(transactions.filter((txn) => txn._id !== id));
    } else {
      alert('Failed to delete transaction');
    }
  };

  if (loading) return <p className="text-center">Loading transactions...</p>;

  if (transactions.length === 0) return <p className="text-center">No transactions found.</p>;

  return (
    <div className="space-y-4">
      {transactions.map((txn) => (
        <Card key={txn._id} className="p-4 flex justify-between items-center bg-white shadow-sm">
          <div >
            <p className="font-medium">{txn.description}</p>
            <p className="text-sm text-muted-foreground">{txn.date}</p>
            <p className="text-sm text-muted-foreground italic">{txn.category}</p>
          </div>
          <div className="flex items-center">
            <p className="text-right font-semibold text-green-600">₹{txn.amount.toFixed(2)}</p>
            <button
              onClick={() => handleDelete(txn._id)}
              className="ml-4 text-red-500 hover:text-red-700"
            >
              Delete
            </button>
          </div>
        </Card>
      ))}
    </div>
  );
}
