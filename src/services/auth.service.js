// Dependencies
import bcrypt from 'bcrypt';
import { eq } from 'drizzle-orm';

// Constants
import { ERRORS } from '#constants/errors.js';
import { SUCCESS_MESSAGES } from '#constants/success_messages.js';

// Utils
import logger from '#config/logger.js';

// Database
import { db } from '#config/database.js';

// Schemas
import { users } from '#models/user.model.js';



export const hashPassword = async (password) => {
  try {
    return await bcrypt.hash(password, 10);
  } catch (error) {
    logger.error(`${ERRORS.ERROR_HASHING_PASSWORD} : ${error}`);
    throw new Error(ERRORS.ERROR_HASHING_PASSWORD);
  }
};

export const createUser = async ({name, email, password, role}) => {
  try {
    const existingUser = await db.select().from(users).where(eq(users.email, email)).limit(1);

    if (existingUser.length > 0) {
      throw new Error(ERRORS.USER_WITH_EMAIL_ALREADY_EXISTS);
    }

    const hashedPassword = await hashPassword(password);

    const [user] = await db.insert(users).values({ name, email, password: hashedPassword, role }).returning({
      id: users.id,
      name: users.name,
      email: users.email,
      role: users.role,
      createdAt: users.createdAt
    });

    logger.info(`${SUCCESS_MESSAGES.USER_CREATED} - ${email}`);
    return user;
  } catch (error) {
    logger.error(`${ERRORS.ERROR_CREATING_USER} : ${error}`);
    throw new Error(ERRORS.ERROR_CREATING_USER);
  }
};