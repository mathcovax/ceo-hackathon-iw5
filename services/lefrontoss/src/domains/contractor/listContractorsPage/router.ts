export const listContractorsPage = createPage(
	"listContractors",
	{
		path: "/contractors",
		component: () => import("./ThePage.vue"),
	},
);
