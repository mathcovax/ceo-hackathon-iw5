import { type PrestationResultEntity } from "@business/domains/entities/prestationResult";
import { type EntityToSimpleObject } from "@vendors/clean";

export interface MongoPrestationResultModel extends EntityToSimpleObject<typeof PrestationResultEntity> {

}
