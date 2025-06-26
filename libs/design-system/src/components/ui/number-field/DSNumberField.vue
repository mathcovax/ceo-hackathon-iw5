<script setup lang="ts">
import {
	type NumberFieldRootEmits,
	type NumberFieldRootProps,
	NumberFieldRoot,
	useForwardPropsEmits,
} from "reka-ui";
import type { HTMLAttributes } from "vue";
import { reactiveOmit } from "@vueuse/core";
import { cn } from "../../../lib/utils";
import DSNumberFieldContent from "./DSNumberFieldContent.vue";
import DSNumberFieldDecrement from "./DSNumberFieldDecrement.vue";
import DSNumberFieldInput from "./DSNumberFieldInput.vue";
import DSNumberFieldIncrement from "./DSNumberFieldIncrement.vue";

const props = defineProps<NumberFieldRootProps & { class?: HTMLAttributes["class"] }>();
const emits = defineEmits<NumberFieldRootEmits>();

const delegatedProps = reactiveOmit(props, "class");

const forwarded = useForwardPropsEmits(delegatedProps, emits);
</script>

<template>
	<NumberFieldRoot
		v-bind="forwarded"
		:class="cn('grid gap-1.5', props.class)"
	>
		<DSNumberFieldContent>
			<DSNumberFieldDecrement />

			<DSNumberFieldInput />

			<DSNumberFieldIncrement />
		</DSNumberFieldContent>
	</NumberFieldRoot>
</template>
