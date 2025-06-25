import { z } from "zod";

export const prestationDetailPage = createPage(
	"prestationDetail",
	{
		path: "/prestation-detail/:prestationId",
		params: {
			prestationId: z.string(),
		},
		component: () => import("./ThePage.vue"),
	},
);
