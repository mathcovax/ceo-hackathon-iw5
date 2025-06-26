import { type AllPrestation } from "@business/applications/repositories/prestation";
import { type AIPrestationEntity } from "@business/domains/entities/aIPrestation";
import { type PrestationEntity } from "@business/domains/entities/prestation";
import { type EntityToSimpleObject } from "@vendors/clean";

export interface MongoPrestationModel extends EntityToSimpleObject<typeof PrestationEntity> {

}

export interface MongoAIPrestationModel extends EntityToSimpleObject<typeof AIPrestationEntity> {

}
