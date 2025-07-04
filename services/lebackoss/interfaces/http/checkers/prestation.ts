import { type Prestation } from "@business/domains/entities/prestation";
import { findOnePrestationUsecase } from "@interfaces/usecases";

export const prestationExistByIdCheck = createChecker("prestationExistById")
	.handler(
		async(input: Prestation.Id, output) => {
			const prestation = await findOnePrestationUsecase.execute({
				prestationId: input,
			});

			if (prestation) {
				return output("prestation.found", prestation);
			} else {
				return output("prestation.notfound", null);
			}
		},
	);

export const iWantPrestationExistById = createPresetChecker(
	prestationExistByIdCheck,
	{
		result: "prestation.found",
		catch: () => new NotFoundHttpResponse("prestation.notfound"),
		indexing: "prestation",
	},
	makeResponseContract(NotFoundHttpResponse, "prestation.notfound"),
);
