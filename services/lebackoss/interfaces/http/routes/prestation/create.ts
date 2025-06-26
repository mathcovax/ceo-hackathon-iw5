import { type SubmissionData, submissionDataObjecter } from "@business/domains/common/submissionData";
import { PrestationEntity } from "@business/domains/entities/prestation";
import { PrestationSheet } from "@business/domains/entities/prestationSheet";
import { mimeStandard } from "@duplojs/core";
import { envs } from "@interfaces/envs";
import { iWantPrestationSheetExistById } from "@interfaces/http/checkers/prestationSheet";
import { createPrestationUsecase } from "@interfaces/usecases";
import { rm, writeFile } from "fs/promises";
import { resolve } from "path";
import { match, P } from "ts-pattern";

useBuilder()
	.createRoute("POST", "/create-prestation/{prestationSheetId}")
	.extract({
		params: {
			prestationSheetId: PrestationSheet.idObjecter.toZodSchema(),
		},
	})
	.presetCheck(
		iWantPrestationSheetExistById,
		(pickup) => pickup("prestationSheetId"),
	)
	.extract({
		body: submissionDataObjecter.zodSchema,
	})
	.cut(
		async({ pickup, dropper }) => {
			const { body, prestationSheet } = pickup(["body", "prestationSheet"]);

			const submissionData = submissionDataObjecter.unsafeCreate(
				await Object.entries(body)
					.reduce<Promise<SubmissionData["value"]>>(
						async(accPromised, [key, value]) => {
							const acc = await accPromised;

							return match(value)
								.with(
									{ type: P.union("date", "number", "text", "url", "textarea", "selectText") },
									() => {
										acc[key] = value;

										return acc;
									},
								)
								.with(
									{ type: "file" },
									async({ value }) => {
										const [_match, mimeType, base64Payload] = value.match(/^data:([^;]+);base64,(.*)$/) ?? [];
										const extension = mimeType && mimeStandard.getExtension(mimeType);

										if (!extension || !base64Payload) {
											return acc;
										}

										const buffer = Buffer.from(base64Payload, "base64");
										const path = `/${prestationSheet.id.value}_${process.hrtime.bigint().toString()}.${extension}`;

										await writeFile(
											`${envs.UPLOAD_DIR}${path}`,
											buffer,
										);

										acc[key] = {
											type: "file",
											value: path,
										};

										return acc;
									},
								)
								.with(undefined, () => acc)
								.exhaustive();
						},
						Promise.resolve({}),
					),

			);

			const result = await createPrestationUsecase.execute({
				prestationSheet,
				submissionData,
			});

			console.log(result);

			if (result instanceof Error) {
				await Promise.all(
					Object.values(submissionData.value)
						.map(
							(data) => data?.type === "file" && rm(`${envs.UPLOAD_DIR}${data.value}`),
						),
				);
			}

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
