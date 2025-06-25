import { type PrestationSheet } from "@business/domains/entities/prestationSheet";
import { UsecaseHandler } from "@vendors/clean";
import { prestationSheetRepository } from "../../repositories/prestationSheet";

interface Input {
	prestationSheetId: PrestationSheet.Id;
}

export class FindOnePrestationSheetUsecase extends UsecaseHandler.create({
	prestationSheetRepository,
}) {
	public execute({ prestationSheetId }: Input) {
		return this.prestationSheetRepository.findOneById(prestationSheetId);
	}
}
