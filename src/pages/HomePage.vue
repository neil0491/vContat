<script setup lang="ts">
import { Teleport, computed, reactive, ref } from "vue";
import { storeToRefs } from "pinia";
import { useContactStore } from "@/stores/contact";

import { ROUTE_NAME } from "@/router/routeName";
import { tags } from "@/utils/constants";
import type { IContact } from "@/models/contact";
import FormContact from "@/components/FormContact.vue";
import { useContactFormError } from "@/composables/useContactFormError";

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
  email: "",
  name: "",
  phone: "",
  tags: []
});

const { errorInputs, handleErrorForms, handleError } = useContactFormError();

const updateData = (data: IContact) => {
  inputs.id = Date.now();
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

const addContact = () => {
  handleErrorForms(inputs);
  if (errorInputs.name || errorInputs.email || errorInputs.name) {
    return;
  }
  contactStore.addContact(inputs);
  showModal.value = false;
};

const cancel = () => {
  inputs.id = Date.now();
  inputs.name = "";
  inputs.email = "";
  inputs.phone = "";
  inputs.tags = [];
  showModal.value = false;
};
</script>

<template>
  <main>
    <div class="container max-w-screen-2xl px-4 mx-auto sm:px-8">
      <div class="py-8">
        <div class="flex flex-row justify-between w-full mb-1 sm:mb-0">
          <div
            class="flex flex-col justify-center space-y-3 md:flex-row md:w-full md:space-x-3 md:space-y-0"
          >
            <div class="relative w-full">
              <input v-model="search" type="text" placeholder="Поиск" class="input-search" />
            </div>
            <select v-model="contactStore.activeTag" class="filter-select">
              <option :value="tag" v-for="(tag, index) in tags" :key="index">{{ tag }}</option>
            </select>
            <button class="add-contact" @click="showModal = true">Добавить контакт</button>
          </div>
        </div>
        <div class="px-4 py-4 -mx-4 overflow-x-auto sm:-mx-8 sm:px-8">
          <div class="inline-block min-w-full overflow-hidden rounded-lg shadow">
            <table class="min-w-full leading-normal">
              <thead>
                <tr class="bg-green-700 text-gray-100 text-lg">
                  <th
                    scope="col"
                    class="px-5 py-3 font-normal text-left uppercase border-b border-gray-200"
                  >
                    Ф.И.О
                  </th>
                  <th
                    scope="col"
                    class="px-5 py-3 font-normal text-left uppercase border-b border-gray-200"
                  >
                    Номер телефона
                  </th>
                  <th
                    scope="col"
                    class="px-5 py-3 font-normal text-left uppercase border-b border-gray-200"
                  >
                    Email
                  </th>
                  <th
                    scope="col"
                    class="px-5 py-3 font-normal text-left uppercase border-b border-gray-200"
                  >
                    Teги
                  </th>
                  <th
                    scope="col"
                    class="px-5 py-3 font-normal text-left uppercase border-b border-gray-200"
                  ></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="contact in listContacts" :key="contact.id">
                  <td class="px-5 py-5 text-md border-b border-gray-200">
                    <p class="text-gray-900 whitespace-no-wrap">{{ contact.name }}</p>
                  </td>
                  <td class="px-5 py-5 text-md border-b border-gray-200">
                    <p class="text-gray-900 whitespace-no-wrap">{{ contact.phone }}</p>
                  </td>
                  <td class="px-5 py-5 text-md border-b border-gray-200">
                    <p class="text-gray-900 whitespace-no-wrap">{{ contact.email }}</p>
                  </td>
                  <td class="px-5 py-5 text-md border-b border-gray-200 w-60">
                    <div class="flex flex-wrap gap-2">
                      <span
                        v-for="tag in contact.tags"
                        :key="tag"
                        class="relative inline-block px-3 py-1 font-semibold leading-tight text-green-900"
                      >
                        <span
                          aria-hidden="true"
                          class="absolute inset-0 bg-green-200 rounded-full opacity-50"
                        >
                        </span>
                        <span class="relative"> {{ tag }} </span>
                      </span>
                    </div>
                  </td>
                  <td class="px-5 py-5 text-md border-b border-gray-200">
                    <RouterLink
                      :to="{ name: ROUTE_NAME.CONTACT_ID, params: { id: contact.id } }"
                      class="text-green-600 hover:text-green-900"
                    >
                      Редактировать
                    </RouterLink>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <Teleport to="body">
      <Transition name="slide-fade">
        <div
          class="absolute w-full left-0 top-0 bg-gray-500/50 min-h-full flex items-center"
          v-if="showModal"
        >
          <FormContact
            v-if="showModal"
            @error="handleError"
            :contact="inputs"
            @updateData="updateData"
            @updateTag="updateTag"
          >
            <button
              @click="addContact"
              type="submit"
              class="py-2 px-4 w-max bg-green-600 hover:bg-green-700 focus:ring-green-500 focus:ring-offset-green-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
            >
              Сохранить
            </button>
            <button
              @click="cancel"
              type="button"
              class="py-2 px-4 w-max bg-red-600 hover:bg-red-700 focus:ring-red-500 focus:ring-offset-red-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
            >
              Отмена
            </button>
          </FormContact>
        </div>
      </Transition>
    </Teleport>
  </main>
</template>

<style>
body{
  overflow-x: hidden;
}
.input-search {
  @apply rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent;
}

.add-contact {
  @apply flex-shrink-0 px-4 py-2 text-base font-semibold text-white bg-green-600 rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-green-200;
}

.filter-select {
  @apply block px-3 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm w-max;
}

.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.4s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>
