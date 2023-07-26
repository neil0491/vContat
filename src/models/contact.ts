export interface IContact {
  id: number;
  created: Date;
  name: string;
  phone: string;
  email: string;
  tags?: TagsContactType[];
}

export type TagsContactType = "Семья" | "Работа" | "Избранные" | "Другие";
export type ActiveTagType = TagsContactType | "Все";
