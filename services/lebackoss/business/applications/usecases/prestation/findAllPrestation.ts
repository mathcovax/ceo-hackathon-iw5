import { prestationRepository } from "@business/applications/repositories/prestation";
import { UsecaseHandler } from "@vendors/clean";

export class FindAllPrestationUsecase extends UsecaseHandler.create({
	prestationRepository,
}) {
	public async execute() {
		return this.prestationRepository.findAll();
	}
}
