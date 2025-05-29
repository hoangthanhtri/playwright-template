import { z } from "zod";
import dotenv from "dotenv";
dotenv.config();
// Define a schema for the environment configuration
export const env = z
  .object({
    ENV: z.string().default("dev"),
    BASE_URL: z.string().default("https://opensource-demo.orangehrmlive.com/"),
    CI: z.string().optional(),
    PLAYWRIGHT_TIMEOUT: z.coerce.number().default(300000),
    PLAYWRIGHT_EXPECT_TIMEOUT: z.coerce.number().default(30000),
    PLAYWRIGHT_WORKERS: z.coerce.number().default(1),
    SHARD_INDEX: z.coerce.number().default(1),
    DEFAULT_PASSWORD: z.string(),
  })
  .parse(process.env);
