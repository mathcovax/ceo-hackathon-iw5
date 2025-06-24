import { type AIAgent, type AIAgentEntity } from "@business/domains/entities/aIAgent";
import { createRepositoryHandler, type RepositoryBase } from "@vendors/clean";

export interface AIAgentRepository extends RepositoryBase<AIAgentEntity> {
	generateId(): AIAgent.Id;
	isAvailable(aIAgent: AIAgentEntity): Promise<boolean>;
	findOneById(aIAgentId: AIAgent.Id): Promise<AIAgentEntity | null>;
}

export const aIAgentRepository = createRepositoryHandler<
	AIAgentRepository
>();
