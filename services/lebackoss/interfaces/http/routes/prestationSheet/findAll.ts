import { endpointFindAllPrestationSheetRoute } from "@interfaces/http/schemas/prestationSheet";
import { findAllPrestationSheetUsecase } from "@interfaces/usecases";

useBuilder()
	.createRoute("GET", "find-all-prestation-sheet")
	.handler(
		async() => {
			const prestationSheetList = await findAllPrestationSheetUsecase.execute();

			const result = prestationSheetList.map(
				(prestationSheet) => prestationSheet.toSimpleObject(),
			);

			return new OkHttpResponse("prestationSheetList.found", result);
		},
		makeResponseContract(OkHttpResponse, "prestationSheetList.found", endpointFindAllPrestationSheetRoute),
	);
