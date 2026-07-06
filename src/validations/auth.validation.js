// Dependencies
import { z } from 'zod';

// Constants
import { ROLES } from '#constants/enums.js';

export const signUpSchema = z.object({
  name: z.string().min(3).max(255).trim(),
  email: z.string().email().toLowerCase().trim(),
  password: z.string().min(6).max(150),
  role: z.enum(ROLES).default(ROLES.USER),
});

export const signInSchema = z.object({
  email: z.string().email().toLowerCase().trim(),
  password: z.string().min(6).max(150),
});