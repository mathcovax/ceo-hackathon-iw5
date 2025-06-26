import type { AllPrestation } from "@vendors/clients-type/lebackoss/duplojsTypesCodegen";
import type { transformCodegenBodyToHttpClientBody } from "@duplojs/http-client";

export function useGetPrestation(
	prestationId: Ref<string>,
	whenFindError: () => void,
) {
	const prestation = ref<transformCodegenBodyToHttpClientBody<AllPrestation> | null>(null);

	watch(
		prestationId,
		(prestationId) => lebackossClient
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
			.whenRequestError(
				whenFindError,
			),
		{ immediate: true },
	);

	return {
		prestation,
	};
}
