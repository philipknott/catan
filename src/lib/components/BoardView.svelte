<script lang="ts">
	import type Board from '$lib/classes/Board';
	import CornerPieceView from './CornerPieceView.svelte';
	import EdgePieceView from './EdgePieceView.svelte';
	import TileView from './TileView.svelte';

	export let board: Board;
</script>

<div class="wrapper">
	<div class="board">
		<!-- Tiles -->
		{#each [...board.tiles] as [pos, tile]}
			<TileView {pos} {tile} />
		{/each}

		<!-- Edges -->
		{#each [...board.edges] as [pos, edgePiece]}
			<EdgePieceView {edgePiece} {pos} />
		{/each}

		<!-- Corners -->
		{#each [...board.corners] as [pos, cornerPiece]}
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
