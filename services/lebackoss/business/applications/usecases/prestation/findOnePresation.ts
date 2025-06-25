import { type Prestation } from "@business/domains/entities/prestation";
import { UsecaseHandler } from "@vendors/clean";
import { prestationRepository } from "../../repositories/prestation";

interface Input {
	prestationId: Prestation.Id;
}

export class FindOnePrestationUsecase extends UsecaseHandler.create({
	prestationRepository,
}) {
	public execute({ prestationId }: Input) {
		return this.prestationRepository.findOneById(prestationId);
	}
}
