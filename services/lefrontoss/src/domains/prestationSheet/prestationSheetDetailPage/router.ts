export const prestationSheetDetailPage = createPage(
	"prestationSheetDetail",
	{
		path: "/prestation-sheet-detail/:prestationSheetId",
		params: {
			prestationSheetId: zod.string(),
		},
		component: () => import("./ThePage.vue"),
	},
);
