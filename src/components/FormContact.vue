<script setup lang="ts">
import type { IContact } from "@/models/contact";
import { tags } from "@/utils/constants";
import CustomeInput from "./CustomeInput.vue";
import type { InputHTMLAttributes } from "vue";

interface IProps {
  contact: IContact;
}
const props = defineProps<IProps>();

const emit = defineEmits<{
  (e: "updateData", value: IContact): void;
  (e: "updateTag", value: string): void;
  (e: "error", value: boolean, type: InputHTMLAttributes["type"]): void;
}>();

const updataData = (e: Event, key: string) => {
  //@ts-ignore
  emit("updateData", { ...props.contact, [key]: e.target.value });
};

const updateTag = (tag: string) => {
  emit("updateTag", tag);
};

const handleError = (e: boolean, type: InputHTMLAttributes["type"]) => {
  emit("error", e, type);
};
</script>

<template>
  <div class="container shadow-md">
    <div class="bg-white rounded-md p-4">
      <div class="items-center w-full p-4 text-gray-500 md:inline-flex">
        <p id="user-info-email" class="max-w-sm mx-auto md:w-1/3">Имя:</p>
        <div class="max-w-sm mx-auto md:w-2/3">
          <CustomeInput
            @error="handleError"
            :input="(e) => updataData(e, 'name')"
            :value="props.contact.name"
            placeholder="Введите Ф.И.О."
          />
        </div>
      </div>
      <div class="items-center w-full p-4 text-gray-500 md:inline-flex">
        <p id="user-info-email" class="max-w-sm mx-auto md:w-1/3">Email:</p>
        <div class="max-w-sm mx-auto md:w-2/3">
          <CustomeInput
            @error="handleError"
            :input="(e) => updataData(e, 'email')"
            :value="props.contact.email"
            type="email"
            placeholder="Введите Email"
          />
        </div>
      </div>
      <div class="items-center w-full p-4 text-gray-500 md:inline-flex">
        <p id="user-info-email" class="max-w-sm mx-auto md:w-1/3">Телефон:</p>
        <div class="max-w-sm mx-auto md:w-2/3">
          <CustomeInput
            @error="handleError"
            :input="(e) => updataData(e, 'phone')"
            :value="props.contact.phone"
            type="phone"
            placeholder="Введите Телефон"
          />
        </div>
      </div>

      <div class="items-center w-full p-4 text-gray-500 md:inline-flex">
        <p id="user-info-email" class="max-w-sm mx-auto md:w-1/3">Выберите группу:</p>
        <div class="max-w-sm mx-auto md:w-2/3">
          <div class="flex gap-4 flex-wrap">
            <span
              @click="() => updateTag(tag)"
              v-for="tag in tags"
              :key="tag"
              class="relative inline-block px-3 py-1 font-semibold leading-tight text-green-900 cursor-pointer"
            >
              <span
                v-if="props?.contact?.tags?.includes(tag)"
                aria-hidden="true"
                class="absolute inset-0 bg-green-200 rounded-full opacity-50"
              >
              </span>
              <span class="relative"> {{ tag }} </span>
            </span>
          </div>
        </div>
      </div>

      <hr class="mt-6" />
      <div class="mt-6 w-full px-4 pb-4 ml-auto text-gray-500 flex gap-4 justify-end">
        <slot></slot>
      </div>
    </div>
  </div>
</template>
