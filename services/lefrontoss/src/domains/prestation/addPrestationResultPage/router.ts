export const addPrestationResultPage = createPage(
	"addPrestationResult",
	{
		path: "/BO/add-prestation-result/:prestationId",
		params: {
			prestationId: zod.string(),
		},
		component: () => import("./ThePage.vue"),
	},
);
