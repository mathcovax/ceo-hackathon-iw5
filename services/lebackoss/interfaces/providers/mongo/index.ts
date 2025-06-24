import { envs } from "@interfaces/envs";
import { MongoClient } from "mongodb";
import { type MongoAIAgentModel } from "./models/aIAgent";
import { type MongoPrestationSheetModel } from "./models/prestationSheet";

const client = new MongoClient(envs.MONGO_DATABASE_URL);

const database = client.db(envs.MONGO_DB);
const aIAgentCollection = database.collection<MongoAIAgentModel>("AIAgent");
const prestationSheetCollection = database.collection<MongoPrestationSheetModel>("PrestationSheet");

if (envs.DB_CONNECTION) {
	await client.connect();
}

export const mongo = {
	client,
	database,
	aIAgentCollection,
	prestationSheetCollection,
};
