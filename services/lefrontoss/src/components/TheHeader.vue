<script setup lang="ts">
import { homePage } from "@/domains/edito/homePage/router";
import { addContractorPage } from "@/domains/contractor/addContractorPage/router";
import { listContractorsPage } from "@/domains/contractor/listContractorsPage/router";

const { isScrolled } = useScroll({ allowScrollEvent: true });
</script>

<template>
	<header
		class="sticky top-0 left-0 z-50 bg-background transition-shadow"
		:class="{ 'shadow-md': isScrolled }"
	>
		<div class="container h-[var(--header-height)] flex gap-4 sm:gap-8 items-center">
			<RouterLink :to="homePage">
				<DSImage
					src="/images/logos/logo-text.svg"
					alt="Seaence"
					class="hidden sm:block w-[158px] h-[40px]"
				/>

				<DSImage
					src="/images/logos/logo.svg"
					alt="Seaence"
					class="block sm:hidden size-[40px]"
				/>
			</RouterLink>

			<nav>
				<ul class="flex items-center gap-2">
					<li>
						<RouterLink :to="listContractorsPage">
							<DSLinkButton>{{ $t("layout.header.nav.listContractors") }}</DSLinkButton>
						</RouterLink>
					</li>

					<li>
						<RouterLink :to="addContractorPage">
							<DSLinkButton>{{ $t("layout.header.nav.addContractor") }}</DSLinkButton>
						</RouterLink>
					</li>
				</ul>
			</nav>
		</div>
	</header>
</template>
