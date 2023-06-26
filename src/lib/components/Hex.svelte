<script lang="ts">
	import { Hex } from '$lib/classes/Hex';
	import { Position } from '$lib/classes/Position';
	import { HEX_HEIGHT, HEX_WIDTH } from '$lib/util/constants';
	import { convertAxialToSquare } from '$lib/util/helpers';

	export let pos: Position;
	export let hex: Hex;

	const { resource, value } = hex;
	const { x, y } = convertAxialToSquare(pos);
</script>

<img
	class="hex"
	src="hexes/hex_{resource ?? 'desert'}.png"
	alt=""
	style:left="{x - HEX_WIDTH / 2}%"
	style:top="{y - HEX_HEIGHT / 2}%"
/>

<!-- Value -->
{#if resource != null}
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
	.hex {
		position: absolute;
		z-index: 0;
		max-width: 25%;
		/* opacity: 25%; */
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
