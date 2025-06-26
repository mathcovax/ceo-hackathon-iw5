import { zod } from "@duplojs/core";

export const envs = zod
	.object({
		VITE_ENVIRONEMENT: zod.enum(["DEV", "PROD"]),
		VITE_LEBACKOSS_ENTRYPOINT_BASE_URL: zod.string().url(),
		VITE_IMAGES_PATH: zod.string().url(),
	})
	.parse(import.meta.env);
