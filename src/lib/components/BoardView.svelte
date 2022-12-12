<script lang="ts">
	import type Board from '$lib/classes/Board';
	import TileView from './TileView.svelte';

	export let board: Board;
</script>

<div class="board">
	<!-- Tiles -->
	{#each board.tiles as tile}
		<TileView {tile} />
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
