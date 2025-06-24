import { type AIAgent, type AIAgentEntity } from "@business/domains/entities/aIAgent";
import { createRepositoryHandler, type RepositoryBase } from "@vendors/clean";

export interface AIAgentRepository extends RepositoryBase<AIAgentEntity> {
	generateId(): AIAgent.Id;
	isAvailabity(aIAgent: AIAgentEntity): Promise<boolean>;
}

export const aIAgentRepository = createRepositoryHandler<
	AIAgentRepository
>();
