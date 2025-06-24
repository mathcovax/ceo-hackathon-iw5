export const addContractorPage = createPage(
	"addContractor",
	{
		path: "/add-contractor",
		component: () => import("./ThePage.vue"),
	},
);
