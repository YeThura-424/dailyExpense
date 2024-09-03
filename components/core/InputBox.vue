<template>
  <div class="input-box-wrapper">
    <div class="input_label py-2" v-if="showLabel">
      <label class="text-xl font-medium">{{ label }}</label>
    </div>
    <div class="input-box relative">
      <input
        :value="modelValue"
        :type="inputType"
        :placeholder="placeholder"
        :class="inputClass"
        @input="updateValue"
      />

      <div
        class="show-password absolute right-4 top-1/2 -translate-y-1/2"
        v-if="type == 'password'"
      >
        <Icon
          @click="toggleShowPassword"
          :name="inputType == 'text' ? 'ion:eye-off-sharp' : 'ion:eye-sharp'"
          size="26"
          class="text-[#91919F] cursor-pointer"
        />
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
      "text-xl px-4 py-2 rounded-xl h-14 w-full focus:outline-none border border-[#91919F]",
  },
  placeholder: {
    type: String,
    default: "Please Type Something...",
  },
  modelValue: {
    type: String,
  },
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
