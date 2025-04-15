'use client';

import { useState } from 'react';
import BudgetInput from './BudgetInput';
import BudgetVsActualChart from './BudgetVsActualChart';
import SpendingInsights from './SpendingInsights';

type Transaction = {
  category: string;
  amount: number;
};

type Props = {
  transactions: Transaction[];
};

export default function BudgetingDashboard({ transactions }: Props) {
  const [budgets, setBudgets] = useState<Record<string, number>>({});

  const handleSaveBudget = (newBudgets: { category: string; amount: number }[]) => {
    const budgetMap: Record<string, number> = {};
    newBudgets.forEach(({ category, amount }) => {
      budgetMap[category] = amount;
    });
    setBudgets(budgetMap);
  };

  const budgetData = Object.keys(budgets).map((category) => ({
    category,
    budget: budgets[category],
    actual: transactions
      .filter((txn) => txn.category === category)
      .reduce((sum, txn) => sum + txn.amount, 0),
  }));

  return (
    <section className="mt-10">
      <BudgetInput
        categories={Array.from(new Set(transactions.map((txn) => txn.category)))}
        onSaveBudget={handleSaveBudget}
      />
      <BudgetVsActualChart data={budgetData} />
      <SpendingInsights transactions={transactions} budgets={budgets} />
    </section>
  );
}
