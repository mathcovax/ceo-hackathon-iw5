import { envs } from "@interfaces/envs";
import { MongoClient } from "mongodb";
import { type MongoAIAgentModel } from "./models/aIAgent";
import { type MongoPrestationSheetModel } from "./models/prestationSheet";
import { type MongoPrestationModel } from "./models/prestation";
import { type MongoPrestationResultModel } from "./models/prestationResult";

const client = new MongoClient(envs.MONGO_DATABASE_URL);

const database = client.db(envs.MONGO_DB);
const aIAgentCollection = database.collection<MongoAIAgentModel>("aIAgent");
const prestationSheetCollection = database.collection<MongoPrestationSheetModel>("prestationSheet");
const prestationCollection = database.collection<MongoPrestationModel>("prestation");
const prestationResultCollection = database.collection<MongoPrestationResultModel>("prestationResult");

if (envs.DB_CONNECTION) {
	await client.connect();
}

export const mongo = {
	client,
	database,
	aIAgentCollection,
	prestationSheetCollection,
	prestationCollection,
	prestationResultCollection,
};
