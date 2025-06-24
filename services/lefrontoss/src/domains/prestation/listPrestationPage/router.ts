export const listPrestationsPage = createPage(
	"listPrestations",
	{
		path: "/prestations",
		component: () => import("./ThePage.vue"),
	},
);
