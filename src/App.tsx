import { useState } from "react";
import "./App.css";
import { ContractsTable } from "./components/ContractRow";
import Contract, { makeFake } from "./Entities/Contract";

const store = {
  contracts: makeFake(),
};

function updateContracts(contract: Contract) {
  console.log(contract);
  const index = store.contracts.findIndex(
    (element) => element.id === contract.id
  );
  if (index !== -1) {
    store.contracts[index] = contract;
  }
  return { ...store };
}

function App() {
  const [state, updateState] = useState(store);
  return (
    <div className="App flex flex-col items-center">
      <ContractsTable
        contracts={state.contracts}
        onChange={(contract) => updateState(updateContracts(contract))}
      ></ContractsTable>
    </div>
  );
}

export default App;
