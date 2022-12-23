<script lang="ts">
	import type Game from '$lib/classes/Game';
	import type { AxialCoords } from '$lib/global/Types';
	import CornerPieceView from './CornerPieceView.svelte';
	import EdgePieceView from './EdgePieceView.svelte';
	import TileView from './TileView.svelte';

	export let game: Game;

	const addRoad = (pos: AxialCoords) => {
		game.addRoad(pos);
		game = game;
	};
</script>

<div class="wrapper">
	<div class="board">
		<!-- Tiles -->
		{#each [...game.board.tiles] as [pos, tile]}
			<TileView {pos} {tile} />
		{/each}

		<!-- Edges -->
		{#each [...game.board.edges] as [pos, edgePiece]}
			<EdgePieceView {edgePiece} {pos} {addRoad} />
		{/each}

		<!-- Corners -->
		{#each [...game.board.corners] as [pos, cornerPiece]}
			<CornerPieceView {cornerPiece} {pos} />
		{/each}
	</div>
</div>

<style>
	.wrapper {
		padding: 50px;
		border: 2px solid red;
		max-width: 1000px;
		width: 100%;
	}

	.board {
		width: 100%;
		position: relative;
		border: 2px solid blue;
		padding-bottom: 108%; /* for aspect ratio */
	}
</style>
