import { PrestationSheet } from "@business/domains/entities/prestationSheet";
import { iWantPrestationSheetExistById } from "@interfaces/http/checkers/prestationSheet";
import { endpointFindAllPrestationRoute } from "@interfaces/http/schemas/prestation";
import { findAllPrestationByPrestationSheetUsecase } from "@interfaces/usecases";

useBuilder()
	.createRoute("POST", "/find-all-prestation-by-prestation-sheet")
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
		async(pickup) => {
			const { prestationSheet } = pickup(["prestationSheet"]);

			const prestationList = await findAllPrestationByPrestationSheetUsecase.execute({
				prestationSheet,
			});

			const result = prestationList.map(
				(prestation) => prestation.toSimpleObject(),
			);

			return new OkHttpResponse("prestationList.found", result);
		},
		makeResponseContract(OkHttpResponse, "prestationList.found", endpointFindAllPrestationRoute),
	);
