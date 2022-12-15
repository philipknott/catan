<script lang="ts">
	import type Tile from '$lib/classes/Tile';
	import { BUTTON_HEIGHT, BUTTON_WIDTH, TILE_HEIGHT, TILE_WIDTH } from '$lib/global/Constants';
	import { convertAxialToSquare } from '$lib/global/Helpers';
	import { Resource, type AxialCoords } from '$lib/global/Types';

	export let tile: Tile;
	export let pos: AxialCoords;

	const { x, y } = convertAxialToSquare(pos);

	const tileLeft = x - TILE_WIDTH / 2;
	const tileTop = y - TILE_HEIGHT / 2;

	const buttonLeft = x - BUTTON_WIDTH / 2;
	const buttonTop = y - BUTTON_HEIGHT / 2;

	const color = tile.value === 6 || tile.value === 8 ? 'red' : 'black';
</script>

<div>
	<img
		class="tile"
		src="tiles/{tile.resource}.png"
		alt=""
		style:left="{tileLeft}px"
		style:top="{tileTop}px"
	/>
	{#if tile.resource != Resource.Desert}
		<p style:left="{buttonLeft}px" style:top="{buttonTop}px" style:color>
			{tile.value}
		</p>
	{/if}
</div>

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
