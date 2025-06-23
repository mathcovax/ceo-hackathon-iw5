export const notFoundPage = createPage(
	"notFound",
	{
		path: "/",
		component: () => import("./ThePage.vue"),
	},
);
