import { type AllPrestation, prestationRepository } from "@business/applications/repositories/prestation";
import { UsecaseError, UsecaseHandler } from "@vendors/clean";

interface Input<
	GenericPrestation extends AllPrestation,
> {
	prestation: GenericPrestation;
}

export class StartPrestationUsecase extends UsecaseHandler.create({
	prestationRepository,
}) {
	public execute<
		GenericPrestation extends AllPrestation,
	>({ prestation }: Input<GenericPrestation>) {
		const updatePrestation = prestation.start();

		if (updatePrestation instanceof Error) {
			return new UsecaseError("error-while-starting", { error: updatePrestation });
		}

		return this.prestationRepository.save(updatePrestation);
	}
}
