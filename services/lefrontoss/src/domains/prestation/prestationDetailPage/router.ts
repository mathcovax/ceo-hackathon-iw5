export const prestationDetailPage = createPage(
	"prestationDetail",
	{
		path: "/client/prestation-detail/:prestationId",
		component: () => import("./ThePage.vue"),
		params: {
			prestationId: zod.string(),
		},
	},
);
