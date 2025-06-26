import type { PrestationSheet } from "@vendors/clients-type/lebackoss/duplojsTypesCodegen";

export function useGetPrestationSheet() {
	const list = ref<PrestationSheet[]>([]);

	function findAll() {
		return lebackossClient.get(
			"/find-all-prestation-sheet",
		)
			.whenInformation(
				"prestationSheetList.found",
				({ body }) => {
					list.value = body;
				},
			);
	}

	void findAll();

	return {
		findAllPrestationSheet: findAll,
		listPrestationSheet: list,
	};
}
