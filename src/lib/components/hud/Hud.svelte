<script lang="ts">
	import { Color } from '$lib/util/enums';
	import PlayerInfo from './PlayerInfo.svelte';

	export let turnColor: Color;
</script>

<div
	style:height="100%"
	style:display="flex"
	style:flex-direction="column"
	style:justify-content="space-between"
>
	<div style:display="flex" style:justify-content="space-between">
		<PlayerInfo color={Color.Red} bind:turnColor />
		<PlayerInfo color={Color.Orange} bind:turnColor />
	</div>
	<div style:display="flex" style:justify-content="space-between">
		<PlayerInfo color={Color.White} bind:turnColor />
		<PlayerInfo color={Color.Blue} bind:turnColor />
	</div>
</div>

<style>
</style>
