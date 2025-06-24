export const addPrestationPage = createPage(
	"addPrestation",
	{
		path: "/add-prestation",
		component: () => import("./ThePage.vue"),
	},
);
