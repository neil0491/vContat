<script lang="ts" setup>
import type { IContact } from "@/models/contact";
import { useContactStore } from "@/stores/contact";
import { storeToRefs } from "pinia";
import { computed, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const idContact = Number(route.params.id);

const contactStore = useContactStore();
const { getContacts } = storeToRefs(contactStore);

const contact = computed(() => getContacts.value?.find((contact) => contact.id === idContact));
const inputs = reactive<IContact>({
  id: Number(contact.value?.id),
  created: contact.value?.created || new Date(),
  email: contact.value?.email || "",
  name: contact.value?.name || "",
  phone: contact.value?.phone || "",
  tags: contact.value?.tags
});

const updateUser = () => {
  if (contact.value) {
    contactStore.updateContact({
      ...inputs
    });
  }
};
const deleteUser = () => {
  if (contact.value) {
    contactStore.deleteContact(contact.value);
    router.back();
  }
};
</script>

<template>
  <div class="about">
    <form @submit.prevent="updateUser">
      <input v-model="inputs.name" type="text" placeholder="name" />
      <input v-model="inputs.email" type="email" placeholder="email" />
      <input v-model="inputs.phone" type="phone" placeholder="phone" />
      <div v-for="tag in contact?.tags" :key="tag">{{ tag }}</div>

      <input type="submit" value="Update" />
      <button @click="deleteUser">Delete</button>
    </form>
    <br />
  </div>
</template>

<style></style>
