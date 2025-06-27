<script setup lang="ts">
import { homePage } from "@/domains/edito/homePage/router";

</script>

<template>
	<footer class="bg-background border-t border-border">
		<div class="container py-8 flex items-center justify-between">
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

			<span class="text-sm text-muted-foreground">
				&#169; {{ $t("layout.footer.copyright") }}
			</span>
		</div>
	</footer>
</template>
