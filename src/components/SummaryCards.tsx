'use client';

import { Card, CardContent } from "@/components/ui/card";

type Props = {
  transactions: {
    amount: number;
    date: string;
    description: string;
    category: string;
  }[];
};

export default function SummaryCards({ transactions }: Props) {
  const total = transactions.reduce((acc, txn) => acc + txn.amount, 0);

  const categoryTotals: Record<string, number> = {};
  transactions.forEach((txn) => {
    const cat = txn.category || 'Others';
    categoryTotals[cat] = (categoryTotals[cat] || 0) + txn.amount;
  });

  const topCategory = Object.entries(categoryTotals).sort((a, b) => b[1] - a[1])[0];

  const recent = transactions.slice().sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
      <Card>
        <CardContent className="py-4">
          <p className="text-muted-foreground text-sm">Total Expenses</p>
          <h2 className="text-2xl font-semibold">₹{total}</h2>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="py-4">
          <p className="text-muted-foreground text-sm">Top Category</p>
          <h2 className="text-xl font-medium">{topCategory?.[0] || 'N/A'}</h2>
          <p className="text-muted-foreground text-sm">₹{topCategory?.[1] || 0}</p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="py-4">
          <p className="text-muted-foreground text-sm">Most Recent</p>
          {recent ? (
            <>
              <h2 className="text-base font-medium">{recent.description}</h2>
              <p className="text-sm text-muted-foreground">₹{recent.amount} on {new Date(recent.date).toISOString()}</p>
            </>
          ) : (
            <p>No transactions</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
