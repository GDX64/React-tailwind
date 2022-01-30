import "./App.css";
import { ContractsTable } from "./components/ContractRow";
import { makeFake } from "./Entities/Contract";

function App() {
  return (
    <div className="App flex flex-col items-center">
      <ContractsTable contracts={makeFake()}></ContractsTable>
    </div>
  );
}

export default App;
