<script setup lang="ts">
import { ref, watch } from "vue";

interface Props {
	modelValue: File | null;
}

const props = defineProps<Props>();

const emit = defineEmits<{
	"update:modelValue": [File | null];
}>();

const inputRef = ref<HTMLInputElement | null>(null);

interface EventChange extends Event {
	target: HTMLInputElement & { files: FileList | null };
}

function onChange(event: EventChange) {
	if (event.target.files) {
		const file = [...event.target.files].shift();

		if (file) {
			emit("update:modelValue", file);
		}
	}
}

watch(
	() => props.modelValue,
	(value) => {
		if (!inputRef.value || value) {
			return;
		}

		inputRef.value.value = "";
	},
);

</script>

<template>
	<input
		ref="inputRef"
		type="file"
		@change="onChange($event as any)"
		class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
	>
</template>
