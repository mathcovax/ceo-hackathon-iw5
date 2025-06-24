import { aIAgentRepository } from "@business/applications/repositories/aIAgent";
import { AIAgent } from "@business/domains/entities/aIAgent";
import { mongo } from "@interfaces/providers/mongo";
import { uuidv7 } from "uuidv7";

aIAgentRepository.default = {
	async save(aIAgent) {
		const simpleAIAgent = aIAgent.toSimpleObject();

		await mongo.aIAgentCollection.updateOne(
			{ id: simpleAIAgent.id },
			{ $set: simpleAIAgent },
			{ upsert: true },
		);

		return aIAgent;
	},
	generateId() {
		return AIAgent.IdObjecter.unsafeCreate(uuidv7());
	},
	isAvailable(aIAgent) {
		return Promise.resolve(false);
	},

};
