import { prestationResultDataObjecter } from "@business/domains/common/prestationResultData";
import { Prestation } from "@business/domains/entities/prestation";
import { iWantPrestationExistById } from "@interfaces/http/checkers/presetation";
import { completePrestationUsecase } from "@interfaces/usecases";

useBuilder()
	.createRoute("POST", "/complete-prestation")
	.extract({
		body: zod.object({
			prestationId: Prestation.idObjecter.toZodSchema(),
			prestationResultData: prestationResultDataObjecter.array().toZodSchema(),
		}),
	})
	.presetCheck(
		iWantPrestationExistById,
		(pickup) => pickup("body").prestationId,
	)
	.cut(
		async({ pickup, dropper }) => {
			const { body: { prestationResultData }, prestation } = pickup(["body", "prestation"]);

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
