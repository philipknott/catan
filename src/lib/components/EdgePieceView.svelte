<script lang="ts">
	import type EdgePiece from '$lib/classes/pieces/EdgePiece';
	import { EDGE_BUTTON_HEIGHT, EDGE_BUTTON_WIDTH } from '$lib/global/Constants';
	import { calculateEdgeRotation, convertAxialToSquare } from '$lib/global/Helpers';
	import type { AxialCoords } from '$lib/global/Types';

	export let edgePiece: EdgePiece | null;
	export let pos: AxialCoords;
	export let addRoad: (pos: AxialCoords) => void;

	const { x, y } = convertAxialToSquare(pos);
	const rotation = calculateEdgeRotation(pos);
	const width = EDGE_BUTTON_WIDTH;
	const height = EDGE_BUTTON_HEIGHT;
	const left = x - width / 2;
	const top = y - height / 2;
</script>

{#if edgePiece == null}
	<button
		style:width="{width}%"
		style:height="{height}%"
		style:left="{left}%"
		style:top="{top}%"
		style:rotate="{rotation}rad"
		on:click={() => addRoad(pos)}
	/>
{:else}
	<button
		style:width="{width}%"
		style:height="{height}%"
		style:left="{left}%"
		style:top="{top}%"
		style:rotate="{rotation}rad"
		style:opacity="100%"
		style:color={edgePiece.color}
	/>
{/if}

<style>
	button {
		position: absolute;
		opacity: 0%;
		z-index: 2;
	}

	button:hover {
		opacity: 50%;
	}
</style>
