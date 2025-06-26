import {
	type Description,
	OkHttpResponse,
	useBuilder,
	type Route,
	File,
	type Duplo,
} from "@duplojs/core";
import { existsSync, statSync } from "fs";
import { join, resolve } from "path";

export interface StaticRouteOptions {
	directory?: string;
	description?: Description[];
	paths?: string[];
}

export function makeStaticRoute({
	directory = "./public",
	description = [],
	paths = ["/*", ""],
}: StaticRouteOptions): Route {
	const localDirectory = resolve(directory);

	return useBuilder()
		.createRoute("GET", paths, ...description)
		.handler((_floor, request) => {
			const requestedPath = join(localDirectory, request.url);

			if (existsSync(requestedPath) && statSync(requestedPath).isDirectory()) {
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
