import type { IContact } from "@/models/contact";
import { checkEmail, validatePhoneNumber } from "@/utils/helpers/validate";
import { reactive, ref, type InputHTMLAttributes } from "vue";

export function useContactFormError() {
  const errorInputs = reactive({
    email: false,
    name: false,
    phone: false
  });

  const handleErrorForms = (inputs: IContact) => {
    if (!checkEmail(inputs.email)) {
      errorInputs.email = true;
      return;
    }
    if (!validatePhoneNumber(inputs.phone)) {
      errorInputs.phone = !validatePhoneNumber(inputs.phone);
    }
    errorInputs.name = inputs.name.length === 0;
  };

  const handleError = (e: boolean, type: InputHTMLAttributes["type"]) => {
    if (type === "text") {
      errorInputs.name = e;
    }
    if (type === "email") {
      errorInputs.email = e;
    }
    if (type === "phone") {
      errorInputs.phone = e;
    }
  };

  return {
    handleError,
    errorInputs,
    handleErrorForms
  };
}
