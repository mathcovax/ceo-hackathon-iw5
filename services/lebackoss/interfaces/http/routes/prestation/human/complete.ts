import { Prestation } from "@business/domains/entities/prestation";
import { recieveFiles } from "@duplojs/core";
import { iWantPrestationExistById } from "@interfaces/http/checkers/prestation";
import { PrestationService } from "@interfaces/http/services/prestation";
import { completePrestationUsecase } from "@interfaces/usecases";

const quantityFile = {
	min: 0,
	max: 10,
};

useBuilder()
	.createRoute("POST", "/complete-prestation/{prestationId}")
	.extract({
		params: {
			prestationId: Prestation.idObjecter.toZodSchema(),
		},
	})
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
