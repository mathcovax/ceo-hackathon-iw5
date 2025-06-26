import type { PrestationSheet } from "@vendors/clients-type/lebackoss/duplojsTypesCodegen";
import { prestationSheetDetailPage } from "../router";

export function useGetPage() {
	const router = useRouter();
	const { params } = prestationSheetDetailPage.use();
	const prestationSheet = ref<PrestationSheet | null>(null);

	watch(
		() => params.value.prestationSheetId,
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
				() => void router.back(),
			),
	);

	return {
		prestationSheet,
	};
}
