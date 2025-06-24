import { UsecaseHandler } from "@vendors/clean";
import { prestationSheetRepository } from "../repositories/prestationSheet";
import { type PrestationSheetEntity } from "@business/domains/entities/prestationSheet";

interface Input {
	prestationSheet: PrestationSheetEntity;
}

export class DisabledPrestationSheetUsecase extends UsecaseHandler.create({
	prestationSheetRepository,
}) {
	public execute({
		prestationSheet,
	}: Input) {
		const disabledPrestationSheetStatus = prestationSheet.disabledPrestationSheetStatus();

		return this.prestationSheetRepository.save(disabledPrestationSheetStatus);
	}
}
