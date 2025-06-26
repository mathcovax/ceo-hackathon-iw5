import { type AIPrestationEntity } from "@business/domains/entities/aIPrestation";
import { type PrestationEntity } from "@business/domains/entities/prestation";
import { type PrestationResult } from "@business/domains/entities/prestationResult";
import { type GetTypeInput } from "@duplojs/core";
import { findOnePrestationResultByIdUsecase, findOnePrestationResultByPrestationUsecase } from "@interfaces/usecases";
import { match } from "ts-pattern";

type AllPrestation = PrestationEntity | AIPrestationEntity;

const inputPrestationResultExistCheck = createTypeInput<{
	prestation: AllPrestation;
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
					{ input: { inputName: "prestation" } },
					({ input: { value } }) => findOnePrestationResultByPrestationUsecase.execute({
						prestation: value,
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
		transformInput: inputPrestationResultExistCheck.prestation,
	},
	makeResponseContract(NotFoundHttpResponse, "prestationResult.notfound"),
);
