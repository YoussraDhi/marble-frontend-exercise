export const STRING_VARIABLES = [
  "transaction.sender.last_name",
  "transaction.receiver.last_name",
  "transaction.account.owner.last_name",
];
export type StringVariable = (typeof STRING_VARIABLES)[number];
