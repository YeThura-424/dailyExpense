<template>
  <div class="select-box-wrapper w-full">
    <div v-if="showAmount && amount != null" class="select-hint"><span>Wallet balance</span><strong>{{ formatAmount(amount) }}</strong></div>
    <div v-if="showBudget && budget != null" class="select-hint"><span>Budget remaining</span><strong>{{ formatAmount(budget) }}</strong></div>
    <ul v-if="multiple && selected.length" class="selected-chips" aria-label="Selected options">
      <li v-for="option in selected" :key="identity(option)"><span>{{ option[optionValue] }}</span><button type="button" :aria-label="`Remove ${option[optionValue]}`" :disabled="disabled" @click="removeOption(option)"><Icon name="ion:close" /></button></li>
    </ul>
    <Combobox v-slot="{ open }" :model-value="selected" :multiple="multiple" :by="sameOption" :disabled="disabled" @update:model-value="selectOption">
      <div class="search-select">
        <div ref="control" class="search-select-control" :class="{ 'is-open': open, 'is-disabled': disabled }">
          <ComboboxInput class="search-select-input" :display-value="displayValue" :placeholder="placeholder" :aria-label="name || placeholder" :readonly="!searchable" autocomplete="off" @change="query = $event.target.value" @click="openOptions(open)" />
          <ComboboxButton ref="toggleButton" class="search-select-toggle" @click="query = ''" :aria-label="`Choose ${name || 'an option'}`"><Icon name="ion:chevron-down" :class="{ 'rotate-180': open }" /></ComboboxButton>
        </div>
        <Transition @before-enter="positionOptions" leave-active-class="transition duration-100 ease-in" leave-from-class="opacity-100" leave-to-class="opacity-0">
          <ComboboxOptions class="search-select-options" :style="menuStyle">
            <li class="select-search-caption"><Icon name="ion:search-outline" /><span>{{ searchable ? 'Type in the field to search' : 'Choose an option' }}</span><span v-if="query" class="ml-auto">{{ filteredOptions.length }} found</span></li>
            <ComboboxOption v-for="option in filteredOptions" :key="identity(option)" v-slot="{ active, selected: checked }" :value="option" as="template">
              <li :class="['search-select-option', { 'is-highlighted': active, 'is-selected': checked }]">
                <img v-if="showIcon && option.icon" :src="option.icon" alt="" class="select-option-icon" />
                <span class="min-w-0 flex-1 truncate">{{ option[optionValue] }}</span><Icon v-if="checked" name="ion:checkmark" class="shrink-0 text-[#7F3DFF]" />
              </li>
            </ComboboxOption>
            <li v-if="!filteredOptions.length" class="select-no-results" role="status"><Icon name="ion:search-outline" /><span>{{ query ? `No results for “${query}”` : 'No options available' }}</span><small v-if="query">Try a different search.</small></li>
          </ComboboxOptions>
        </Transition>
      </div>
    </Combobox>
  </div>
</template>

<script setup>
import { Combobox, ComboboxInput, ComboboxButton, ComboboxOptions, ComboboxOption } from '@headlessui/vue';
const props = defineProps({
  searchable: { type: Boolean, default: true },
  options: { type: Array, default: () => [] },
  optionKey: { type: String, default: null },
  optionValue: { type: String, default: 'name' },
  placeholder: { type: String, default: 'Select an option' },
  name: { type: String, default: '' },
  showAmount: { type: Boolean, default: false },
  showBudget: { type: Boolean, default: false },
  showIcon: { type: Boolean, default: false },
  modelValue: { type: [Object, String, Number, Array], default: '' },
  multiple: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
});
const emit = defineEmits(['update:modelValue']);
const query = ref('');
const toggleButton = ref(null);
const control = ref(null);
const menuStyle = ref({});
const positionOptions = () => {
  const rect = control.value?.getBoundingClientRect();
  if (!rect || !control.value.classList.contains('is-open')) return;
  const viewport = window.visualViewport;
  const bottomEdge = viewport ? viewport.offsetTop + viewport.height : window.innerHeight;
  const below = bottomEdge - rect.bottom - 16;
  const above = rect.top - (viewport?.offsetTop || 0) - 16;
  const openAbove = below < 240 && above > below;
  menuStyle.value = {
    top: openAbove ? 'auto' : 'calc(100% + 8px)',
    bottom: openAbove ? 'calc(100% + 8px)' : 'auto',
    maxHeight: `${Math.max(100, Math.min(288, openAbove ? above : below))}px`,
  };
};
onMounted(() => {
  window.addEventListener('resize', positionOptions);
  window.addEventListener('scroll', positionOptions, true);
});
onBeforeUnmount(() => {
  window.removeEventListener('resize', positionOptions);
  window.removeEventListener('scroll', positionOptions, true);
});
const identity = option => option?.[props.optionKey || 'id'] ?? option?.value ?? option?.[props.optionValue];
const sameOption = (a, b) => a != null && b != null && identity(a) === identity(b);
const findOption = value => props.optionKey ? props.options.find(option => option[props.optionKey] === value) : props.options.find(option => sameOption(option, value)) || value;
const selected = computed(() => props.multiple
  ? (Array.isArray(props.modelValue) ? props.modelValue.map(findOption).filter(Boolean) : [])
  : findOption(props.modelValue) || null);
const displayValue = option => props.multiple ? '' : option?.[props.optionValue] || '';
const normalize = text => String(text ?? '').normalize('NFKD').replace(/\p{Diacritic}/gu, '').toLowerCase().trim();
const filteredOptions = computed(() => props.options.filter(option => normalize(option[props.optionValue]).includes(normalize(query.value))));
const amount = computed(() => props.multiple ? null : selected.value?.amount);
const budget = computed(() => props.multiple ? null : selected.value?.budget_categories?.[0]?.budget?.remaining_amount);
const modelValueFor = option => props.optionKey ? option?.[props.optionKey] : option;
const selectOption = option => {
  emit('update:modelValue', props.multiple ? option.map(modelValueFor) : modelValueFor(option));
  query.value = '';
};
const openOptions = open => {
  if (!open) {
    query.value = '';
    toggleButton.value?.$el?.click();
  }
};
const removeOption = option => selectOption(selected.value.filter(item => !sameOption(item, option)));
</script>
