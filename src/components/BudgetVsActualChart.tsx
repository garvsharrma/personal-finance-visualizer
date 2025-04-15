// components/BudgetVsActualChart.tsx
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

type BudgetData = {
  category: string;
  budget: number;
  actual: number;
};

type Props = {
  data: BudgetData[];
};

export default function BudgetVsActualChart({ data }: Props) {
  return (
    <div>
      <h2 className="text-xl font-bold">Budget vs Actual</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="budget" fill="#8884d8" />
          <Bar dataKey="actual" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
