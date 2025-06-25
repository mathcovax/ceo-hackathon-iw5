import { Prestation } from "@business/domains/entities/prestation";
import { iWantPrestationExistById } from "@interfaces/http/checkers/presetation";
import { startPrestationUsecase } from "@interfaces/usecases";

useBuilder()
	.createRoute("POST", "/start-prestation")
	.extract({
		params: zod.object({
			prestationId: Prestation.idObjecter.toZodSchema(),
		}),
	})
	.presetCheck(
		iWantPrestationExistById,
		(pickup) => pickup("params").prestationId,
	)
	.cut(
		async({ pickup, dropper }) => {
			const { prestation } = pickup(["prestation"]);

			await startPrestationUsecase.execute({
				prestation,
			});

			return dropper(null);
		},
		[],
	)
	.handler(
		() => new OkHttpResponse("prestation.start"),
		makeResponseContract(OkHttpResponse, "prestation.start"),
	);
