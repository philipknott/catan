<script lang="ts">
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';
	import GameState from '$lib/stores/GameState';
	import GameController from '$lib/classes/GameController';
	import BoardView from './Board.svelte';

	const gameState = writable(new GameState());
	const gameController = new GameController(gameState);

	onMount(() => {
		gameController.initializeHexes();
		gameController.updateAvailableMoves();
	});

	const incrementTurn = () => {
		gameController.incrementTurn();
	};
</script>

<div class="game">
	<!-- Board -->
	<BoardView {gameState} {gameController} />

	<!-- Controls -->
	<div style:width="400px">
		<h1>Turn #{$gameState.turn}: {$gameState.currentColor}</h1>
		<div
			style:width="50px"
			style:height="50px"
			style:background-color={['blue', 'orange', 'red', 'white'][$gameState.currentColor]}
			style:border="1px solid black"
		/>
		<button on:click={incrementTurn}>Next Turn</button>
		<!-- <button on:click={() => (canPlaceAnywhere = !canPlaceAnywhere)}
			>canPlaceAnywhere: {canPlaceAnywhere}</button
		> -->
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
