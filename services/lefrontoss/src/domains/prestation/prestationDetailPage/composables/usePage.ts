import type { transformCodegenBodyToHttpClientBody } from "@duplojs/http-client";
import { type PrestationResult, type AllPrestation } from "@vendors/clients-type/lebackoss/duplojsTypesCodegen";
import { prestationDetailPage } from "../router";

export function usePage() {
	const { params } = prestationDetailPage.use();
	const router = useRouter();
	const prestation = ref<
		transformCodegenBodyToHttpClientBody<AllPrestation> | null
	>(null);
	const result = ref <PrestationResult | null>(null);

	watch(
		() => params.value.prestationId,
		(prestationId) => {
			result.value = null;
			return lebackossClient
				.post(
					"/find-one-prestation",
					{
						body: {
							prestationId,
						},
					},
				)
				.whenInformation(
					"prestation.found",
					({ body }) => {
						prestation.value = body;
					},
				)
				.whenError(
					() => void router.back(),
				);
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
