import { UsecaseHandler } from "@vendors/clean";
import { prestationSheetRepository } from "../../repositories/prestationSheet";
import { type PrestationSheetEntity } from "@business/domains/entities/prestationSheet";

interface Input {
	prestationSheet: PrestationSheetEntity;
}

export class AvailablePrestationSheetUsecase extends UsecaseHandler.create({
	prestationSheetRepository,
}) {
	public execute({
		prestationSheet,
	}: Input) {
		const availablePrestationSheetStatus = prestationSheet.availablePrestationSheetStatus();

		return this.prestationSheetRepository.save(availablePrestationSheetStatus);
	}
}
