// Constants
import { ERRORS } from '#constants/errors.js';

export const formatErrors = (errors) => {
  if (!errors || !errors.issues) return ERRORS.VALIDATION_FAILED;

  if (Array.isArray(errors.issues)) return errors.issues.map((i) => i.message).join(', ');

  return JSON.stringify(errors);

};