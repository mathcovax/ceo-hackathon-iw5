import { aIAgentRepository } from "@business/applications/repositories/aIAgent";
import { AIAgent, AIAgentEntity } from "@business/domains/entities/aIAgent";
import { mongo } from "@interfaces/providers/mongo";
import { TokenProvider } from "@interfaces/providers/token";
import { uuidv7 } from "uuidv7";
import crypto from "crypto";
import { ZodAccelerator } from "@duplojs/core";
import { EntityHandler, RepositoryError } from "@vendors/clean";

const randNumberRangeMin = 0;
const randNumberRangeMax = 10000;

const responseOfIsAvailableSchema = ZodAccelerator.build(
	zod.object({
		number: zod.number(),
	}),
);

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
		const simpleAIAgent = aIAgent.toSimpleObject();
		const randNumber = crypto.randomInt(randNumberRangeMin, randNumberRangeMax);

		const token = TokenProvider.generate(
			aIAgent,
			randNumber,
		);

		return fetch(
			simpleAIAgent.pingUrl,
			{
				method: "POST",
				headers: {
					token,
				},
			},
		)
			.then(({ json }) => json())
			.then(responseOfIsAvailableSchema.parse)
			.then(({ number }) => number === randNumber * randNumber)
			.catch(() => false);
	},
	async findOneById(aIAgentId) {
		const mongoAIAgent = await mongo.aIAgentCollection.findOne({
			id: aIAgentId.value,
		});

		if (!mongoAIAgent) {
			return null;
		}

		return EntityHandler.unsafeMapper(
			AIAgentEntity,
			mongoAIAgent,
		);
	},
	async getOneByPrestationSheet(prestationSheet) {
		const mongoAIAgent = await mongo.aIAgentCollection.findOne({
			prestationSheetId: prestationSheet.id.value,
		});

		if (!mongoAIAgent) {
			throw new RepositoryError("aIAgent.notfound");
		}

		return EntityHandler.unsafeMapper(
			AIAgentEntity,
			mongoAIAgent,
		);
	},
	async sendPrestation(_prestation) {
		await Promise.all([true]);

		return;
	},
};
