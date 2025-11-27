<script setup lang="ts">
    interface IProps{
        label: string
    }

    const props = defineProps<IProps>();
</script>

<template>
    <div class="text-field">
        {{ props.label }}
    </div>
    <slot />
</template>

<style>
    .text-field{
        display: flex;
        height: 5px;
        width: auto;
    }
</style>