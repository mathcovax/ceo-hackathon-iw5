import { type transformCodegenBodyToHttpClientBody } from "@duplojs/http-client";
import type { AllPrestation } from "@vendors/clients-type/lebackoss/duplojsTypesCodegen";

export function useGetPrestation(
	prestationSheetId: string,
	whenFindError: () => void,
) {
	const list = ref<transformCodegenBodyToHttpClientBody<AllPrestation>[]>([]);

	function findAll() {
		return lebackossClient.post(
			"/find-all-prestation-by-prestation-sheet",
			{
				body: {
					prestationSheetId,
				},
			},
		)
			.whenInformation(
				"prestationList.found",
				({ body }) => {
					list.value = body;
				},
			).whenRequestError(
				whenFindError,
			);
	}

	void findAll();

	return {
		findAllPrestation: findAll,
		listPrestation: list,
	};
}
