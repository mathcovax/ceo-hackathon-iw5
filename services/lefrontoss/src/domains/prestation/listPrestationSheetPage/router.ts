export const listPrestationSheetPage = createPage(
	"listPrestationSheet",
	{
		path: "/prestation-sheets",
		component: () => import("./ThePage.vue"),
	},
);
