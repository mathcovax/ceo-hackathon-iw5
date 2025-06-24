import { UsecaseHandler } from "@vendors/clean";
import { type AIAgentEntity, type AIAgent } from "@business/domains/entities/aIAgent";
import { aIAgentRepository } from "../repositories/aIAgent";
import { CheckAvailableAIAgentUsecase } from "./checkAvailableAIAgent";

interface Input {
	aiAgent: AIAgentEntity;
	tokenKey?: AIAgent.TokenKey;
	pingUrl?: AIAgent.PingUrl;
	entryPointUrl?: AIAgent.EntryPointUrl;
}

export class UpdateAIAgentUsecase extends UsecaseHandler.create({
	aIAgentRepository,
	checkAvailableAIAgentUsecase: CheckAvailableAIAgentUsecase,
}) {
	public async execute({ aiAgent, tokenKey, pingUrl, entryPointUrl }: Input) {
		const aIAgentUpdated = aiAgent.partialUpdate({
			tokenKey,
			pingUrl,
			entryPointUrl,
		});

		await this.aIAgentRepository.save(aIAgentUpdated);

		await this.checkAvailableAIAgentUsecase({ aIAgent: aIAgentUpdated });

		return aIAgentUpdated;
	}
}
