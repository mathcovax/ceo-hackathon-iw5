import { AIAgent } from "@business/domains/entities/aIAgent";
import { iWantAiAgentExistById } from "@interfaces/http/checkers/aiAgent";
import { updateAIAgentUsecase } from "@interfaces/usecases";

useBuilder()
	.createRoute("POST", "/update-ai-agent")
	.extract({
		body: zod.object({
			aiAgentId: AIAgent.IdObjecter.toZodSchema(),
			tokenKey: AIAgent.tokenKeyObjecter.toZodSchema(),
			pingUrl: AIAgent.pingUrlObjecter.toZodSchema(),
			entryPointUrl: AIAgent.entryPointUrlObjecter.toZodSchema(),
		}),
	})
	.presetCheck(
		iWantAiAgentExistById,
		(pickup) => pickup("body").aiAgentId,
	)
	.cut(
		async({ pickup, dropper }) => {
			const { body: { tokenKey, pingUrl, entryPointUrl }, aiAgent } = pickup(["body", "aiAgent"]);

			await updateAIAgentUsecase.execute({
				aiAgent,
				tokenKey,
				pingUrl,
				entryPointUrl,
			});

			return dropper(null);
		},
		[],
	)
	.handler(
		() => new OkHttpResponse("aiAgent.updated"),
		makeResponseContract(OkHttpResponse, "aiAgent.updated"),
	);
