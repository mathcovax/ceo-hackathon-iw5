<script setup lang="ts">
import { useCreatePrestationSheetForm } from "./composables/useCreatePrestationSheetForm";
import { addPrestationPage } from "./router";

const { $pt } = addPrestationPage.use();
const { CreatePrestationSheetForm, onSubmitCreatePrestationSheetForm } = useCreatePrestationSheetForm();

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

		<CreatePrestationSheetForm @submit="onSubmitCreatePrestationSheetForm">
			<DSPrimaryButton type="submit">
				{{ $t("cta.submit") }}
			</DSPrimaryButton>
		</CreatePrestationSheetForm>
	</section>
</template>
