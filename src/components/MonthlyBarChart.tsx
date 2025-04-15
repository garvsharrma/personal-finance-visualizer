'use client';

import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { useEffect, useState } from 'react';

interface Transaction {
  _id: string;
  amount: number;
  date: string;
  description: string;
}

interface MonthlyData {
  month: string;
  total: number;
}

const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export default function MonthlyBarChart() {
  const [data, setData] = useState<MonthlyData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/transactions');
      const transactions: Transaction[] = await res.json();

      const monthlyTotals: Record<string, number> = {};

      transactions.forEach((txn) => {
        const date = new Date(txn.date);
        const key = `${date.getFullYear()}-${date.getMonth()}`;

        monthlyTotals[key] = (monthlyTotals[key] || 0) + txn.amount;
      });

      const formatted: MonthlyData[] = Object.entries(monthlyTotals).map(([key, total]) => {
        const [year, monthIndex] = key.split('-').map(Number);
        return {
          month: `${monthNames[monthIndex]} ${year}`,
          total,
        };
      });

      setData(formatted.sort((a, b) => monthNames.indexOf(a.month.split(' ')[0]) - monthNames.indexOf(b.month.split(' ')[0])));
    };

    fetchData();
  }, []);

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">Monthly Expenses</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="total" fill="#4ade80" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
