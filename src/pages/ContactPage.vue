<script lang="ts" setup>
import FormContact from "@/components/FormContact.vue";
import { useContactFormError } from "@/composables/useContactFormError";
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
  email: contact.value?.email || "",
  name: contact.value?.name || "",
  phone: contact.value?.phone || "",
  tags: contact.value?.tags
});

const { errorInputs, handleErrorForms, handleError } = useContactFormError();

const updateUser = () => {
  handleErrorForms(inputs);
  if (errorInputs.name || errorInputs.email || errorInputs.name) {
    return;
  }

  if (contact.value) {
    contactStore.updateContact({
      ...inputs
    });
    router.back();
  }
};
const deleteUser = () => {
  if (contact.value) {
    contactStore.deleteContact(contact.value);
    router.back();
  }
};

const updateData = (data: IContact) => {
  inputs.name = data.name;
  inputs.email = data.email;
  inputs.phone = data.phone;
};

const updateTag = (tag: string) => {
  if (inputs.tags?.includes(tag)) {
    inputs.tags = inputs.tags.filter((t) => t !== tag);
  } else {
    inputs.tags?.push(tag);
  }
};
</script>

<template>
  <div class="about flex justify-center align-center min-h-full mt-20">
    <FormContact
      @error="handleError"
      :contact="inputs"
      @updateData="updateData"
      @updateTag="updateTag"
    >
      <button
        @click="updateUser"
        type="submit"
        class="py-2 px-4 w-max bg-green-600 hover:bg-green-700 focus:ring-green-500 focus:ring-offset-green-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
      >
        Сохранить
      </button>
      <button
        @click="deleteUser"
        type="button"
        class="py-2 px-4 w-max bg-red-600 hover:bg-red-700 focus:ring-red-500 focus:ring-offset-red-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
      >
        Удалить
      </button>
    </FormContact>

    <!-- <form @submit.prevent="updateUser">
      <input v-model="inputs.name" type="text" placeholder="name" />
      <input v-model="inputs.email" type="email" placeholder="email" />
      <input v-model="inputs.phone" type="phone" placeholder="phone" />
      <div v-for="tag in contact?.tags" :key="tag">{{ tag }}</div>

      <input type="submit" value="Update" />
      <button @click="deleteUser">Delete</button>
    </form> -->
    <br />
  </div>
</template>

<style></style>
