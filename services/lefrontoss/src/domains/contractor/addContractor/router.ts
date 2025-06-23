export const addContractorPage = createPage(
	"addContractor",
	{
		path: "/",
		component: () => import("./ThePage.vue"),
	},
);
