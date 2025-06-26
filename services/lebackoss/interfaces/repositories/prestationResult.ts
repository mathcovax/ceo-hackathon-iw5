import { prestationResultRepository } from "@business/applications/repositories/prestationResult";
import { PrestationResult, PrestationResultEntity } from "@business/domains/entities/prestationResult";
import { mongo } from "@interfaces/providers/mongo";
import { EntityHandler } from "@vendors/clean";
import { uuidv7 } from "uuidv7";

prestationResultRepository.default = {
	async save(prestationResult) {
		const simplePrestationResult = prestationResult.toSimpleObject();

		await mongo.prestationResultCollection.updateOne(
			{ id: simplePrestationResult.id },
			{ $set: simplePrestationResult },
			{ upsert: true },
		);

		return prestationResult;
	},
	generateId() {
		return PrestationResult.idObjecter.unsafeCreate(uuidv7());
	},
	async findOneById(prestationSheetId) {
		const mongoPrestationResult = await mongo.prestationResultCollection
			.findOne({
				id: prestationSheetId.value,
			});

		if (!mongoPrestationResult) {
			return null;
		}

		return EntityHandler.unsafeMapper(
			PrestationResultEntity,
			mongoPrestationResult,
		);
	},
	async findOneByPrestation(prestation) {
		const mongoPrestationResult = await mongo.prestationResultCollection
			.findOne({
				prestationId: prestation.id.value,
			});

		if (!mongoPrestationResult) {
			return null;
		}

		return EntityHandler.unsafeMapper(
			PrestationResultEntity,
			mongoPrestationResult,
		);
	},
};
