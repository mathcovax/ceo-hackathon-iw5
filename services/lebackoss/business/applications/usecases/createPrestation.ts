import { type SubmissionData } from "@business/domains/common/submissionData";
import { type PrestationSheetEntity } from "@business/domains/entities/prestationSheet";
import { UsecaseError, UsecaseHandler } from "@vendors/clean";
import { prestationRepository } from "../repositories/prestation";
import { PrestationEntity } from "@business/domains/entities/prestation";

interface Input {
	prestationSheet: PrestationSheetEntity;
	submissionData: SubmissionData;
}

export class CreatePrestationUsecase extends UsecaseHandler.create({
	prestationRepository,
}) {
	public execute({ prestationSheet, submissionData }: Input) {
		for (const field of prestationSheet.submissionFields) {
			const fieldName = field.value.name;
			const submissionField = submissionData.value[fieldName];

			if (!submissionField) {
				return new UsecaseError("missing-field", { fieldName });
			}

			if (submissionField.type !== field.value.type) {
				return new UsecaseError("field-type-incompatible", {
					submissionField,
					prestationField: field,
				});
			}
		}

		for (const fieldName in submissionData.value) {
			const field = prestationSheet.submissionFields
				.find(
					(subField) => subField.value.name === fieldName,
				);

			if (!field) {
				return new UsecaseError("extra-field", { fieldName });
			}
		}

		const prestationId = this.prestationRepository.generateId();

		const prestation = PrestationEntity.create({
			id: prestationId,
			prestationSheetId: prestationSheet.id,
			submissionData,
		});

		return this.prestationRepository.save(prestation);
	}
}
