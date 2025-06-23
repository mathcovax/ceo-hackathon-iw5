import { forwardLogger, logger } from "./logger";
export * from "./logger";

process.on(
	"uncaughtException",
	(error, origine) => {
		logger(error, origine);
	},
);

declare global {
	// eslint-disable-next-line @typescript-eslint/consistent-type-imports
	const forwardLogger: typeof import("./logger").forwardLogger;
	const logger: typeof import("./logger").logger;
}

// @ts-expect-error global error
global.forwardLogger = forwardLogger;

// @ts-expect-error global error
global.logger = logger;
