import { Prestation, PrestationEntity } from "@business/domains/entities/prestation";
import { iWantPrestationExistById } from "@interfaces/http/checkers/prestation";
import { startPrestationUsecase } from "@interfaces/usecases";
import { match, P } from "ts-pattern";

useBuilder()
	.createRoute("POST", "/start-prestation")
	.extract({
		body: {
			prestationId: Prestation.idObjecter.toZodSchema(),
		},
	})
	.presetCheck(
		iWantPrestationExistById,
		(pickup) => pickup("prestationId"),
	)
	.cut(
		async({ pickup, dropper }) => {
			const { prestation } = pickup(["prestation"]);

			const result = await startPrestationUsecase.execute({
				prestation,
			});

			return match({ result })
				.with(
					{ result: { information: "error-while-starting" } },
					() => new InternalServerErrorHttpResponse("prestation.errorWhileStarting"),
				)
				.with(
					{ result: P.instanceOf(PrestationEntity) },
					() => dropper(null),
				)
				.exhaustive();
		},
		[],
		makeResponseContract(InternalServerErrorHttpResponse, "prestation.errorWhileStarting"),
	)
	.handler(
		() => new OkHttpResponse("prestation.start"),
		makeResponseContract(OkHttpResponse, "prestation.start"),
	);
