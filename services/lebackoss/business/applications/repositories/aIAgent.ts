import { type AIAgent, type AIAgentEntity } from "@business/domains/entities/aIAgent";
import { type PrestationEntity } from "@business/domains/entities/prestation";
import { type PrestationSheetEntity } from "@business/domains/entities/prestationSheet";
import { createRepositoryHandler, type RepositoryBase } from "@vendors/clean";

export interface AIAgentRepository extends RepositoryBase<AIAgentEntity> {
	generateId(): AIAgent.Id;
	isAvailable(aIAgent: AIAgentEntity): Promise<boolean>;
	findOneById(aIAgentId: AIAgent.Id): Promise<AIAgentEntity | null>;
	getOneByPrestationSheet(prestationSheet: PrestationSheetEntity): Promise<AIAgentEntity>;
	sendPrestation(prestation: PrestationEntity): Promise<void>;
}

export const aIAgentRepository = createRepositoryHandler<
	AIAgentRepository
>();
