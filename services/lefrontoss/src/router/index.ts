import { homePage } from "@/domains/edito/homePage/router";
import { notFoundPage } from "@/domains/edito/notFoundPage/router";
import { listPrestationSheetPage } from "@/domains/prestation/listPrestationSheetPage/router";
import { addPrestationPage } from "@/domains/prestation/addPrestationPage/router";
import { prestationDetailPage } from "@/domains/prestation/prestationDetailPage/router";
import { createWebHistory, createRouter } from "vue-router";

export const router = createRouter({
	history: createWebHistory(),
	routes: [
		{
			path: "/",
			component: () => import("../layouts/BaseLayout.vue"),
			children: [
				homePage.recordRaw,
				notFoundPage.recordRaw,
				listPrestationSheetPage.recordRaw,
				addPrestationPage.recordRaw,
				prestationDetailPage.recordRaw,
			],
		},
	],
	scrollBehavior(_to, _from, savedPosition) {
		if (savedPosition) {
			return savedPosition;
		} else {
			return { top: 0 };
		}
	},
});

const { enableLoader, disableLoader } = useLoader();

router.beforeEach((_to, _from, next) => {
	enableLoader("routerLoadPage");
	next();
});

router.afterEach(() => {
	disableLoader("routerLoadPage");
});
