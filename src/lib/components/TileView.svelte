<script lang="ts">
	import type Tile from '$lib/classes/Tile';
	import { convertAxialToSquare } from '$lib/global/Helpers';
	import { Resource, type AxialCoords } from '$lib/global/Types';

	export let tile: Tile;
	export let pos: AxialCoords;

	const { x, y } = convertAxialToSquare(pos);

	const tileLeft = x - 12.5;
	const tileTop = y - 10;

	const buttonLeft = x - 2.5;
	const buttonTop = y - 2.5;

	const color = tile.value === 6 || tile.value === 8 ? 'red' : 'black';
</script>

<img
	class="tile"
	src="tiles/{tile.resource}.png"
	alt=""
	style:left="{tileLeft}%"
	style:top="{tileTop}%"
/>
{#if tile.resource != Resource.Desert}
	<p style:left="{buttonLeft}%" style:top="{buttonTop}%" style:color>
		{tile.value}
	</p>
{/if}

<style>
	.tile {
		position: absolute;
		z-index: 0;
		max-width: 25%;
	}

	p {
		position: absolute;
		border: 2pt solid red;
		border-radius: 50%;
		background-color: bisque;
		width: 5%;
		height: 5%;
		font-size: 2em;
		text-align: center;
		vertical-align: center;
		margin-block: 0px;
		z-index: 1;
	}
</style>
