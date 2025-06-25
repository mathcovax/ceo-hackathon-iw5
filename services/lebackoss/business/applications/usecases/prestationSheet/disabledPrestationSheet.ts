import { UsecaseHandler } from "@vendors/clean";
import { type PrestationSheetEntity } from "@business/domains/entities/prestationSheet";
import { prestationSheetRepository } from "@business/applications/repositories/prestationSheet";

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
