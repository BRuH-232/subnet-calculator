<template>
  <input
    class="ui-input"
    :value="props.modelValue"
    @input="onInput"
    :placeholder="props.placeholder"
    :disabled="props.disabled"
    :type="props.type"
  />
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

const props = defineProps<{
  modelValue: string
  placeholder?: string
  disabled?: boolean
  type?: 'text' | 'email' | 'number' | 'password'
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const onInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
}
</script>

<style scoped>
.ui-input {
  width: 150px;
  padding: 6px 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
}
.ui-input:disabled {
  background-color: #f5f5f5;
  color: #888;
}
</style>