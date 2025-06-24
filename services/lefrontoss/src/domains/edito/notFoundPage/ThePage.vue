<script setup lang="ts">
import { notFoundPage } from "@/domains/edito/notFoundPage/router";
import { homePage } from "@/domains/edito/homePage/router";

const { $pt } = notFoundPage.use();
</script>

<template>
	<section
		class="min-h-screen-nh flex flex-col items-center justify-center"
	>
		<DSImage
			src="/images/edito/404.svg"
			alt="404"
			class="w-[284px] h-[320px]"
		/>

		<div class="flex flex-col items-center gap-4">
			<h1 class="text-4xl font-bold text-center">
				{{ $pt("title") }}
			</h1>

			<p class="text-center text-muted-foreground">
				{{ $pt("description") }}
			</p>

			<RouterLink :to="homePage.createTo()">
				<DSPrimaryButton icon="home">
					{{ $t("cta.backHome") }}
				</DSPrimaryButton>
			</RouterLink>
		</div>
	</section>
</template>
