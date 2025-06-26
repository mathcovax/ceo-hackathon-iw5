import type { ExpectType } from "@duplojs/utils";
import { createEnum, type GetEnumValue } from "@vendors/clean";
import type { FileTypeEnum, PrestationSheetMode } from "@vendors/clients-type/lebackoss/duplojsTypesCodegen";

export const prestationSheetModeEnum = createEnum([
	"ai",
	"human",
]);

type _CheckPrestationSheetModeEnum = ExpectType<
	GetEnumValue<typeof prestationSheetModeEnum>,
	PrestationSheetMode,
	"strict"
>;

export const fileTypeEnum = createEnum([
	"pdf",
	"image",
	"text",
	"csv",
	"any",
]);

type _CheckFileTypeEnum = ExpectType<
	GetEnumValue<typeof fileTypeEnum>,
	FileTypeEnum,
	"strict"
>;

export const fileTypeMapper: Record<string, FileTypeEnum> = {
	".pdf": "pdf",
	".png": "image",
	".jpg": "image",
	".jpeg": "image",
	".csv": "csv",
	".txt": "text",
};
