import { AIPrestation } from "@business/domains/entities/aIPrestation";
import { recieveFiles } from "@duplojs/core";
import { iWantAIPrestationTokenIsValid } from "@interfaces/http/checkers/aIPrestationToken";
import { iWantPrestationExistById } from "@interfaces/http/checkers/prestation";
import { PrestationService } from "@interfaces/http/services/prestation";
import { completePrestationUsecase } from "@interfaces/usecases";

const quantityFile = {
	min: 0,
	max: 10,
};

useBuilder()
	.createRoute("POST", "/ai-complete-prestation/{aIPrestationToken}")
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
			const prestationResultData = await PrestationService
				.prestationResultRawDataHandler(
					prestation.id,
					[
						...body.resultFiles,
						...body.resultText ?? [],
					],
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
