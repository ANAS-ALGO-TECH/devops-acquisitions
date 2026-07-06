// Config
import logger from '#config/logger.js';

// Validations
import { signUpSchema } from '#validations/auth.validation.js';

// Constants
import { ERRORS } from '#constants/errors.js';
import { SUCCESS_MESSAGES } from '#constants/success_messages.js';

// Utils
import { formatErrors } from '#utils/validations.js';

// Services
import { createUser } from '#services/auth.service.js';
import { jwtToken } from '#utils/jwt.js';
import { cookies } from '#utils/cookies.js';


export const signUp = async (req, res, next) => {
  try {
    const validationResult = signUpSchema.safeParse(req.body);

    if (!validationResult.success) {
      return res.status(400).json({ error: ERRORS.VALIDATION_FAILED, details: formatErrors(validationResult.error) });
    }

    const { name, email, password, role } = validationResult.data;

    const user = await createUser({ name, email, password, role });

    const token = jwtToken.sign({ id: user.id, name: user.name, email: user.email, role: user.role });

    cookies.set(res, 'token', token);

    logger.info(`${SUCCESS_MESSAGES.USER_CREATED} - ${email}`);
    res.status(201).json({
      message: SUCCESS_MESSAGES.USER_CREATED, user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      }
    });
  } catch (error) {
    logger.error(ERRORS.SIGN_UP_ERROR, error);

    if (error.message === ERRORS.USER_WITH_EMAIL_ALREADY_EXISTS) {
      return res.status(409).json({ error: ERRORS.USER_WITH_EMAIL_ALREADY_EXISTS });
    }

    next(error);
  }
};

export const signIn = async (req, res) => {
  try {
    // const { email, password } = signInSchema.parse(req.body);
    logger.info('Sign in controller');
  } catch (error) {
    logger.error(error);
    return res.status(400).json({ error: formatErrors(error) });
  }
  res.status(200).json({ message: 'User signed up' });
};

export const signOut = async (req, res) => {
  try {
    logger.info('Sign out controller');

  } catch (error) {
    logger.error(error);
    return res.status(400).json({ error: formatErrors(error) });
  }
  res.status(200).json({ message: 'User signed out' });
};