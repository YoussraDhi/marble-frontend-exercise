import { useState } from "react";
import {
  BinaryOperator,
  commonBinaryOperators,
  stringBinaryOperators,
} from "../constants/binaryOperators";
import { STRING_VARIABLES, StringVariable } from "../constants/stringVariables";
import {
  NUMERIC_VARIABLES,
  NumericVariable,
} from "../constants/numericVariables";

type Variable = StringVariable | NumericVariable;

export function useFormulaValidation() {
  const [error, setError] = useState<string | null>(null);
  const [isValid, setIsValid] = useState<boolean>(false);

  const validateFormula = (
    variable: Variable,
    operator: BinaryOperator,
    value: string
  ) => {
    if (value === "") {
      setError("Value cannot be empty");
      setIsValid(false);
      return;
    }
    // If the binary operator does not support a left field of this type, display a warning
    if (stringBinaryOperators.includes(operator as any)) {
      if (!STRING_VARIABLES.includes(variable as any)) {
        // if it's a number variable
        {
          setError(
            `Invalid type for operator ${operator}: can't be applied to a value ${value} of type number on the left side`
          );
          setIsValid(false);
        }
        // if it's number value
        if (!isNaN(Number(value))) {
          setError(
            `Invalid type for operator ${operator}: can't be applied to a value ${value} of type number on the right side`
          );
          setIsValid(false);
        }
        return;
      }
      if (STRING_VARIABLES.includes(variable as any) && !isNaN(Number(value))) {
        setError(
          `Incompatible types for operator ${operator}: can’t be applied to a value ${variable} of type string on the left side and a value ${value} of type number on the right side `
        );
        setIsValid(false);
        return;
      }
    }

    if (
      STRING_VARIABLES.includes(variable as any) &&
      !isNaN(Number(value)) &&
      commonBinaryOperators.includes(operator as any)
    ) {
      setError(
        `Incompatible types for operator ${operator}: can’t be applied to a value ${variable} of type string on the left side and a value ${value} of type number on the right side `
      );
      setIsValid(false);
      return;
    }

    if (
      commonBinaryOperators.includes(operator as any) &&
      isNaN(Number(value))
    ) {
      if (STRING_VARIABLES.includes(variable as any) && operator === "=/=") {
        setError(
          `Incompatible type of operator ${operator}: can't be applied to a value of type string`
        );
        setIsValid(false);
        return;
      }
      if (NUMERIC_VARIABLES.includes(variable as any)) {
        setError(
          `Invalid type of value ${value} for operator ${operator}: can't be applied to a value of type number`
        );
        setIsValid(false);
        return;
      }
    }

    setError(null);
    setIsValid(true);
    return;
  };
  const resetError = () => {
    setError(null);
    setIsValid(false);
  };
  return { error, isValid, validateFormula, resetError };
}
