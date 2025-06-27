<script setup lang="ts">
import { listPrestationSheetPage } from "@/domains/prestationSheet/listPrestationSheetPage/router";
import { addPrestationSheetPage } from "@/domains/prestationSheet/addPrestationSheetPage/router";
import { homePage } from "./router";

const { $pt } = homePage.use();
</script>

<template>
	<section class="space-y-12">
		<div class="space-y-6 text-center">
			<div class="space-y-4">
				<h1 class="text-3xl lg:text-5xl text-primary font-bold">
					Services
				</h1>

				<p class="text-xl lg:text-2xl text-muted-foreground">
					{{ $pt("hero.subtitle") }}
				</p>
			</div>
		</div>

		<DSSeparator />

		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
			<DSCard class="text-center">
				<template #header>
					<div class="mb-4 flex justify-center">
						<div class="size-16 flex justify-center items-center bg-success/10 text-success rounded-full">
							<DSIcon
								name="account"
								size="large"
							/>
						</div>
					</div>

					<h2 class="text-lg font-semibold">
						{{ $pt("features.human.title") }}
					</h2>
				</template>

				<DSCardDescription>
					{{ $pt("features.human.description") }}
				</DSCardDescription>
			</DSCard>

			<DSCard class="text-center">
				<template #header>
					<div class="mb-4 flex justify-center">
						<div class="size-16 flex justify-center items-center bg-primary/10 text-primary rounded-full">
							<DSIcon
								name="robot"
								size="large"
							/>
						</div>
					</div>

					<h2 class="text-lg font-semibold">
						{{ $pt("features.ai.title") }}
					</h2>
				</template>

				<DSCardDescription>
					{{ $pt("features.ai.description") }}
				</DSCardDescription>
			</DSCard>

			<DSCard class="text-center">
				<template #header>
					<div class="mb-4 flex justify-center">
						<div class="size-16 flex justify-center items-center bg-warning/10 text-warning rounded-full">
							<DSIcon
								name="poll"
								size="large"
							/>
						</div>
					</div>

					<h2 class="text-lg font-semibold">
						{{ $pt("features.tracking.title") }}
					</h2>
				</template>

				<DSCardDescription>
					{{ $pt("features.tracking.description") }}
				</DSCardDescription>
			</DSCard>
		</div>

		<DSSeparator />

		<div class="space-y-6">
			<div class="space-y-2 text-center">
				<h2 class="text-2xl font-bold">
					{{ $pt("quickActions.title") }}
				</h2>

				<p class="text-muted-foreground">
					{{ $pt("quickActions.description") }}
				</p>
			</div>

			<div class="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
				<RouterLink :to="listPrestationSheetPage">
					<DSCard class="hover:shadow-md transition-shadow cursor-pointer group">
						<div class="flex items-center gap-4">
							<div class="shrink-0 size-12 flex justify-center items-center bg-primary/10 text-primary rounded-lg group-hover:bg-primary/20 transition-colors">
								<DSIcon name="viewList" />
							</div>

							<div class="space-y-1">
								<h3 class="font-semibold">
									{{ $pt("quickActions.browse.title") }}
								</h3>

								<p class="text-sm text-muted-foreground">
									{{ $pt("quickActions.browse.description") }}
								</p>
							</div>
						</div>
					</DSCard>
				</RouterLink>

				<RouterLink :to="addPrestationSheetPage">
					<DSCard class="hover:shadow-md transition-shadow cursor-pointer group">
						<div class="flex items-center gap-4">
							<div class="shrink-0 size-12 flex justify-center items-center bg-success/10 text-success rounded-lg group-hover:bg-success/20 transition-colors">
								<DSIcon name="plus" />
							</div>

							<div class="space-y-1">
								<h3 class="font-semibold">
									{{ $pt("quickActions.create.title") }}
								</h3>

								<p class="text-sm text-muted-foreground">
									{{ $pt("quickActions.create.description") }}
								</p>
							</div>
						</div>
					</DSCard>
				</RouterLink>
			</div>
		</div>
	</section>
</template>
