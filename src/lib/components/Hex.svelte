<script lang="ts">
	import { Hex, ResourceHex } from '$lib/classes/Hex';
	import { Position } from '$lib/classes/Position';

	export let pos: Position;
	export let hex: Hex;

	const { x, y } = pos.getCoords();
</script>

<img
	class="hex"
	src={hex.imgSrc}
	alt={hex.toString()}
	style:left="{x - Hex.WIDTH / 2}%"
	style:top="{y - Hex.HEIGHT / 2}%"
/>

<!-- Value -->
{#if hex instanceof ResourceHex}
	<p
		class="value"
		style:left="{x - 2.5}%"
		style:top="{y - 2.5}%"
		style:color={hex.numValue === 6 || hex.numValue === 8 ? 'red' : 'black'}
	>
		{hex.numValue}
	</p>
{/if}

<style>
	.hex {
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
