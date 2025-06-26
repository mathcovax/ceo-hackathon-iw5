import type { AllPrestation } from "@vendors/clients-type/lebackoss/duplojsTypesCodegen";
import type { transformCodegenBodyToHttpClientBody } from "@duplojs/http-client";

export function useGetPrestation(
	prestationId: Ref<string>,
	whenFindError: () => void,
) {
	const prestation = ref<transformCodegenBodyToHttpClientBody<AllPrestation> | null>(null);

	function findOnePrestation(prestationId: string) {
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
			.whenRequestError(
				whenFindError,
			);
	}

	watch(
		prestationId,
		findOnePrestation,
		{ immediate: true },
	);

	return {
		prestation,
		findOnePrestation,
	};
}
