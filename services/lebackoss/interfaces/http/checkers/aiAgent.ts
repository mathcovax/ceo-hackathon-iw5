import { type AIAgent } from "@business/domains/entities/aIAgent";
import { findOneAIAgentUsecase } from "@interfaces/usecases";

export const aiAgentExistById = createChecker("aiAgentExistById")
	.handler(
		async(input: AIAgent.Id, output) => {
			const aiAgent = await findOneAIAgentUsecase.execute({
				aIAgentId: input,
			});

			if (aiAgent) {
				return output("aiAgent.found", aiAgent);
			} else {
				return output("aiAgent.notfound", null);
			}
		},
	);

export const iWantAiAgentExistById = createPresetChecker(
	aiAgentExistById,
	{
		result: "aiAgent.found",
		catch: () => new NotFoundHttpResponse("aiAgent.notfound"),
		indexing: "aiAgent",
	},
);
