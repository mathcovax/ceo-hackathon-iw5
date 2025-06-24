import { prestationSheetRepository } from "@business/applications/repositories/prestationSheet";
import { PrestationSheet, PrestationSheetEntity } from "@business/domains/entities/prestationSheet";
import { mongo } from "@interfaces/providers/mongo";
import { EntityHandler, RepositoryError } from "@vendors/clean";
import { uuidv7 } from "uuidv7";

prestationSheetRepository.default = {
	async save(prestationSheet) {
		const simplePrestationSheet = prestationSheet.toSimpleObject();

		await mongo.prestationSheetCollection.updateOne(
			{ id: simplePrestationSheet.id },
			{ $set: simplePrestationSheet },
			{ upsert: true },
		);

		return prestationSheet;
	},
	generateId() {
		return PrestationSheet.idObjecter.unsafeCreate(uuidv7());
	},
	async getById(prestationSheetId) {
		const mongoPrestationSheet = await mongo.prestationSheetCollection.findOne({
			id: prestationSheetId.value,
		});

		if (!mongoPrestationSheet) {
			throw new RepositoryError("prestationSheet.notfound");
		}

		return EntityHandler.unsafeMapper(
			PrestationSheetEntity,
			mongoPrestationSheet,
		);
	},
};
