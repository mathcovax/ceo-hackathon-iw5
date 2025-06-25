import { prestationSheetRepository } from "@business/applications/repositories/prestationSheet";
import { UsecaseHandler } from "@vendors/clean";

export class FindAllPrestationSheetUsecase extends UsecaseHandler.create({
	prestationSheetRepository,
}) {
	public async execute() {
		return this.prestationSheetRepository.findAll();
	}
}
