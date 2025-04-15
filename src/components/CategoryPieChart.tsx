'use client';

import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#845EC2', '#FF6F91'];

export default function CategoryPieChart({ data }: { data: any[] }) {
  // Group by category
  const categoryData = data.reduce((acc: any, txn: any) => {
    const category = txn.category || 'Others';
    if (!acc[category]) acc[category] = 0;
    acc[category] += txn.amount;
    return acc;
  }, {});

  // Convert to chart format
  const pieData = Object.keys(categoryData).map((cat) => ({
    name: cat,
    value: categoryData[cat],
  }));

  return (
    <div className="p-4 bg-white rounded-lg shadow-md w-full h-[300px]">
      <h2 className="text-lg font-semibold mb-4">Expenses by Category</h2>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={pieData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={90}
            fill="#8884d8"
            label
          >
            {pieData.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
