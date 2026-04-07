import mongoose from 'mongoose';

let connectionAttempt: Promise<void> | null = null;

export const connectDB = async () => {
  const uri = process.env.MONGODB_URI || '';
  if (!uri) {
    throw new Error('MONGODB_URI is not set in environment variables');
  }

  // Already connected
  if (mongoose.connection.readyState === 1) {
    return;
  }

  // If a connection attempt is in progress, wait for it
  if (connectionAttempt) {
    return connectionAttempt;
  }

  // Set timeouts BEFORE attempting connection
  mongoose.set('serverSelectionTimeoutMS', 3000);
  mongoose.set('socketTimeoutMS', 3000);
  mongoose.set('connectTimeoutMS', 3000);

  connectionAttempt = (async () => {
    try {
      const connectPromise = mongoose.connect(uri, {
        retryWrites: false,
      });

      // Wrap in a race to guarantee 4 second total timeout
      await Promise.race([
        connectPromise,
        new Promise<never>((_, reject) =>
          setTimeout(() => reject(new Error('MongoDB connection timeout')), 4000)
        ),
      ]);
    } catch (error) {
      console.error('MongoDB connection error:', error);
      connectionAttempt = null;
      throw error;
    }
  })();

  return connectionAttempt;
};
