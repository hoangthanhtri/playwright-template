import { env } from "../../../config/env";
import { wait } from "./timing";

export const generateUniqueNumber = async () => {
  await wait(12);
  return `${env.SHARD_INDEX}-${Date.now()}`;
};
