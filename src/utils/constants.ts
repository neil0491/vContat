import type { ActiveTagType, IContact } from "@/models/contact";

export const users: IContact[] = [
  {
    id: 123456789,
    name: "John Doe",
    phone: "123-456-7890",
    email: "john.doe@example.com",
    tags: ["Семья", "Работа"]
  },
  {
    id: 987654321,
    name: "Jane Doe2",
    phone: "456-789-1234",
    email: "jane.doe@example.com",
    tags: ["Семья"]
  },
  {
    id: 334534534,
    name: "Mary Smith",
    phone: "754-345-4321",
    email: "mary.smith@example.com",
    tags: ["Работа"]
  },
  {
    id: 657854321,
    name: "Peter Jones",
    phone: "876-543-4567",
    email: "peter.jones@example.com",
    tags: ["Избранные"]
  },
  {
    id: 243253453,
    name: "Susan Brown",
    phone: "543-243-2145",
    email: "susan.brown@example.com",
    tags: ["Другие"]
  },
  {
    id: 943543534,
    name: "David Williams",
    phone: "943-543-2156",
    email: "david.williams@example.com",
    tags: ["Работа"]
  }
];

export const tags: ActiveTagType[] = ["Все теги", "Другие", "Избранные", "Работа", "Семья"];
