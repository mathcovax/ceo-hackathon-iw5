import { addPrestationResultPage } from "../router";
import { useGetPrestation } from "../../composables/useGetPrestation";
import { useCreatePrestationResultForm } from "./useCreatePrestationResultForm";
import { StrictFormData } from "@duplojs/http-client";
import type { PrestationResult } from "@vendors/clients-type/lebackoss/duplojsTypesCodegen";

export function usePage() {
	const { params } = addPrestationResultPage.use();
	const router = useRouter();
	const { prestation, findOnePrestation } = useGetPrestation(
		computed(() => params.value.prestationId),
		() => void router.back(),
	);
	const prestationResult = ref<PrestationResult | null>(null);

	const {
		CreatePrestationResultForm,
		switchForm,
		check,
	} = useCreatePrestationResultForm();

	watch(
		() => prestation.value?.status,
		() => {
			if (prestation.value?.status === "inProgress") {
				switchForm("result");
			} else if (prestation.value?.status === "completed") {
				switchForm("completed");
			}
		},
	);

	watch(
		prestation,
		(prestation) => prestation?.status === "completed"
			&& lebackossClient
				.post(
					"/find-one-prestation-result-by-prestation",
					{
						body: {
							prestationId: prestation.id,
						},
					},
				)
				.whenInformation(
					"prestationResult.found",
					({ body }) => {
						prestationResult.value = body;
					},
				)
				.whenRequestError(
					() => void router.back(),
				),
	);

	function onSubmit() {
		const result = check();
		const prestationId = prestation.value?.id;

		if (!result || !prestationId) {
			return;
		}

		if (result.type === "created") {
			void lebackossClient
				.post(
					"/start-prestation",
					{
						body: {
							prestationId,
						},
					},
				)
				.whenInformation(
					"prestation.start",
					() => {
						void findOnePrestation(prestationId);
					},
				);
		} else if (result.type === "result") {
			void lebackossClient
				.post(
					"/complete-prestation/{prestationId}",
					{
						params: {
							prestationId,
						},
						body: new StrictFormData({
							resultFiles: result.value
								.flatMap(({ type, value }) => type === "file" ? value : []),
							resultText: result.value
								.flatMap(({ type, value }) => type === "textarea" ? value : []),
						}),
					},
				)
				.whenInformation(
					"prestation.completed",
					() => {
						void findOnePrestation(prestationId);
					},
				);
		}
	}

	return {
		prestation,
		addPrestationResultPage,
		CreatePrestationResultForm,
		onSubmitCreatePrestationResultForm: onSubmit,
		prestationResult,
	};
}
