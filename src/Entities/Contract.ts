export default class Contract {
  constructor(
    public name: string,
    public lastName: string,
    public email: string,
    public id: number
  ) {}
}

export function makeFake() {
  return [new Contract("Gabriel", "Machado", "gadu.machado@gmail.com", 0)];
}
