import { z } from "zod";

export const listPrestationPage = createPage(
	"listPrestation",
	{
		path: "/BO/prestation/:prestationSheetId",
		params: {
			prestationSheetId: z.string(),
		},
		component: () => import("./ThePage.vue"),
	},
);
