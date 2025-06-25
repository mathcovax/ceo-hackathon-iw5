export const addPrestationPage = createPage(
	"addPrestation",
	{
		path: "/BO/add-prestation",
		component: () => import("./ThePage.vue"),
	},
);
