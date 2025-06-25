export const listPrestationSheetPage = createPage(
	"listPrestations",
	{
		path: "/prestation-sheets",
		component: () => import("./ThePage.vue"),
	},
);
