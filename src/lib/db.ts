import mongoose, { Connection } from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) throw new Error('MONGODB_URI not set');

interface GlobalWithMongoose {
  mongoose: {
    conn: Connection | null;
    promise: Promise<Connection> | null;
  };
}

const cached = (globalThis as unknown as Partial<GlobalWithMongoose>).mongoose || {
  conn: null,
  promise: null,
};

export async function connectDB(): Promise<Connection> {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
    }).then((m) => m.connection);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}