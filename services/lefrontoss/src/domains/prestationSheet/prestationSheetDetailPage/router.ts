import { z } from "zod";

export const prestationSheetDetailPage = createPage(
	"prestationSheetDetail",
	{
		path: "/prestation-sheet-detail/:prestationSheetId",
		params: {
			prestationSheetId: z.string(),
		},
		component: () => import("./ThePage.vue"),
	},
);
