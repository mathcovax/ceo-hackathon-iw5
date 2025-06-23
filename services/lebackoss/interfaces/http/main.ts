import "@duplojs/node";
import "@duplojs/node/globals";
import { Duplo, useProcessBuilder, useRouteBuilder } from "@duplojs/core";
import { envs } from "../envs";
import "./routes";
import { cors } from "@vendors/duplo-plugins/cors";
import { debug } from "@vendors/duplo-plugins/debug";

const duplo = new Duplo({
	environment: envs.ENVIROMENT,
	host: envs.HOST,
	port: envs.PORT,
	plugins: [
		cors(envs.CORS_ALLOW_ORIGIN),
		debug(),
	],
});

duplo.register(
	...useProcessBuilder.getAllCreatedProcess(),
	...useRouteBuilder.getAllCreatedRoute(),
);

await duplo.launch(
	() => void console.log("lebackoss is running !"),
);
