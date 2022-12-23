<script lang="ts">
	import { TILE_HEIGHT, TILE_WIDTH } from '$lib/util/constants';
	import { Resource } from '$lib/util/enums';
	import { convertAxialToSquare } from '$lib/util/helpers';
	import type { AxialCoords, Tile } from '$lib/util/types';

	export let tile: Tile;
	export let pos: AxialCoords;

	const { resource, value } = tile;
	const { x, y } = convertAxialToSquare(pos);
</script>

<!-- Tile Resource -->
<img
	class="tile"
	src="tiles/{resource}.png"
	alt=""
	style:left="{x - TILE_WIDTH / 2}%"
	style:top="{y - TILE_HEIGHT / 2}%"
/>

<!-- Value -->
{#if resource != Resource.Desert}
	<p
		class="value"
		style:left="{x - 2.5}%"
		style:top="{y - 2.5}%"
		style:color={value === 6 || value === 8 ? 'red' : 'black'}
	>
		{value}
	</p>
{/if}

<style>
	.tile {
		position: absolute;
		z-index: 0;
		max-width: 25%;
	}

	.value {
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
