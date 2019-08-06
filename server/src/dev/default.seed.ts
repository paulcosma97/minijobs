import { User } from "../models/user.model";
import { getRepository } from "typeorm";

export async function seedDatabase() {
    const userRepository = await getRepository(User);

    console.log('Seed database...')
}

const userSeed: User[] = [
]