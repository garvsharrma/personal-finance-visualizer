// app/page.tsx
import TransactionForm from '@/components/TransactionForm';
import TransactionList from '@/components/TransactionList';
import MonthlyBarChart from '@/components/MonthlyBarChart';
import CategoryPieChart from '@/components/CategoryPieChart';
import SummaryCards from '@/components/SummaryCards';
import BudgetingDashboard from '@/components/BudgetingDashboard';

async function getTransactions() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/transactions`, {
    cache: 'no-store',
  });

  if (!res.ok) throw new Error('Failed to fetch transactions');
  return res.json();
}

export default async function Home() {
  const transactions = await getTransactions();

  return (
    <main className="p-6 max-w-4xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold text-center mb-4">Finance Visualizer</h1>
      <TransactionForm />
      <TransactionList />
      <div className="grid md:grid-cols-2 gap-6">

      <MonthlyBarChart />
      <CategoryPieChart data={transactions} />
      <SummaryCards transactions={transactions} />
      </div>
      <BudgetingDashboard transactions={transactions} />
    </main>
  );
}
