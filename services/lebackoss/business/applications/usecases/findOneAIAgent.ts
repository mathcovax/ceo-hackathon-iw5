import { UsecaseHandler } from "@vendors/clean";
import { type AIAgent } from "@business/domains/entities/aIAgent";
import { aIAgentRepository } from "../repositories/aIAgent";

interface Input {
	aIAgentId: AIAgent.Id;
}

export class FindOneAIAgentUsecase extends UsecaseHandler.create({
	aIAgentRepository,
}) {
	public execute({ aIAgentId }: Input) {
		return this.aIAgentRepository.findOneById(aIAgentId);
	}
}
