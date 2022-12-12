<script lang="ts">
	import Board from '$lib/classes/Board';
	import type Tile from '$lib/classes/Tile';
	import { ALPHA, X_OFFSET, Y_OFFSET } from '$lib/global/Constants';

	const board = new Board();
	console.log(board.tiles);

	const getLeft = (tile: Tile): number => ALPHA * tile.x + X_OFFSET;
	const getTop = (tile: Tile): number => ALPHA * tile.y + Y_OFFSET;
</script>

<div class="board">
	{#each board.tiles as tile}
		<img
			class="tile"
			src="tiles/{tile.resource}.png"
			alt=""
			style="left: {getLeft(tile)}px; top: {getTop(tile)}px;"
		/>
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

	.tile {
		position: absolute;
	}
</style>
