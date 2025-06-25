<script setup lang="ts">
import { useCreatePrestationSheetForm } from "./composables/useCreatePrestationSheetForm";
import { addPrestationPage } from "./router";

const { $pt } = addPrestationPage.use();
const { CreatePrestationSheetForm, checkCreatePrestationSheetForm } = useCreatePrestationSheetForm();

function onSubmit() {
	const result = checkCreatePrestationSheetForm();

	console.log(result);

	if (!result) {
		return;
	}
}

</script>

<template>
	<section class="space-y-6">
		<div class="space-y-2">
			<h1 class="text-3xl font-bold">
				{{ $pt("title") }}
			</h1>

			<p class="text-muted-foreground">
				{{ $pt("description") }}
			</p>
		</div>

		<CreatePrestationSheetForm @submit="onSubmit">
			<DSPrimaryButton type="submit">
				send
			</DSPrimaryButton>
		</CreatePrestationSheetForm>
	</section>
</template>
