// components/BudgetInput.tsx
import { useState } from 'react';

type Budget = {
  category: string;
  amount: number;
};

type Props = {
  categories: string[];
  onSaveBudget: (budget: Budget[]) => void;
};

export default function BudgetInput({ categories, onSaveBudget }: Props) {
  const [budgets, setBudgets] = useState<Budget[]>(categories.map((category) => ({ category, amount: 0 })));

  const handleChange = (category: string, value: number) => {
    setBudgets((prev) => prev.map((budget) => (budget.category === category ? { ...budget, amount: value } : budget)));
  };

  const handleSave = () => {
    onSaveBudget(budgets);
  };

  return (
    <div>
      <h2 className="text-xl font-bold">Set Monthly Budgets</h2>
      {categories.map((category) => (
        <div key={category} className="flex justify-between mt-2">
          <span>{category}</span>
          <input
            type="number"
            value={budgets.find((budget) => budget.category === category)?.amount || 0}
            onChange={(e) => handleChange(category, parseFloat(e.target.value))}
            className="border px-2 py-1"
          />
        </div>
      ))}
      <button onClick={handleSave} className="mt-4 bg-blue-500 text-white py-2 px-4">
        Save Budgets
      </button>
    </div>
  );
}
