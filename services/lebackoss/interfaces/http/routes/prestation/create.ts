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
					() => new UnprocessableEntityHttpResponse("extra-field"),
				)
				.with(
					{ result: { information: "failed-check-AIAgent-availability" } },
					() => new ServiceUnavailableHttpResponse("failed-check-AIAgent-availability"),
				)
				.with(
					{ result: { information: "field-type-incompatible" } },
					() => new UnprocessableEntityHttpResponse("field-type-incompatible"),
				)
				.with(
					{ result: { information: "missing-field" } },
					() => new UnprocessableEntityHttpResponse("missing-field"),
				)
				.with(
					{ result: P.instanceOf(PrestationEntity) },
					() => dropper(null),
				)
				.exhaustive();
		},
		[],
		[
			...makeResponseContract(ServiceUnavailableHttpResponse, "failed-check-AIAgent-availability"),
			...makeResponseContract(
				UnprocessableEntityHttpResponse,
				[
					"extra-field",
					"field-type-incompatible",
					"missing-field",
				],
			),
		],
	)
	.handler(
		() => new OkHttpResponse("prestation.created"),
		makeResponseContract(OkHttpResponse, "prestation.created"),
	);
