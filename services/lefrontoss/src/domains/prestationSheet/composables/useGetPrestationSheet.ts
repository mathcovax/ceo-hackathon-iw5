import type { PrestationSheet } from "@vendors/clients-type/lebackoss/duplojsTypesCodegen";

export function useGetPrestationSheet(
	prestationSheetId: Ref<string>,
	whenFindError: () => void,
) {
	const prestationSheet = ref<PrestationSheet | null>(null);

	watch(
		prestationSheetId,
		(prestationSheetId) => lebackossClient
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
					prestationSheet.value = body;
				},
			)
			.whenRequestError(
				whenFindError,
			),
	);

	return {
		prestationSheet,
	};
}
