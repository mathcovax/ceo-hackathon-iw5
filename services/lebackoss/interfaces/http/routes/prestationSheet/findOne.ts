import { PrestationSheet } from "@business/domains/entities/prestationSheet";
import { iWantPrestationSheetExistById } from "@interfaces/http/checkers/prestationSheet";
import { endpointFindOnePrestationSheetRoute } from "@interfaces/http/schemas/prestationSheet";

useBuilder()
	.createRoute("POST", "/find-one-prestation-sheet")
	.extract({
		body: {
			prestationSheetId: PrestationSheet.idObjecter.toZodSchema(),
		},
	})
	.presetCheck(
		iWantPrestationSheetExistById,
		(pickup) => pickup("prestationSheetId"),
	)
	.handler(
		(pickup) => {
			const { prestationSheet } = pickup(["prestationSheet"]);

			return new OkHttpResponse("prestationSheet.found", prestationSheet.toSimpleObject());
		},
		makeResponseContract(OkHttpResponse, "prestationSheet.found", endpointFindOnePrestationSheetRoute),
	);
