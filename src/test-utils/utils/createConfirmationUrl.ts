import { v4 } from "uuid";
import { redis } from "../../redis";
import { confrimationPrefix } from "../../modules/constants/redisPrefixies";

export const createConfirmationUrl = async (userId: string) => {
  const token = v4();
  await redis.set(confrimationPrefix + token, userId, "ex", 60 * 60 * 24); // 1 day expiration

  return `http://localhost:3000/user/confirm/${token}`;
};
