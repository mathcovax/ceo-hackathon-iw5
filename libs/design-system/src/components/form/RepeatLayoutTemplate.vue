<script setup lang="ts">
import { type FormFieldInstance } from "../../composables/useFormBuilder";
import DSGhostButton from "../ui/button/DSGhostButton.vue";

interface Props {
	maxItems: number;
	items: FormFieldInstance["getVNode"][];
	cols?: number;
	colsByItems?: number;
	addLabel?: string;
}

withDefaults(
	defineProps<Props>(),
	{
		cols: 12,
		colsByItems: 12,
	},
);

const emit = defineEmits<{
	addItem: [];
	removeItem: [index: number];
}>();
</script>

<template>
	<div class="col-span-full space-y-2">
		<div
			v-if="items.length < maxItems"
			class="flex justify-start"
		>
			<DSGhostButton
				size="small"
				icon="plus"
				@click="emit('addItem')"
			>
				{{ addLabel }}
			</DSGhostButton>
		</div>

		<div
			class="grid gap-2"
			:style="{
				'gridTemplateColumns': `repeat(${cols}, minmax(0, 1fr))`
			}"
		>
			<div
				v-for="(item, index) of items"
				:key="index"
				:style="{
					'grid-column': `span ${colsByItems} / span ${colsByItems}`
				}"
			>
				<div class="p-4 flex items-start gap-2 bg-accent/40 rounded-lg">
					<div class="flex-1 min-w-0">
						<component :is="item" />
					</div>

					<DSGhostButton
						v-if="items.length > 1"
						icon="close"
						size="small"
						class="hover:text-destructive"
						@click="emit('removeItem', index)"
					/>
				</div>
			</div>
		</div>
	</div>
</template>
