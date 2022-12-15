<script lang="ts">
	import type Board from '$lib/classes/Board';
	import EdgePositionView from './EdgePositionView.svelte';
	import TileView from './TileView.svelte';

	export let board: Board;
</script>

<div class="board">
	<!-- Tiles -->
	{#each [...board.tiles] as [pos, tile]}
		<TileView {pos} {tile} />
	{/each}

	<!-- Edges -->
	{#each [...board.edges] as [pos, edgePiece]}
		<EdgePositionView {edgePiece} {pos} />
	{/each}
</div>

<style>
	.board {
		position: relative;
		width: 2000px; /* BOARD_WIDTH */
		height: 2165px; /* BOARD_HEIGHT */
		left: 100px;
		top: 100px;
		border: 2px solid blue;
	}
</style>
