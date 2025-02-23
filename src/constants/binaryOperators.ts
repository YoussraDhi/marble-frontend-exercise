export const integerBinaryOperators = [">=", ">", "<=", "<"] as const;
export const stringBinaryOperators = ["is_close_match"] as const;
export const commonBinaryOperators = ["=", "=/="] as const;

export type IntegerBinaryOperator = (typeof integerBinaryOperators)[number];
export type StringBinaryOperator = (typeof stringBinaryOperators)[number];
export type CommonBinaryOperator = (typeof commonBinaryOperators)[number];

export type BinaryOperator =
  | IntegerBinaryOperator
  | StringBinaryOperator
  | CommonBinaryOperator;

export const binaryOperators = [
  ...integerBinaryOperators,
  ...stringBinaryOperators,
  ...commonBinaryOperators,
] as const;
