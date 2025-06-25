import { prestationRepository } from "@business/applications/repositories/prestation";
import { type PrestationEntity } from "@business/domains/entities/prestation";
import { UsecaseError, UsecaseHandler } from "@vendors/clean";

interface Input {
	prestation: PrestationEntity;
}

export class StartPrestationUsecase extends UsecaseHandler.create({
	prestationRepository,
}) {
	public execute({ prestation }: Input) {
		const updatePrestation = prestation.start();

		if (updatePrestation instanceof Error) {
			return new UsecaseError("error-while-starting", { error: updatePrestation });
		}

		return this.prestationRepository.save(updatePrestation);
	}
}
