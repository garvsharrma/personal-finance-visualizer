import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { Transaction } from '@/models/transaction';

// Use context type for dynamic route params
export async function DELETE(req: NextRequest, context: { params: { id: string } }) {
  try {
    await connectDB();
    const { id } = context.params;

    const deletedTransaction = await Transaction.findByIdAndDelete(id);

    if (!deletedTransaction) {
      return NextResponse.json({ message: 'Transaction not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Transaction deleted successfully' });
  } catch (error) {
    console.error('DELETE error:', error);
    return NextResponse.json({ message: 'Server Error' }, { status: 500 });
  }
}
