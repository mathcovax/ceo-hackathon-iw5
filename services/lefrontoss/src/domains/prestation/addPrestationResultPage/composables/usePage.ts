import { addPrestationResultPage } from "../router";
import { useGetPrestation } from "../../composables/useGetPrestation";
import { useCreatePrestationResultForm } from "./useCreatePrestationResultForm";

export function usePage() {
	const { params } = addPrestationResultPage.use();
	const router = useRouter();
	const { prestation } = useGetPrestation(
		computed(() => params.value.prestationId),
		() => void router.back(),
	);

	const {
		CreatePrestationResultForm,
		switchForm,
		check,
		formValue,
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

	function onSubmit() {
		const result = check();

		if (!result) {
			return;
		}

		if (formValue.value.type === "created") {
			void lebackossClient
				.post(
					"/start-prestation",
					{
						body: {
							prestationId: prestation.value.id,
						},
					},
				)
				.whenInformation(
					"prestation.start",
					() => {
						formValue.value.type = "result";
					},
				);
		}

		console.log("Form submitted with result:", result);
	}

	return {
		prestation,
		addPrestationResultPage,
		CreatePrestationResultForm,
		onSubmitCreatePrestationResultForm: onSubmit,
	};
}
