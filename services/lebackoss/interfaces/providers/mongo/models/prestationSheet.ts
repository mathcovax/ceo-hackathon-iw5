import { type PrestationSheetEntity } from "@business/domains/entities/prestationSheet";
import { type EntityToSimpleObject } from "@vendors/clean";

export interface MongoPrestationSheetModel extends EntityToSimpleObject<typeof PrestationSheetEntity> {

}
