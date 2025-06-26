import { type transformCodegenBodyToHttpClientBody } from "@duplojs/http-client";
import type { AllPrestation } from "@vendors/clients-type/lebackoss/duplojsTypesCodegen";
import { listPrestationPage } from "../router";
import { useGetPrestationSheet } from "@/domains/prestationSheet/composables/useGetPrestationSheet";

export function useGetPage() {
	const router = useRouter();
	const { params } = listPrestationPage.use();
	const list = ref<transformCodegenBodyToHttpClientBody<AllPrestation>[]>([]);

	const { prestationSheet } = useGetPrestationSheet(
		computed(() => params.value.prestationSheetId),
		() => void router.back(),
	);

	void lebackossClient.post(
		"/find-all-prestation-by-prestation-sheet",
		{
			body: {
				prestationSheetId: params.value.prestationSheetId,
			},
		},
	)
		.whenInformation(
			"prestationList.found",
			({ body }) => {
				list.value = body;
			},
		).whenRequestError(
			() => void router.back(),
		);

	return {
		listPrestation: list,
		prestationSheet,
	};
}
