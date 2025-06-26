import { prestationResultDataObjecter } from "@business/domains/common/prestationResultData";
import { AIPrestation } from "@business/domains/entities/aIPrestation";
import { recieveFiles, File } from "@duplojs/core";
import { envs } from "@interfaces/envs";
import { iWantAIPrestationTokenIsValid } from "@interfaces/http/checkers/aIPrestationToken";
import { iWantPrestationExistById } from "@interfaces/http/checkers/prestation";
import { completePrestationUsecase } from "@interfaces/usecases";
import { match, P } from "ts-pattern";

const quantityFile = {
	min: 0,
	max: 10,
};

useBuilder()
	.createRoute("POST", "/complete-prestation/{aIPrestationToken}")
	.extract({
		params: {
			aIPrestationToken: AIPrestation.tokenObjecter.toZodSchema(),
		},
	})
	.presetCheck(
		iWantAIPrestationTokenIsValid,
		(pickup) => pickup("aIPrestationToken"),
	)
	.presetCheck(
		iWantPrestationExistById,
		(pickup) => pickup("prestationId"),
	)
	.extract({
		body: zod.receiveFormData({
			resultFiles: recieveFiles({
				maxSize: "10mb",
				mimeType: /.*/,
				quantity: [quantityFile.min, quantityFile.max],
			}),
			resultText: zod
				.string()
				.toArray()
				.optional(),
		}),
	})
	.cut(
		async({ pickup, dropper }) => {
			const { body, prestation } = pickup(["body", "prestation"]);
			const prestationResultData = await Promise.all(
				[
					...body.resultFiles,
					...body.resultText ?? [],
				].map(
					(value) => match({ value })
						.with(
							{ value: P.string },
							({ value }) => prestationResultDataObjecter.unsafeCreate({
								type: "text",
								value,
							}),
						)
						.with(
							{ value: P.instanceOf(File) },
							async({ value: file }) => {
								const path = `/${prestation.id.value}_${process.hrtime.bigint().toString()}${file.informations.extension}`;
								await file.deplace(
									`${envs.UPLOAD_DIR}${path}`,
								);

								return prestationResultDataObjecter.unsafeCreate({
									type: "text",
									value: path,
								});
							},
						)
						.exhaustive(),
				),
			);

			await completePrestationUsecase.execute({
				prestation,
				prestationResultData,
			});

			return dropper(null);
		},
		[],
	)
	.handler(
		() => new OkHttpResponse("prestation.completed"),
		makeResponseContract(OkHttpResponse, "prestation.completed"),
	);
