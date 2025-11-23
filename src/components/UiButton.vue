<template>
  <button
    class="ui-button"
    :type="props.type"
    :disabled="props.disabled"
    :class="{
      'ui-button--disabled': props.disabled,
      'ui-button--primary': props.layout === 'primary',
      'ui-button--secondary': props.layout === 'secondary'
    }"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
interface IProps{
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  layout: 'primary' | 'secondary'
};

const props = withDefaults(defineProps<IProps>(), {
  layout: 'primary',
  type: 'button',
});
</script>

<style scooped>
.ui-button {
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

.ui-button--primary {
  border: 1px solid #007bff;
  color: white;
  background-color: #1978de;
}

.ui-button--secondary {
  background-color: transparent;
  border: 1px solid gray;
  color: white;
}

.ui-button--primary:hover:not(:disabled),
.ui-button--secondary:hover:not(:disabled) {
  filter: brightness(0.9);
}

.ui-button:disabled,
.ui-button--disabled {
  background-color: #ccc;
  border-color: #aaa;
  color: #666;
  cursor: not-allowed;
}
</style>