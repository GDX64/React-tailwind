export default class Contact {
  constructor(
    public name: string,
    public lastName: string,
    public email: string,
    public id: number
  ) {}
}

export function makeFake() {
  return [
    new Contact("Gabriel", "Machado", "gadu.machado@gmail.com", 0),
    new Contact("Gabriel", "Machado", "gadu.machado@gmail.com", 1),
  ];
}
