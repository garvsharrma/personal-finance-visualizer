import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { Transaction } from '@/models/transaction';
import mongoose from 'mongoose';

interface RouteContext {
  params: {
    id: string;
  };
}

export async function DELETE(request: NextRequest, context: RouteContext) {
  try {
    const { id } = context.params;

    if (!mongoose.isValidObjectId(id)) {
      return NextResponse.json(
        { message: 'Invalid transaction ID' },
        { status: 400 }
      );
    }

    await connectDB();

    const deletedTransaction = await Transaction.findByIdAndDelete(id);

    if (!deletedTransaction) {
      return NextResponse.json(
        { message: 'Transaction not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: 'Transaction deleted successfully',
      data: deletedTransaction
    });
  } catch (error) {
    console.error('DELETE error:', error);
    return NextResponse.json(
      { message: 'Server Error', error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}