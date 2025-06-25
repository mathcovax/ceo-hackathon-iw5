import { type AIAgent } from "@business/domains/entities/aIAgent";
import { findOneAIAgentUsecase } from "@interfaces/usecases";

export const aiAgentExistByIdCheck = createChecker("aiAgentExistById")
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
	aiAgentExistByIdCheck,
	{
		result: "aiAgent.found",
		catch: () => new NotFoundHttpResponse("aiAgent.notfound"),
		indexing: "aiAgent",
	},
	makeResponseContract(NotFoundHttpResponse, "aiAgent.notfound"),
);
