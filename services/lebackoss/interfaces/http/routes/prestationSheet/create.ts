import { submissionFieldObjecter } from "@business/domains/common/submissionField";
import { AIAgent } from "@business/domains/entities/aIAgent";
import { PrestationSheet } from "@business/domains/entities/prestationSheet";
import { createPrestationSheetUsecase } from "@interfaces/usecases";
import { match } from "ts-pattern";

useBuilder()
	.createRoute("POST", "/create-prestation-sheet")
	.extract({
		body: zod.object({
			mode: PrestationSheet.modeObjecter.toZodSchema(),
			name: PrestationSheet.nameObjecter.toZodSchema(),
			description: PrestationSheet.descriptionObjecter.toZodSchema(),
			keywords: PrestationSheet.keywordObjecter.array().toZodSchema(),
			submissionFields: submissionFieldObjecter.array().toZodSchema(),
		})
			.and(
				zod.union([
					zod.object({ mode: zod.literal(PrestationSheet.modeEnum.human) }),
					zod.object({
						mode: zod.literal(PrestationSheet.modeEnum.ai),
						aIAgent: zod.object({
							pingUrl: AIAgent.pingUrlObjecter.toZodSchema(),
							tokenKey: AIAgent.tokenKeyObjecter.toZodSchema(),
							entryPointUrl: AIAgent.entryPointUrlObjecter.toZodSchema(),
						}),
					}),
				]),
			),
	})
	.cut(
		async({ pickup, dropper }) => {
			const input = pickup("body");

			const result = await createPrestationSheetUsecase.execute(input);

			return match({ result })
				.with(
					{ result: { information: "failed-check-AIAgent-availability" } },
					() => new ServiceUnavailableHttpResponse("AIAgent.unavaible"),
				)
				.with(
					{ result: undefined },
					() => dropper(null),
				)
				.exhaustive();
		},
		[],
		[
			...makeResponseContract(ServiceUnavailableHttpResponse, "AIAgent.unavaible"),
			...makeResponseContract(BadRequestHttpResponse, "AIAgent.isMissing"),
		],
	)
	.handler(
		() => new OkHttpResponse("prestationSheet.created"),
		makeResponseContract(OkHttpResponse, "prestationSheet.created"),
	);
