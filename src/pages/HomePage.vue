<script setup lang="ts">
import { Teleport, computed, reactive, ref } from "vue";
import { storeToRefs } from "pinia";
import { useContactStore } from "@/stores/contact";

import { ROUTE_NAME } from "@/router/routeName";
import { tags } from "@/utils/constants";
import type { IContact } from "@/models/contact";

const contactStore = useContactStore();
const { getContacts } = storeToRefs(contactStore);

const showModal = ref(false);

const search = ref("");

const listContacts = computed(() => {
  if (search.value.length > 0) {
    return getContacts.value?.filter((contact) => {
      if (
        contact.name.toLocaleLowerCase().indexOf(search.value.toLocaleLowerCase()) !== -1 ||
        contact.email.toLocaleLowerCase().indexOf(search.value.toLocaleLowerCase()) !== -1 ||
        contact.phone?.toLocaleLowerCase().indexOf(search.value.toLocaleLowerCase()) !== -1
      ) {
        return contact;
      }
    });
  }
  return getContacts.value;
});

const inputs = reactive<IContact>({
  id: Date.now(),
  created: new Date(),
  email: "",
  name: "",
  phone: ""
});

const addContact = () => {
  contactStore.addContact(inputs);
  showModal.value = false;
};
</script>

<template>
  <main>
    <button @click="showModal = true">Add Contact</button>
    <input v-model="search" type="text" placeholder="Поиск по имени" />
    <select v-model="contactStore.activeTag">
      <option :value="tag" v-for="(tag, index) in tags" :key="index">{{ tag }}</option>
    </select>
    <ul>
      <li v-for="contact in listContacts" :key="contact.id">
        <RouterLink :to="{ name: ROUTE_NAME.CONTACT_ID, params: { id: contact.id } }">
          <div>
            {{ contact.name }}
          </div>
          <div>{{ contact.phone }}</div>
          <div>{{ contact.email }}</div>
          <div>{{ contact.tags }}</div>
        </RouterLink>
      </li>
    </ul>
    <Teleport to="body">
      <div v-if="showModal">
        <h1>Teleport Modal</h1>
        <p>Lorem ipsum dolor sit amet.</p>
        <input v-model="inputs.name" type="text" placeholder="name" />
        <input v-model="inputs.email" type="email" placeholder="email" />
        <input v-model="inputs.phone" type="phone" placeholder="phone" />
        <button @click="addContact">Add</button>
      </div>
    </Teleport>
  </main>
</template>
