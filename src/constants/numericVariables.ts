export const NUMERIC_VARIABLES = [
  "transaction.amount",
  "transaction.account.balance",
  "transaction.account.max_transaction_amount_authorized",
];
export type NumericVariable = (typeof NUMERIC_VARIABLES)[number];
