<script lang="ts" setup>
import type { HTMLAttributes } from "vue";
import { reactiveOmit } from "@vueuse/core";
import { CalendarRoot, type CalendarRootEmits, type CalendarRootProps, useForwardPropsEmits } from "reka-ui";
import { cn } from "../../../lib/utils";
import DSCalendarCell from "./DSCalendarCell.vue";
import DSCalendarCellTrigger from "./DSCalendarCellTrigger.vue";
import DSCalendarGrid from "./DSCalendarGrid.vue";
import DSCalendarGridBody from "./DSCalendarGridBody.vue";
import DSCalendarGridHead from "./DSCalendarGridHead.vue";
import DSCalendarGridRow from "./DSCalendarGridRow.vue";
import DSCalendarHeadCell from "./DSCalendarHeadCell.vue";
import DSCalendarHeader from "./DSCalendarHeader.vue";
import DSCalendarHeading from "./DSCalendarHeading.vue";
import DSCalendarNextButton from "./DSCalendarNextButton.vue";
import DSCalendarPrevButton from "./DSCalendarPrevButton.vue";

const props = defineProps<CalendarRootProps & { class?: HTMLAttributes["class"] }>();
const emits = defineEmits<CalendarRootEmits>();

const delegatedProps = reactiveOmit(props, "class");

const forwarded = useForwardPropsEmits(delegatedProps, emits);
</script>

<template>
	<CalendarRoot
		v-slot="{ grid, weekDays }"
		data-slot="calendar"
		:class="cn('p-3', props.class)"
		v-bind="forwarded"
	>
		<DSCalendarHeader>
			<DSCalendarHeading />

			<div class="flex items-center gap-1">
				<DSCalendarPrevButton />

				<DSCalendarNextButton />
			</div>
		</DSCalendarHeader>

		<div class="flex flex-col gap-y-4 mt-4 sm:flex-row sm:gap-x-4 sm:gap-y-0">
			<DSCalendarGrid
				v-for="month in grid"
				:key="month.value.toString()"
			>
				<DSCalendarGridHead>
					<DSCalendarGridRow>
						<DSCalendarHeadCell
							v-for="day in weekDays"
							:key="day"
						>
							{{ day }}
						</DSCalendarHeadCell>
					</DSCalendarGridRow>
				</DSCalendarGridHead>

				<DSCalendarGridBody>
					<DSCalendarGridRow
						v-for="(weekDates, index) in month.rows"
						:key="`weekDate-${index}`"
						class="mt-2 w-full"
					>
						<DSCalendarCell
							v-for="weekDate in weekDates"
							:key="weekDate.toString()"
							:date="weekDate"
						>
							<DSCalendarCellTrigger
								:day="weekDate"
								:month="month.value"
							/>
						</DSCalendarCell>
					</DSCalendarGridRow>
				</DSCalendarGridBody>
			</DSCalendarGrid>
		</div>
	</CalendarRoot>
</template>
