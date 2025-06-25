import { type PrestationSheet } from "@business/domains/entities/prestationSheet";
import { findOnePrestationSheetUsecase } from "@interfaces/usecases";

export const prestationSheetExistByIdCheck = createChecker("prestationSheetExistById")
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
	prestationSheetExistByIdCheck,
	{
		result: "prestationSheet.found",
		catch: () => new NotFoundHttpResponse("prestationSheet.notfound"),
		indexing: "prestationSheet",
	},
	makeResponseContract(NotFoundHttpResponse, "prestationSheet.notfound"),
);
