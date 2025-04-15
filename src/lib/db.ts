import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) throw new Error('MONGODB_URI not set');

// Use 'any' to allow access to globalThis.mongoose
const globalAny = globalThis as any;

let cached = globalAny.mongoose || { conn: null, promise: null };

// Type the cached object and its properties
interface Cached {
  conn: mongoose.Connection | null;
  promise: Promise<mongoose.Connection> | null;
}

export async function connectDB() {
  if (cached.conn) return cached.conn;
  
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
    }).then((m) => m.connection);  // Explicitly using `.connection` to get a `mongoose.Connection`
  }
  
  cached.conn = await cached.promise;
  return cached.conn;
}
