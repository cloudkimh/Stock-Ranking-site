import Redis from 'ioredis';

const redis = new Redis(process.env.REDIS_URL);

// Log successful connection
redis.on('connect', () => {
  console.log('🔌 Redis connection established');
});

// Log when Redis is fully ready to use
redis.on('ready', () => {
  console.log('✅ Redis is ready to accept commands');
});

// Log errors
redis.on('error', (err) => {
  console.error('❌ Redis connection error:', err);
});

// Optional: reconnect attempts
redis.on('reconnecting', () => {
  console.warn('♻️  Redis reconnecting...');
});

export default redis;
