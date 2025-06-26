import {
	type Description,
	OkHttpResponse,
	useBuilder,
	type Route,
	File,
	type Duplo,
} from "@duplojs/core";
import { escapeRegExp } from "@duplojs/utils";
import { existsSync } from "fs";
import { stat } from "fs/promises";

export interface StaticRouteOptions {
	directory?: string;
	description?: Description[];
	routePath?: string;
}

export function makeStaticRoute({
	directory = "./public",
	description = [],
	routePath = "",
}: StaticRouteOptions): Route {
	return useBuilder()
		.createRoute("GET", `${routePath}/*`, ...description)
		.handler(async(_floor, request) => {
			const targetPath = request.url.replace(
				new RegExp(escapeRegExp(routePath)),
				"",
			);

			if (targetPath.includes("..")) {
				return new NotFoundHttpResponse("ressource.notfound");
			}

			const requestedPath = `${directory}${targetPath}`;

			if (existsSync(requestedPath) && (await stat(requestedPath)).isDirectory()) {
				return new NotFoundHttpResponse("ressource.notfound");
			}

			return new OkHttpResponse("application", new File(requestedPath));
		});
}

export function duploStatic(options: StaticRouteOptions) {
	return function(duplo: Duplo) {
		duplo.hook("beforeBuildRouter", (duplo) => {
			duplo.register(makeStaticRoute(options));
		});
	};
}
