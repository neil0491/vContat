<script setup lang="ts">
import { reactive, ref } from "vue";
import { useContactFormError } from "@/composables/useContactFormError";
import type { IContact } from "@/models/contact";
import { useContactStore } from "@/stores/contact";
import FormContact from "./FormContact.vue";
import { useOnClickOutside } from "@/composables/useOnClickOutside";

const contactStore = useContactStore();

const showModal = ref(false);

const form = ref<HTMLFormElement | null>(null);

useOnClickOutside(form, () => {
  console.log("clic;");

  cancel();
});

const inputs = reactive<IContact>({
  id: Date.now(),
  email: "",
  name: "",
  phone: "",
  tags: []
});

const { errorInputs, handleErrorForms, handleError } = useContactFormError();

const addContact = () => {
  handleErrorForms(inputs);
  if (errorInputs.name || errorInputs.email || errorInputs.phone) {
    return;
  }
  const data: IContact = { ...inputs };
  contactStore.addContact(data);
  cancel();
};

const cancel = () => {
  inputs.id = Date.now();
  inputs.name = "";
  inputs.email = "";
  inputs.phone = "";
  inputs.tags = [];
  showModal.value = false;
};

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
</script>

<template>
  <div class="add-contact">
    <button @click="showModal = true">Добавить контакт</button>
    <Teleport to="body">
      <Transition name="slide-fade">
        <form
          @submit.prevent="addContact"
          class="fixed w-full left-0 top-0 bg-gray-500/50 min-h-full flex items-center"
          v-if="showModal"
        >
          <div class="container max-w-2xl mx-auto" ref="form">
            <FormContact
              v-if="showModal"
              @error="handleError"
              :contact="inputs"
              @updateData="updateData"
              @updateTag="updateTag"
            >
              <button
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
        </form>
      </Transition>
    </Teleport>
  </div>
</template>

<style scoped>
.add-contact {
  @apply flex-shrink-0 px-4 py-2 text-base font-semibold text-white bg-green-600 rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-green-200;
}
</style>
