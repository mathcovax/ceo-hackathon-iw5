import { Prestation } from "@business/domains/entities/prestation";
import { iWantPrestationExistById } from "@interfaces/http/checkers/prestation";
import { endpointFindOnePrestationRoute } from "@interfaces/http/schemas/prestation";

useBuilder()
	.createRoute("POST", "/find-one-prestation")
	.extract({
		body: {
			prestationId: Prestation.idObjecter.toZodSchema(),
		},
	})
	.presetCheck(
		iWantPrestationExistById,
		(pickup) => pickup("prestationId"),
	)
	.handler(
		(pickup) => {
			const { prestation } = pickup(["prestation"]);

			return new OkHttpResponse("prestation.found", prestation.toSimpleObject());
		},
		makeResponseContract(OkHttpResponse, "prestation.found", endpointFindOnePrestationRoute),
	);
