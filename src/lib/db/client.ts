import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

function getConnectionString(): string {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error(
      "DATABASE_URL is not set. Please add it to .env.local\n" +
        "Example: DATABASE_URL=postgresql://postgres:[password]@db.[project].supabase.co:5432/postgres",
    );
  }
  return url;
}

// Connection for queries (pooled, long-lived)
const queryClient = postgres(getConnectionString(), {
  max: 10,
  idle_timeout: 20,
  connect_timeout: 10,
});

export const db = drizzle(queryClient, { schema });

// Connection for migrations (single, non-pooled)
export function getMigrationClient() {
  return postgres(getConnectionString(), { max: 1 });
}
