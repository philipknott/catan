<script lang="ts">
	import Board from '$lib/classes/Board';
	import type Tile from '$lib/classes/Tile';
	import TileView from '$lib/components/TileView.svelte';
	import { ALPHA, TILE_HEIGHT, TILE_WIDTH } from '$lib/global/Constants';

	const board = new Board();
</script>

<div class="board">
	{#each board.tiles as tile}
		<TileView {tile} />
		<!-- <p style:left="{getLeft(tile)}px" style:top="{getTop(tile)}px">1</p>
		<img
			class="tile"
			src="tiles/{tile.resource}.png"
			alt=""
			style:left="{getLeft(tile)}px"
			style:top="{getTop(tile)}px"
		/> -->
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

	p {
		position: absolute;
		border: 2pt solid red;
		border-radius: 50%;
		background-color: bisque;
		font-size: 70px;
		height: 100px;
		width: 100px;
		text-align: center;
		vertical-align: center;
		margin-block: 0px;
		z-index: 1;
	}
</style>
