import { type SubmissionData } from "@business/domains/common/submissionData";
import { type PrestationSheetEntity } from "@business/domains/entities/prestationSheet";
import { UsecaseError, UsecaseHandler } from "@vendors/clean";
import { prestationRepository } from "../../repositories/prestation";
import { PrestationEntity } from "@business/domains/entities/prestation";
import { aIAgentRepository } from "../../repositories/aIAgent";
import { CheckAvailableAIAgentUsecase } from "../aIAgent/checkAvailableAIAgent";
import { match } from "ts-pattern";
import { AIPrestationEntity } from "@business/domains/entities/aIPrestation";

interface Input {
	prestationSheet: PrestationSheetEntity;
	submissionData: SubmissionData;
}

export class CreatePrestationUsecase extends UsecaseHandler.create({
	prestationRepository,
	aIAgentRepository,
	checkAIAgent: CheckAvailableAIAgentUsecase,
}) {
	public async execute({ prestationSheet, submissionData }: Input) {
		if (prestationSheet.mode.value === "ai") {
			const aIAgent = await this.aIAgentRepository.getOneByPrestationSheet(
				prestationSheet,
			);
			const result = await this.checkAIAgent({ aIAgent });

			if (result instanceof Error) {
				return result;
			}
		}

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

		const prestation = match(prestationSheet.mode.value)
			.with(
				"human",
				() => PrestationEntity.create({
					id: prestationId,
					prestationSheetId: prestationSheet.id,
					submissionData,
				}),
			)
			.with(
				"ai",
				() => AIPrestationEntity.create({
					id: prestationId,
					prestationSheetId: prestationSheet.id,
					submissionData,
					token: this.prestationRepository.generateToken(prestationId),
				}),
			)
			.exhaustive();

		await this.prestationRepository.save(prestation);

		if (prestation instanceof AIPrestationEntity) {
			await this.aIAgentRepository.sendPrestation(
				prestation,
			);
		}

		return prestation;
	}
}
