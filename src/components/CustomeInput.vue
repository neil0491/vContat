<script setup lang="ts">
import { checkEmail, validatePhoneNumber } from "@/utils/helpers/validate";
import { ref, watch, type InputHTMLAttributes } from "vue";

interface IPropsInput {
  type?: InputHTMLAttributes["type"];
  value: string;
  input: ((payload: Event) => void) | undefined;
  placeholder: string;
}

const emit = defineEmits<{
  (e: "error", value: boolean, type: InputHTMLAttributes["type"]): void;
}>();

const props = withDefaults(defineProps<IPropsInput>(), {
  type: "text",
  placeholder: ""
});

const error = ref(false);

const blur = () => {
  if (props.type === "email") {
    error.value = !checkEmail(props.value);
    emit("error", error.value, "email");
    return;
  }
  if (props.type === "phone") {
    error.value = !validatePhoneNumber(props.value);
    emit("error", error.value, "phone");
    return;
  }
  if (props.value.length == 0) {
    error.value = true;
  } else {
    error.value = false;
  }
  emit("error", error.value, "text");
};

const focus = () => {
  if (props.type === "email") {
    error.value = !checkEmail(props.value);
  }
  if (props.type === "phone") {
    error.value = !validatePhoneNumber(props.value);
  }
  if (props.value.length == 0) {
    error.value = true;
  } else {
    error.value = false;
  }
  emit("error", error.value, "text");
};

watch(
  () => props.value,
  () => {
    blur();
  }
);
</script>

<template>
  <div class="relative">
    <input
      @focus="focus"
      @input="input"
      @blur="blur"
      :value="props.value"
      :type="props.type"
      class="input"
      :class="{ error: error }"
      :placeholder="props.placeholder"
    />
  </div>
</template>

<style scoped>
.input {
  @apply rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent;
}

.error {
  @apply border-red-400;
}
</style>
