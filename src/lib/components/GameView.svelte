<script lang="ts">
	import { initGame, nextTurn } from '$lib/game';
	import { currentColor, turn } from '$lib/stores';
	import BoardView from './BoardView.svelte';

	initGame();
</script>

<div>
	<BoardView />
</div>
<h1>Turn #{$turn}: {$currentColor}</h1>
<button on:click={nextTurn}>Next Turn</button>

<style>
	div {
		display: flex;
		justify-content: center;
	}
</style>
