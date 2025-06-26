<script setup lang="ts">
import { usePage } from "./composables/usePage";
import { prestationDetailPage } from "./router";

const { $pt } = prestationDetailPage.use();
const { prestation, prestationResult } = usePage();

</script>

<template>
	<h1>yop</h1>
</template>
