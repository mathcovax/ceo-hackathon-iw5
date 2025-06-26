import { aIAgentRepository } from "@business/applications/repositories/aIAgent";
import { AIAgent, AIAgentEntity } from "@business/domains/entities/aIAgent";
import { mongo } from "@interfaces/providers/mongo";
import { PingTokenProvider } from "@interfaces/providers/token/ping";
import { uuidv7 } from "uuidv7";
import { ZodAccelerator } from "@duplojs/core";
import { EntityHandler, RepositoryError } from "@vendors/clean";
import crypto from "crypto";
import { AIAgentTokenProvider } from "@interfaces/providers/token/aIAgent";

const responseOfIsAvailableSchema = ZodAccelerator.build(
	zod.object({
		number: zod.number(),
	}),
);

const randNumberRangeMin = 0;
const randNumberRangeMax = 10000;

const responseSendPrestation = ZodAccelerator.build(
	zod.object({
		aIAgentToken: zod.string(),
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
		const randNumber = crypto.randomInt(randNumberRangeMin, randNumberRangeMax);
		const pingToken = PingTokenProvider.generate(aIAgent, randNumber);

		return fetch(
			aIAgent.pingUrl.value,
			{
				method: "POST",
				headers: { "content-type": "application/json; charset=utf-8" },
				body: JSON.stringify({ pingToken }),
			},
		)
			.then((response) => response.json())
			.then((body) => responseOfIsAvailableSchema.parse(body))
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
	async sendPrestation(aIPrestation) {
		const mongoAIAgent = await mongo.aIAgentCollection.findOne({
			prestationSheetId: aIPrestation.prestationSheetId.value,
		});

		if (!mongoAIAgent) {
			throw new RepositoryError("aIAgent.notfound", {
				aIPrestation,
			});
		}

		const aIAgent = EntityHandler.unsafeMapper(
			AIAgentEntity,
			mongoAIAgent,
		);

		const aIAgentToken = AIAgentTokenProvider.generate(aIAgent);

		await fetch(
			aIAgent.entryPointUrl.value,
			{
				method: "POST",
				headers: { "content-type": "application/json; charset=utf-8" },
				body: JSON.stringify({
					aIAgentToken,
					aIPrestationToken: aIPrestation.token.value,
					data: aIPrestation.submissionData.value,
				}),
			},
		)
			.then((response) => response.json())
			.then((body) => responseSendPrestation.parse(body))
			.then(({ aIAgentToken: returnedAIAgentToken }) => {
				if (aIAgentToken !== returnedAIAgentToken) {
					throw new Error();
				}
			})
			.catch(() => {
				throw new RepositoryError("aIPrestation.fail", {
					aIAgent,
					aIPrestation,
				});
			});
	},
};
