<script setup lang="ts">
import DSLabel from "../ui/label/DSLabel.vue";
import DSSelect from "../ui/select/DSSelect.vue";

interface Props {
	types: string[];
	labelMapper?: Partial<Record<string, string>>;
	selectLabel?: string;
}

defineProps<Props>();

const modelValue = defineModel<string>({
	required: true,
});

const emit = defineEmits<{
	update: [value: string];
}>();
</script>

<template>
	<div class="space-y-6">
		<div class="flex flex-col gap-2">
			<DSLabel>{{ selectLabel }}</DSLabel>

			<DSSelect
				v-model="modelValue"
				:items="types"
				:label="(item) => labelMapper?.[item] || item"
				class="w-full"
				size="sm"
				@update="emit('update', $event)"
			/>
		</div>

		<slot />
	</div>
</template>
