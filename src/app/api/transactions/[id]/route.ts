import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { Transaction } from '@/models/transaction';

type Props = {
  params: {
    id: string;
  };
};

export async function DELETE(
  request: NextRequest,
  { params }: Props
) {
  try {
    await connectDB();

    const deletedTransaction = await Transaction.findByIdAndDelete(params.id);

    if (!deletedTransaction) {
      return NextResponse.json({ message: 'Transaction not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Transaction deleted successfully' });
  } catch (error) {
    console.error('DELETE error:', error);
    return NextResponse.json({ message: 'Server Error' }, { status: 500 });
  }
}