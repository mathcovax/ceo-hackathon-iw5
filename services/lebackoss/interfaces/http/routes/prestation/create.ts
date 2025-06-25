import { submissionDataObjecter } from "@business/domains/common/submissionData";
import { PrestationEntity } from "@business/domains/entities/prestation";
import { PrestationSheet } from "@business/domains/entities/prestationSheet";
import { iWantPrestationSheetExistById } from "@interfaces/http/checkers/presetationSheet";
import { createPrestationUsecase } from "@interfaces/usecases";
import { match, P } from "ts-pattern";

useBuilder()
	.createRoute("POST", "/create-prestation")
	.extract({
		body: zod.object({
			prestationSheetId: PrestationSheet.idObjecter.toZodSchema(),
			submissionData: submissionDataObjecter.toZodSchema(),
		}),
	})
	.presetCheck(
		iWantPrestationSheetExistById,
		(pickup) => pickup("body").prestationSheetId,
	)
	.cut(
		async({ pickup, dropper }) => {
			const { body: { submissionData }, prestationSheet } = pickup(["body", "prestationSheet"]);

			const result = await createPrestationUsecase.execute({
				prestationSheet,
				submissionData,
			});

			return match({ result })
				.with(
					{ result: { information: "extra-field" } },
					() => new UnprocessableEntityHttpResponse("prestation.extraField"),
				)
				.with(
					{ result: { information: "failed-check-AIAgent-availability" } },
					() => new ServiceUnavailableHttpResponse("prestation.failedCheckAIAgentAvailability"),
				)
				.with(
					{ result: { information: "field-type-incompatible" } },
					() => new UnprocessableEntityHttpResponse("prestation.fieldTypeIncompatible"),
				)
				.with(
					{ result: { information: "missing-field" } },
					() => new UnprocessableEntityHttpResponse("prestation.missingField"),
				)
				.with(
					{ result: P.instanceOf(PrestationEntity) },
					() => dropper(null),
				)
				.exhaustive();
		},
		[],
		[
			...makeResponseContract(ServiceUnavailableHttpResponse, "prestation.failedCheckAIAgentAvailability"),
			...makeResponseContract(
				UnprocessableEntityHttpResponse,
				[
					"prestation.extraField",
					"prestation.fieldTypeIncompatible",
					"prestation.missingField",
				],
			),
		],
	)
	.handler(
		() => new OkHttpResponse("prestation.created"),
		makeResponseContract(OkHttpResponse, "prestation.created"),
	);
