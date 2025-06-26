import type { PrestationSheet } from "@vendors/clients-type/lebackoss/duplojsTypesCodegen";

export function useGetPage() {
	const list = ref<PrestationSheet[] | null>(null);

	void lebackossClient.get(
		"/find-all-prestation-sheet",
	)
		.whenInformation(
			"prestationSheetList.found",
			({ body }) => {
				list.value = body;
			},
		);

	return {
		listPrestationSheet: list,
	};
}
