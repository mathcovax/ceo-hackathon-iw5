import { prestationRepository } from "@business/applications/repositories/prestation";
import { type PrestationSheetEntity } from "@business/domains/entities/prestationSheet";
import { UsecaseHandler } from "@vendors/clean";

interface Input {
	prestationSheet: PrestationSheetEntity;
}

export class FindAllPrestationByPrestationSheetUsecase extends UsecaseHandler.create({
	prestationRepository,
}) {
	public async execute({ prestationSheet }: Input) {
		return this.prestationRepository.findAllByPrestationSheet(prestationSheet);
	}
}
