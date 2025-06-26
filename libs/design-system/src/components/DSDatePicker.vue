<script setup lang="ts">
import {
	CalendarDate,
	DateFormatter,
	getLocalTimeZone,
} from "@internationalized/date";
import { CalendarIcon } from "lucide-vue-next";
import DSButton from "./ui/button/DSButton.vue";
import DSCalendar from "./ui/calendar/DSCalendar.vue";
import DSPopover from "./ui/popover/DSPopover.vue";
import { computed, defineModel } from "vue";

const df = new DateFormatter("en-US", {
	dateStyle: "long",
});

const model = defineModel<string | null>({
	default: null,
});

const modelProxy = computed<CalendarDate | undefined>({
	get() {
		if (!model.value) {
			return;
		}
		const date = new Date(model.value);
		return new CalendarDate(date.getFullYear(), date.getMonth(), date.getDate());
	},
	set(value) {
		model.value = value?.toString() ?? null;
	},
});
</script>

<template>
	<DSPopover>
		<template #default>
			<DSButton
				variant="outline"
				class="justify-start text-left font-normal text-foreground border-input"
			>
				<CalendarIcon class="mr-2 h-4 w-4" />
				{{ modelProxy ? df.format(modelProxy.toDate(getLocalTimeZone())) : "Pick a date" }}
			</DSButton>
		</template>

		<template #content>
			<div class="w-auto p-0">
				<DSCalendar
					v-model="modelProxy"
					initial-focus
				/>
			</div>
		</template>
	</DSPopover>
</template>
