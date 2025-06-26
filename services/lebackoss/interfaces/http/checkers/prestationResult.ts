import { type Prestation } from "@business/domains/entities/prestation";
import { type PrestationResult } from "@business/domains/entities/prestationResult";
import { type GetTypeInput } from "@duplojs/core";
import { findOnePrestationResultByIdUsecase, findOnePrestationResultByPrestationIdUsecase } from "@interfaces/usecases";
import { match } from "ts-pattern";

const inputPrestationResultExistCheck = createTypeInput<{
	prestationId: Prestation.Id;
	prestationResultId: PrestationResult.Id;
}>();

const prestationResultExistCheck = createChecker(
	" prestationResultExist",
)
	.handler(
		async(
			input: GetTypeInput<typeof inputPrestationResultExistCheck>,
			output,
		) => {
			const prestationResult = await match({ input })
				.with(
					{ input: { inputName: "prestationResultId" } },
					({ input: { value } }) => findOnePrestationResultByIdUsecase.execute({
						prestationResultId: value,
					}),
				)
				.with(
					{ input: { inputName: "prestationId" } },
					({ input: { value } }) => findOnePrestationResultByPrestationIdUsecase.execute({
						prestationId: value,
					}),
				)
				.exhaustive();

			if (prestationResult) {
				return output("prestationResult.found", prestationResult);
			} else {
				return output("prestationResult.notfound", null);
			}
		},
	);

export const iWantPrestationResultExistbyPrestationId = createPresetChecker(
	prestationResultExistCheck,
	{
		result: "prestationResult.found",
		catch: () => new NotFoundHttpResponse("prestationResult.notfound"),
		indexing: "prestationResult",
		transformInput: inputPrestationResultExistCheck.prestationId,
	},
	makeResponseContract(NotFoundHttpResponse, "prestationResult.notfound"),
);
