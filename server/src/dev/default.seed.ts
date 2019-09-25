import { User } from "../models/user.model";
import { getRepository } from "typeorm";
import logger from "../services/logger.service";

export async function seedDatabase() {
  const userRepository = await getRepository(User);

  logger.info("Seed database...");
}

const userSeed: User[] = [];
