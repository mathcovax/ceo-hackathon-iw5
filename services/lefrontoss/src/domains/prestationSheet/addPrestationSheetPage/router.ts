export const addPrestationSheetPage = createPage(
	"addPrestationSheetPage",
	{
		path: "/BO/add-prestation-sheet",
		component: () => import("./ThePage.vue"),
	},
);
