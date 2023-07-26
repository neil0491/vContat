export interface IContact {
  id: number;
  name: string;
  phone: string;
  email: string;
  tags?: TagsContactType[];
}

export type TagsContactType = string;
export type ActiveTagType = TagsContactType | "Все";
