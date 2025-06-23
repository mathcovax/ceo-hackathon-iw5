export const homePage = createPage(
	"home",
	{
		path: "/",
		component: () => import("./ThePage.vue"),
	},
);
