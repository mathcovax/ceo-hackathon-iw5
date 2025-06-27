import { submissionFieldObjecter } from "@business/domains/common/submissionField";
import { EntityHandler, type GetEntityProperties, type GetEnumValue, type GetValueObject, createEnum, zod } from "@vendors/clean";
import { prestationSheetRules } from "@vendors/entity-rules";

export namespace PrestationSheet {
	export const idObjecter = zod
		.string()
		.createValueObjecter("prestationSheetId");

	export type Id = GetValueObject<typeof idObjecter>;

	export const nameObjecter = zod
		.string()
		.min(prestationSheetRules.name.min)
		.max(prestationSheetRules.name.max)
		.createValueObjecter("prestationSheetName");

	export type Name = GetValueObject<typeof nameObjecter>;

	export const descriptionObjecter = zod
		.string()
		.min(prestationSheetRules.description.min)
		.max(prestationSheetRules.description.max)
		.createValueObjecter("prestationSheetDescription");

	export type Description = GetValueObject<typeof descriptionObjecter>;

	export const keywordObjecter = zod
		.object({
			value: zod
				.string()
				.min(prestationSheetRules.keyword.min)
				.max(prestationSheetRules.keyword.max),
		})
		.createValueObjecter("prestationSheetKeyword");

	export type Keyword = GetValueObject<typeof keywordObjecter>;

	export const modeEnum = createEnum([
		"ai",
		"human",
	]);

	export type ModeEnum = GetEnumValue<typeof modeEnum>;

	export const modeObjecter = zod
		.enum(modeEnum.toTuple())
		.createValueObjecter("prestationSheetMode");

	export type Mode = GetValueObject<typeof modeObjecter>;

	export const statusEnum = createEnum([
		"disabled",
		"available",
	]);

	export const statusObjecter = zod
		.enum(statusEnum.toTuple())
		.createValueObjecter("prestationSheetStatus");

	export type Status = GetValueObject<typeof statusObjecter>;

}

type UpdateDescriptionFieldsParams = Partial<
	Pick<
		GetEntityProperties<typeof PrestationSheetEntity>,
		"description" | "name" | "keywords"
	>
>;

export class PrestationSheetEntity extends EntityHandler.create({
	id: PrestationSheet.idObjecter,
	mode: PrestationSheet.modeObjecter,
	status: PrestationSheet.statusObjecter,
	name: PrestationSheet.nameObjecter,
	description: PrestationSheet.descriptionObjecter,
	keywords: PrestationSheet.keywordObjecter.array(),
	submissionFields: submissionFieldObjecter.array(),
}) {
	public static create(params: Omit<GetEntityProperties<typeof PrestationSheetEntity>, "status">) {
		return new PrestationSheetEntity({
			...params,
			status: PrestationSheet.statusObjecter.unsafeCreate("available"),
		});
	}

	public updateDescriptionFields(params: UpdateDescriptionFieldsParams) {
		return this.update(params);
	}

	public disabledPrestationSheetStatus() {
		return this.update(
			{
				status: PrestationSheet.statusObjecter.unsafeCreate("disabled"),
			},
		);
	}

	public availablePrestationSheetStatus() {
		return this.update(
			{
				status: PrestationSheet.statusObjecter.unsafeCreate("available"),
			},
		);
	}

	public disabled() {
		return this.update({
			status: PrestationSheet.statusObjecter.unsafeCreate("disabled"),
		});
	}
}

