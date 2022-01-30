import Contract from "../Entities/Contract";
function ContractRow({ contract }: { contract: Contract }) {
  return (
    <div className="">
      <div className="">{contract.name}</div>
      <div className="">{contract.email}</div>
    </div>
  );
}

export function ContractsTable({ contracts = [] as Contract[] }) {
  return (
    <div className="">
      {contracts.map((contract) => (
        <ContractRow contract={contract} key={contract.id}></ContractRow>
      ))}
    </div>
  );
}
