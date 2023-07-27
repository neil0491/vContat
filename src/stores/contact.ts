import { defineStore } from "pinia";
import type { ActiveTagType, IContact } from "@/models/contact";
import { tags, users } from "@/utils/constants";

interface IContactStore {
  contacts: IContact[];
  activeTag: ActiveTagType;
}

export const useContactStore = defineStore("contact", {
  state: (): IContactStore => ({
    contacts: users,
    activeTag: tags[0]
  }),
  getters: {
    getContacts: (state): IContact[] | undefined => {
      for (const tag of tags) {
        if (tag == state.activeTag) {
          if (tag === tags[0]) {
            return state.contacts;
          } else {
            return state.contacts.filter((item) => item.tags?.includes(tag));
          }
        }
      }
    },
    getActiveTag: (state): ActiveTagType => state.activeTag
  },
  actions: {
    addContact(contact: IContact) {
      this.contacts = [...this.contacts, contact];
    },
    deleteContact(contact: IContact) {
      this.contacts = this.contacts.filter((c) => c.id !== contact.id);
    },
    updateContact(contact: IContact) {
      this.contacts = this.contacts.map((c) => {
        if (c.id === contact.id) {
          return contact;
        }
        return c;
      });
    }
  }
});
