import { submissionFieldObjecter } from "@business/domains/common/submissionField";
import { EntityHandler, type GetEntityProperties, type GetValueObject, createEnum, zod } from "@vendors/clean";

export namespace PrestationSheet {
	export const idObjecter = zod
		.string()
		.createValueObjecter("prestationSheetId");

	export type Id = GetValueObject<typeof idObjecter>;

	export const nameObjecter = zod
		.string()
		.createValueObjecter("prestationSheetName");

	export type Name = GetValueObject<typeof nameObjecter>;

	export const descriptionObjecter = zod
		.string()
		.createValueObjecter("prestationSheetDescription");

	export type Description = GetValueObject<typeof descriptionObjecter>;

	export const keywordObjecter = zod
		.object({
			value: zod.string(),
		})
		.createValueObjecter("prestationSheetKeyword");

	export type Keyword = GetValueObject<typeof keywordObjecter>;

	export const modeEnum = createEnum([
		"ai",
		"humain",
	]);

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
			status: PrestationSheet.statusObjecter.unsafeCreate("disabled"),
		});
	}

	public updateDescriptionFields(params: UpdateDescriptionFieldsParams) {
		return this.update(params);
	}

	public disabled() {
		return this.update({
			status: PrestationSheet.statusObjecter.unsafeCreate("disabled"),
		});
	}
}

