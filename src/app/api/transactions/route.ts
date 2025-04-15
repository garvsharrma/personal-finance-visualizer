import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { Transaction } from '@/models/transaction';

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();

    const { amount, date, description, category } = body;

    if (!amount || !date || !description || !category) {
      return NextResponse.json({ message: 'Missing fields' }, { status: 400 });
    }

    const newTransaction = await Transaction.create({ amount, date, description, category });
    return NextResponse.json(newTransaction, { status: 201 });
  } catch (error) {
    console.error('POST error:', error);
    return NextResponse.json({ message: 'Server Error' }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectDB();
    const transactions = await Transaction.find().sort({ createdAt: -1 });
    return NextResponse.json(transactions);
  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json({ message: 'Server Error' }, { status: 500 });
  }
}
