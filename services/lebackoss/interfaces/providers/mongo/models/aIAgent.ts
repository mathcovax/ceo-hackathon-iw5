import { type AIAgentEntity } from "@business/domains/entities/aIAgent";
import { type EntityToSimpleObject } from "@vendors/clean";

export interface MongoAIAgentModel extends EntityToSimpleObject<typeof AIAgentEntity> {

}
