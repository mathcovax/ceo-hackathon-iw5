import { type PrestationEntity } from "@business/domains/entities/prestation";
import { type EntityToSimpleObject } from "@vendors/clean";

export interface MongoPrestationModel extends EntityToSimpleObject<typeof PrestationEntity> {

}
