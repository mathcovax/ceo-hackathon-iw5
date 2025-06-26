export const listPrestationSheetPage = createPage(
	"listPrestationSheet",
	{
		path: "/client/prestation-sheets",
		component: () => import("./ThePage.vue"),
	},
);
