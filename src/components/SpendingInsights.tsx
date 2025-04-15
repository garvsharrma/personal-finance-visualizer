// components/SpendingInsights.tsx
type Transaction = {
    amount: number;
    category: string;
  };
  
  type Props = {
    transactions: Transaction[];
    budgets: Record<string, number>;
  };
  
  export default function SpendingInsights({ transactions, budgets }: Props) {
    const totalSpent = transactions.reduce((acc, txn) => acc + txn.amount, 0);
    const totalBudget = Object.values(budgets).reduce((acc, budget) => acc + budget, 0);
  
    const budgetDifference = totalBudget - totalSpent;
    const percentageSpent = ((totalSpent / totalBudget) * 100).toFixed(2);
  
    return (
      <div className="mt-6">
        <h2 className="text-xl font-bold">Spending Insights</h2>
        <div className="mt-4">
          <p>Total Spent: ₹{totalSpent}</p>
          <p>Total Budget: ₹{totalBudget}</p>
          <p>Remaining Budget: ₹{budgetDifference}</p>
          <p>Percentage of Budget Spent: {percentageSpent}%</p>
        </div>
      </div>
    );
  }
  