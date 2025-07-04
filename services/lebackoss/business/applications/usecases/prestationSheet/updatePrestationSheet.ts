import { UsecaseHandler } from "@vendors/clean";
import { prestationSheetRepository } from "../../repositories/prestationSheet";
import { type PrestationSheet, type PrestationSheetEntity } from "@business/domains/entities/prestationSheet";

interface Input {
	prestationSheet: PrestationSheetEntity;
	name?: PrestationSheet.Name;
	description?: PrestationSheet.Description;
	keywords?: PrestationSheet.Keyword[];
}

export class UpdatePrestationSheetDescriptionFieldsUsecase extends UsecaseHandler.create({
	prestationSheetRepository,
}) {
	public async execute({
		prestationSheet,
		name,
		description,
		keywords,
	}: Input) {
		const updatedPrestationSheet = prestationSheet.updateDescriptionFields({
			name,
			description,
			keywords,
		});

		return this.prestationSheetRepository.save(updatedPrestationSheet);
	}
}
