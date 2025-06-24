<script setup lang="ts">
import {
	DateFormatter,
	type DateValue,
	getLocalTimeZone,
} from "@internationalized/date";
import { CalendarIcon } from "lucide-vue-next";
import { ref } from "vue";
import DSButton from "./ui/button/DSButton.vue";
import DSCalendar from "./ui/calendar/DSCalendar.vue";
import DSPopover from "./ui/popover/DSPopover.vue";

const df = new DateFormatter("en-US", {
	dateStyle: "long",
});

const value = ref<DateValue>();
</script>

<template>
	<DSPopover>
		<template #default>
			<DSButton
				variant="outline"
				class="w-[280px] justify-start text-left font-normal text-foreground border-input"
			>
				<CalendarIcon class="mr-2 h-4 w-4" />
				{{ value ? df.format(value.toDate(getLocalTimeZone())) : "Pick a date" }}
			</DSButton>
		</template>

		<template #content>
			<div class="w-auto p-0">
				<DSCalendar
					v-model="value"
					initial-focus
				/>
			</div>
		</template>
	</DSPopover>
</template>
