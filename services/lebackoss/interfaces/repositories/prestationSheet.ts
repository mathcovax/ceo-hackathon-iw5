import { prestationSheetRepository } from "@business/applications/repositories/prestationSheet";
import { PrestationSheet } from "@business/domains/entities/prestationSheet";
import { mongo } from "@interfaces/providers/mongo";
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
};
