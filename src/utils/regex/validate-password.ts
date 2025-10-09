// src/utils/regex/validate-password.ts
export const ONEUPPER_REGEXP = /^(?=.*?[A-Z])/;
export const ONELOWER_REGEXP = /^(?=.*?[a-z])/;
export const ONENUMBER_REGEXP = /^(?=.*?[0-9])/;
export const LEAST6_REGEXP = /^.{6,}$/;
export const NOSPACE_REGEXP = /^[^\s]*$/;
export const SPECIAL_CHAR_REGEXP = /[^A-Za-z0-9]/;
