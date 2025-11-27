<script setup lang="ts">
    interface IProps{
        label: string
    }

    const props = defineProps<IProps>();
</script>

<template>
    <div>
        <label class="text-field">
            {{ props.label }}
        </label>
        <slot />
    </div>
</template>

<style>
    .text-field{
        display: flex;
        height: 5px;
        width: auto;
    }
</style>