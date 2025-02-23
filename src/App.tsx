import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import FormulaBuilderForm from "./components/FormulaBuilderForm";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <FormulaBuilderForm />
    </>
  );
}

export default App;
