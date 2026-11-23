<template>
  <div class="input-box-wrapper">
    <div class="input_label py-2" v-if="showLabel">
      <label class="text-xl font-medium">{{ label }}</label>
    </div>
    <div class="input-box relative">
      <input :value="modelValue" :type="inputType" :placeholder="placeholder" :class="inputClass" @input="updateValue"
        :disabled="disabled" :aria-label="showLabel ? label : placeholder" />

      <div class="show-password absolute right-4 top-1/2 -translate-y-1/2" v-if="type == 'password'">
        <button type="button" :aria-label="inputType === 'text' ? 'Hide password' : 'Show password'" class="flex items-center justify-center text-[#91919F]" @click="toggleShowPassword"><Icon :name="inputType == 'text' ? 'ion:eye-off-sharp' : 'ion:eye-sharp'" size="22" /></button>
      </div>
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  label: {
    type: String,
    required: false,
    default: "Label",
  },
  type: {
    type: String,
    default: "text",
  },
  showLabel: {
    type: Boolean,
    default: false,
  },
  labelClass: {
    type: String,
    default: "",
  },
  inputClass: {
    type: String,
    default:
      "text-base px-4 py-3 rounded-xl h-[52px] w-full bg-white text-[#292B2D] placeholder:text-[#91919F] focus:outline-none focus:ring-2 focus:ring-[#7F3DFF]/20 focus:border-[#7F3DFF] border border-[#E3E5E5] transition-colors",
  },
  placeholder: {
    type: String,
    default: "Please Type Something...",
  },
  modelValue: {
    type: [String, Number],
  },
  disabled: {
    type: Boolean,
    default: false
  }
});
const emit = defineEmits(["update:modelValue"]);
const inputType = ref(props.type);

const updateValue = (e) => {
  emit("update:modelValue", e.target.value);
};

const toggleShowPassword = () => {
  inputType.value = inputType.value == "text" ? "password" : "text";
};
</script>
