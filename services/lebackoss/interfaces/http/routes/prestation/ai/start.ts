import { AIPrestation } from "@business/domains/entities/aIPrestation";
import { PrestationEntity } from "@business/domains/entities/prestation";
import { iWantAIPrestationTokenIsValid } from "@interfaces/http/checkers/aIPrestationToken";
import { iWantPrestationExistById } from "@interfaces/http/checkers/prestation";
import { startPrestationUsecase } from "@interfaces/usecases";
import { match, P } from "ts-pattern";

useBuilder()
	.createRoute("POST", "/ai-start-prestation")
	.extract({
		body: {
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
