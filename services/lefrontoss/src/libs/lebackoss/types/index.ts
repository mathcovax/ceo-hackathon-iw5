import type { ExpectType } from "@duplojs/utils";
import { createEnum, type GetEnumValue } from "@vendors/clean";
import type { PrestationSheetModeObjecter } from "@vendors/clients-type/lebackoss/duplojsTypesCodegen";

export const prestationSheetModeEnum = createEnum([
	"ai",
	"human",
]);

type _CheckPrestationSheetModeEnum = ExpectType<
	GetEnumValue<typeof prestationSheetModeEnum>,
	PrestationSheetModeObjecter,
	"strict"
>;
