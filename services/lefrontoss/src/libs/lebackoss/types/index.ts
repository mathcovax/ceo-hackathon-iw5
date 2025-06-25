import type { ExpectType } from "@duplojs/utils";
import { createEnum, type GetEnumValue } from "@vendors/clean";
import type { FileTypeEnum, PrestationSheetModeObjecter } from "@vendors/clients-type/lebackoss/duplojsTypesCodegen";

export const prestationSheetModeEnum = createEnum([
	"ai",
	"human",
]);

type _CheckPrestationSheetModeEnum = ExpectType<
	GetEnumValue<typeof prestationSheetModeEnum>,
	PrestationSheetModeObjecter,
	"strict"
>;

export const fileTypeEnum = createEnum([
	"pdf",
	"image",
	"text",
	"csv",
]);

type _CheckFileTypeEnum = ExpectType<
	GetEnumValue<typeof fileTypeEnum>,
	FileTypeEnum,
	"strict"
>;
