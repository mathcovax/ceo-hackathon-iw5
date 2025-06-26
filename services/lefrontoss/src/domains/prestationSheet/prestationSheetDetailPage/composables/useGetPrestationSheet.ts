import type { PrestationSheet } from "@vendors/clients-type/lebackoss/duplojsTypesCodegen";

export function useGetPrestationSheet(
	prestationSheetId: string,
	whenFindError: () => void,
) {
	const index = ref<PrestationSheet | null>(null);

	function findOne() {
		return lebackossClient
			.post(
				"/find-one-prestation-sheet",
				{
					body: {
						prestationSheetId,
					},
				},
			)
			.whenInformation(
				"prestationSheet.found",
				({ body }) => {
					index.value = body;
				},
			)
			.whenRequestError(
				whenFindError,
			);
	}

	void findOne();

	return {
		findOnePrestationSheet: findOne,
		prestationSheet: index,
	};
}
