<script lang="ts">
	import type Tile from '$lib/classes/Tile';
	import {
		ALPHA,
		BOARD_WIDTH,
		BUTTON_WIDTH,
		BUTTON_X_OFFSET,
		BUTTON_y_OFFSET,
		TILE_X_OFFSET,
		TILE_Y_OFFSET
	} from '$lib/global/Constants';

	export let tile: Tile;

	const tileLeft = ALPHA * tile.x + TILE_X_OFFSET;
	const tileTop = ALPHA * tile.y + TILE_Y_OFFSET;
	const buttonLeft = ALPHA * tile.x + BUTTON_X_OFFSET;
	const buttonTop = ALPHA * tile.y + BUTTON_y_OFFSET;
</script>

{#if !!tile}
	<div>
		<img
			class="tile"
			src="tiles/{tile.resource}.png"
			alt=""
			style:left="{tileLeft}px"
			style:top="{tileTop}px"
		/>
		<p style:left="{buttonLeft}px" style:top="{buttonTop}px">{tile.value}</p>
	</div>
{/if}

<style>
	.tile {
		position: absolute;
		z-index: 0;
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
