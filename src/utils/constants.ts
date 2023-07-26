import type { ActiveTagType, IContact } from "@/models/contact";

export const users: IContact[] = [
  {
    id: 123456789,
    created: new Date("2023-07-26T00:45:00PST"),
    name: "John Doe",
    phone: "123-456-7890",
    email: "john.doe@example.com",
    tags: ["Семья", "Работа"]
  },
  {
    id: 987654321,
    created: new Date("2023-07-25T12:34:00PST"),
    name: "Jane Doe2",
    phone: "456-789-1234",
    email: "jane.doe@example.com",
    tags: ["Семья"]
  },
  {
    id: 334534534,
    created: new Date("2023-07-24T08:34:00PST"),
    name: "Mary Smith",
    phone: "754-345-4321",
    email: "mary.smith@example.com",
    tags: ["Работа"]
  },
  {
    id: 657854321,
    created: new Date("2023-07-23T16:24:00PST"),
    name: "Peter Jones",
    phone: "876-543-4567",
    email: "peter.jones@example.com",
    tags: ["Избранные"]
  },
  {
    id: 243253453,
    created: new Date("2023-07-22T21:14:00PST"),
    name: "Susan Brown",
    phone: "543-243-2145",
    email: "susan.brown@example.com",
    tags: ["Другие"]
  },
  {
    id: 943543534,
    created: new Date("2023-07-21T04:04:00PST"),
    name: "David Williams",
    phone: "943-543-2156",
    email: "david.williams@example.com",
    tags: ["Работа"]
  }
];

export const tags: ActiveTagType[] = ["Все", "Другие", "Избранные", "Работа", "Семья"];
