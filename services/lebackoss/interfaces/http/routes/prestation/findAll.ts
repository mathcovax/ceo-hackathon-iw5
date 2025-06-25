import { endpointFindAllPrestationRoute } from "@interfaces/http/schemas/prestation";
import { findAllPrestationUsecase } from "@interfaces/usecases";

useBuilder()
	.createRoute("GET", "find-all-prestation")
	.handler(
		async() => {
			const prestationList = await findAllPrestationUsecase.execute();

			const result = prestationList.map(
				(prestation) => prestation.toSimpleObject(),
			);

			return new OkHttpResponse("prestationList.found", result);
		},
		makeResponseContract(OkHttpResponse, "prestationList.found", endpointFindAllPrestationRoute),
	);
