import { PrismaClient } from "@prisma/client";
import { env } from "@/env";


const createPrismaClient = () => {
  // Parse DATABASE_URL to add connection pooling parameters if not present
  const databaseUrl = new URL(env.DATABASE_URL);
  
  // Add connection pooling parameters if not already present
  if (!databaseUrl.searchParams.has('connection_limit')) {
    databaseUrl.searchParams.set('connection_limit', '10');
  }
  if (!databaseUrl.searchParams.has('pool_timeout')) {
    databaseUrl.searchParams.set('pool_timeout', '10');
  }
  if (!databaseUrl.searchParams.has('statement_cache_size')) {
    databaseUrl.searchParams.set('statement_cache_size', '0');
  }

  return new PrismaClient({
    datasources: {
      db: {
        url: databaseUrl.toString(),
      },
    },
    log: env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });
};

const globalForPrisma = globalThis as unknown as {
  prisma: ReturnType<typeof createPrismaClient> | undefined;
};

export const db = globalForPrisma.prisma ?? createPrismaClient();

// Ensure proper cleanup in development
if (env.NODE_ENV !== "production") {
  globalForPrisma.prisma = db;
  
  // Handle process termination for proper cleanup
  const cleanup = () => {
    void db.$disconnect();
  };
  
  process.on('beforeExit', cleanup);
  process.on('SIGINT', () => {
    cleanup();
    process.exit(0);
  });
  process.on('SIGTERM', () => {
    cleanup();
    process.exit(0);
  });
}
