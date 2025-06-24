import { type PrestationSheet } from "@business/domains/entities/prestationSheet";
import { findOnePrestationSheetUsecase } from "@interfaces/usecases";

export const prestationSheetExistById = createChecker("prestationSheetExistById")
	.handler(
		async(input: PrestationSheet.Id, output) => {
			const prestationSheet = await findOnePrestationSheetUsecase.execute({
				prestationSheetId: input,
			});

			if (prestationSheet) {
				return output("prestationSheet.found", prestationSheet);
			} else {
				return output("prestationSheet.notfound", null);
			}
		},
	);

export const iWantPrestationSheetExistById = createPresetChecker(
	prestationSheetExistById,
	{
		result: "prestationSheet.found",
		catch: () => new NotFoundHttpResponse("prestationSheet.notfound"),
		indexing: "prestationSheet",
	},
);
