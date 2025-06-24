export const notFoundPage = createPage(
	"notFound",
	{
		path: "/:notFoundPath(.*)*",
		component: () => import("./ThePage.vue"),
	},
);
