export default class Contact {
  constructor(
    public name: string,
    public lastName: string,
    public email: string,
    public phone: string,
    public id: number,
    public image: string | null
  ) {}
}

export const fieldsArr = [
  { field: "name", label: "name" },
  { field: "phone", label: "phone" },
  { field: "email", label: "email" },
] as {
  field: "name" | "phone" | "email";
  label: string;
}[];

export function makeFake() {
  return [
    new Contact(
      "Gabriel",
      "Machado",
      "gadu.machado@gmail.com",
      "122345678",
      0,
      null
    ),
    new Contact(
      "Gabriel",
      "Machado",
      "gadu.machado@gmail.com",
      "122345678",
      1,
      null
    ),
  ];
}
