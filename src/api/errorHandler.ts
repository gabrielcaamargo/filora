const errorMessageMapper: Record<string, string> = {
  "auth/email-already-in-use": "Email já em uso",
  "auth/user-disabled": "Sua conta foi desativada",
};

/**
 * Extracts Firebase error code from error message and returns user-friendly message
 *
 * @param errorMessage - Firebase error message (e.g., "[auth/email-already-in-use] The email address is already in use by another account.")
 * @returns User-friendly error message in Portuguese
 *
 * @example
 * ```typescript
 * const error = "[auth/email-already-in-use] The email address is already in use by another account.";
 * const message = errorHandler(error);
 * // Returns: "Este email já está sendo usado por outra conta"
 * ```
 */
export function errorHandler(errorMessage: string): string {
  const match = errorMessage.match(/\[([^\]]+)\]/);
  const errorCode = match ? match[1] : errorMessage;

  return errorMessageMapper[errorCode] || "Um erro desconhecido ocorreu";
}
