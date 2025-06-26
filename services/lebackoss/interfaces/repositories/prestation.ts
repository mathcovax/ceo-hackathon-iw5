import { prestationRepository } from "@business/applications/repositories/prestation";
import { fileTypeEnum } from "@business/domains/common/submissionField";
import { Prestation, PrestationEntity } from "@business/domains/entities/prestation";
import { mongo } from "@interfaces/providers/mongo";
import { AIPrestationTokenProvider } from "@interfaces/providers/token/prestation";
import { EntityHandler } from "@vendors/clean";
import { type FileTypeEnum } from "@vendors/clients-type/lebackoss/duplojsTypesCodegen";
import { extname } from "path";
import { uuidv7 } from "uuidv7";

const fileTypeMapper: Record<string, FileTypeEnum> = {
	".pdf": "pdf",
	".png": "image",
	".jpg": "image",
	".jpeg": "image",
	".csv": "csv",
	".txt": "text",
};

prestationRepository.default = {
	async save(prestation) {
		const simplePrestation = prestation.toSimpleObject();

		await mongo.prestationCollection.updateOne(
			{ id: simplePrestation.id },
			{ $set: simplePrestation },
			{ upsert: true },
		);

		return prestation;
	},
	generateId() {
		return Prestation.idObjecter.unsafeCreate(uuidv7());
	},
	generateToken(prestationId) {
		return AIPrestationTokenProvider.generate(prestationId);
	},
	async findOneById(prestationId) {
		const mongoPrestation = await mongo.prestationCollection.findOne(
			{ id: prestationId.value },
		);

		if (!mongoPrestation) {
			return null;
		}

		return EntityHandler.unsafeMapper(
			PrestationEntity,
			mongoPrestation,
		);
	},
	async findAllByPrestationSheet(prestationSheet) {
		const mongoPrestationList = await mongo.prestationCollection
			.find({ prestationSheetId: prestationSheet.id.value })
			.toArray();

		return mongoPrestationList.map(
			(mongoPrestation) => EntityHandler
				.unsafeMapper(
					PrestationEntity,
					mongoPrestation,
				),
		);
	},
	getFileType(path) {
		return fileTypeMapper[extname(path)] ?? fileTypeEnum.any;
	},
};
