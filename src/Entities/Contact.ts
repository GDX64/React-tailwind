export default class Contact {
  constructor(
    public name: string,
    public lastName: string,
    public email: string,
    public id: number
  ) {}
}

export const fieldsArr = [
  { field: "name", label: "name" },
  { field: "email", label: "email" },
] as {
  field: keyof Contact;
  label: string;
}[];

export function makeFake() {
  return [
    new Contact("Gabriel", "Machado", "gadu.machado@gmail.com", 0),
    new Contact("Gabriel", "Machado", "gadu.machado@gmail.com", 1),
  ];
}
