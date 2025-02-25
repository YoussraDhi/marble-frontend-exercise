import React, { useState } from "react";
import { BinaryOperator, binaryOperators } from "../constants/binaryOperators";
import { STRING_VARIABLES, StringVariable } from "../constants/stringVariables";
import {
  NUMERIC_VARIABLES,
  NumericVariable,
} from "../constants/numericVariables";
import { useFormulaValidation } from "../hooks/useFormulaValidation";

export default function FormulaBuilderForm() {
  const [variable, setVariable] = useState<StringVariable | NumericVariable>(
    "transaction.sender.last_name" // default to string variable
  );
  const [operator, setOperator] = useState<BinaryOperator>("="); // default to common operator
  const [value, setValue] = useState<string>("");
  const { error, isValid, validateFormula, resetError } =
    useFormulaValidation();

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    validateFormula(variable, operator, value);
  };

  return (
    <>
      <form onSubmit={handleFormSubmit} className="flex flex-col gap-4">
        <h1>Formula Builder</h1>
        <div className="flex flex-row gap-4">
          <label className="flex gap-2 items-center">
            Variable:
            <select
              value={variable}
              className="border border-gray-300 rounded-md p-1.5"
              onChange={(e) => {
                setVariable(e.target.value as StringVariable | NumericVariable);
                setValue("");
                resetError();
              }}
            >
              {STRING_VARIABLES.map((variable) => (
                <option key={variable} value={variable}>
                  {variable}
                </option>
              ))}
              {NUMERIC_VARIABLES.map((variable) => (
                <option key={variable} value={variable}>
                  {variable}
                </option>
              ))}
            </select>
          </label>
          <label className="flex gap-2 items-center">
            Operator:
            <select
              className="border border-gray-300 rounded-md p-1.5"
              value={operator}
              onChange={(e) => {
                setOperator(e.target.value as BinaryOperator);
                resetError();
              }}
            >
              {binaryOperators.map((op) => (
                <option key={op} value={op}>
                  {op}
                </option>
              ))}
            </select>
          </label>
          <label className="flex gap-2 items-center">
            Value:
            <input
              className="border border-gray-300 rounded-md p-1.5"
              type="text"
              value={value ?? ""}
              placeholder="Enter value"
              onChange={(e) => {
                setValue(e.target.value);
                resetError();
              }}
            />
          </label>
          <button
            type="submit"
            className="rounded-md p-1 h-10 items-center align-middle flex"
          >
            Validate
          </button>
        </div>

        <input type="submit" hidden={true} />
        {error && <span className=" text-red-600 font-medium">{error}</span>}

        {isValid && (
          <span className=" text-green-600 font-medium">
            ✓ Formula is Valid
          </span>
        )}
      </form>
    </>
  );
}
