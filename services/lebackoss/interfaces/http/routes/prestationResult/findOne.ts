import { Prestation } from "@business/domains/entities/prestation";
import { iWantPrestationExistById } from "@interfaces/http/checkers/presetation";
import { iWantPrestationResultExistbyPrestationId } from "@interfaces/http/checkers/prestationResult";
import { endpointFindOnePrestationResultRoute } from "@interfaces/http/schemas/prestationResult";

useBuilder()
	.createRoute("POST", "/find-one-prestation-result-by-prestation")
	.extract({
		body: {
			prestationId: Prestation.idObjecter.toZodSchema(),
		},
	})
	.presetCheck(
		iWantPrestationExistById,
		(pickup) => pickup("prestationId"),
	)
	.presetCheck(
		iWantPrestationResultExistbyPrestationId,
		(pickup) => pickup("prestation").id,
	)
	.handler(
		(pickup) => {
			const { prestationResult } = pickup(["prestationResult"]);

			return new OkHttpResponse("prestationResult.found", prestationResult.toSimpleObject());
		},
		makeResponseContract(OkHttpResponse, "prestationResult.found", endpointFindOnePrestationResultRoute),
	);
