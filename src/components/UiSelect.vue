<template>
  <select
    class="ui-select"
    :value="props.modelValue"
    @change="onChange"
    :disabled="props.disabled"
  >
    <option value="" disabled>{{ props.placeholder }}</option>
    <option
      v-for="option in props.options"
      :key="getOptionKey(option)"
      :value="typeof option === 'object' ? option.value : option"
    >
      {{ typeof option === 'object' ? option.label : option }}
    </option>
  </select>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

type Option = string | { value: string | number; label: string }

const props = defineProps<{
  modelValue: string | number
  options: Option[]
  placeholder?: string
  disabled?: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number): void
}>()

const onChange = (event: Event) => {
  const target = event.target as HTMLSelectElement
  emit('update:modelValue', target.value)
}

const getOptionKey = (option: Option): string => {
  return typeof option === 'object' ? String(option.value) : option
}
</script>

<style scoped>
.ui-select {
  width: 150px;
  padding: 6px 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
  background-color: gray;
}
.ui-select:disabled {
  background-color: #f5f5f5;
  color: #888;
}
</style>