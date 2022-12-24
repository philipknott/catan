<script lang="ts">
	import { initGame, nextTurn } from '$lib/game';
	import { currentColor, turn } from '$lib/stores';
	import BoardView from './BoardView.svelte';

	initGame();
</script>

<div class="game">
	<BoardView />
	<div style:width="400px">
		<h1>Turn #{$turn}: {$currentColor}</h1>
		<button on:click={nextTurn}>Next Turn</button>
	</div>
</div>

<style>
	div {
		margin: 20px;
	}

	.game {
		display: flex;
		justify-content: center;
	}
</style>
