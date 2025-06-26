import { type PrestationResult } from "@vendors/clients-type/lebackoss/duplojsTypesCodegen";
import { prestationDetailPage } from "../router";
import { useGetPrestation } from "../../composables/useGetPrestation";

export function usePage() {
	const { params } = prestationDetailPage.use();
	const router = useRouter();
	const result = ref<PrestationResult | null>(null);
	const { prestation } = useGetPrestation(
		computed(() => params.value.prestationId),
		() => void router.back(),
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
						result.value = body;
					},
				)
				.whenRequestError(
					() => void router.back(),
				),
	);

	return {
		prestation,
		prestationResult: result,
	};
}
