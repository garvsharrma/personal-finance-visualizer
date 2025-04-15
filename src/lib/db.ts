import mongoose, { Connection } from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) throw new Error('MONGODB_URI not set');

// Safely cast globalThis to the correct type
const globalAny = globalThis as unknown as { mongoose: { conn: Connection | null; promise: Promise<Connection> | null } };

const cached = globalAny.mongoose || { conn: null, promise: null };

// Update the `connectDB` function
export async function connectDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
    }).then((m) => m.connection); // Ensure we use `.connection` for the `Connection` type
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
