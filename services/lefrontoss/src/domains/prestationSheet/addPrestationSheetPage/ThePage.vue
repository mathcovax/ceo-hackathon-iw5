<script setup lang="ts">
import { useCreatePrestationSheetForm } from "./composables/useCreatePrestationSheetForm";
import { addPrestationSheetPage } from "./router";

const { $pt } = addPrestationSheetPage.use();
const { CreatePrestationSheetForm, onSubmitCreatePrestationSheetForm } = useCreatePrestationSheetForm();

</script>

<template>
	<section class="space-y-6">
		<BackButton />

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
